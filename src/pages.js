const {
    subjects,
    weakday,
    getsubjects,
    converthour
} = require("./utils/format")
const database = require("./database/db.js")

function landing(req, ans) {
    return ans.render("index.html")
}
async function study(req, ans) {
    const filters = req.query
    

    

    if(!filters.subject || !filters.weakday || !filters.time){
        return ans.render("study.html", {subjects, filters, weakday})
    }

    const timetominutes = converthour(filters.time)
    const takesubjects = getsubjects(filters.subjects)

    const query = `
    SELECT classes.*, teachers.*
    FROM teachers
    JOIN classes ON (classes.teachers_id = teachers.id)
    WHERE EXISTS (
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = classes.id
        AND class_schedule.weakday = "${filters.weakday}"
        AND class_schedule.time_from >= ${timetominutes}
        AND class_schedule.time_to > ${timetominutes}
    )
    AND classes.subject = "${takesubjects}"
    `
    try {
        const db =  await database
        const teachers = await db.all(query)

        return ans.render("study.html",  teachers, subjects, filters, weakday)
    } catch (error){
        console.log(error)
    }

    return ans.render("study.html",  {teachers, subjects, filters, weakday})
}
function teach(req, ans) {
    const data = req.query

    const notempty = Object.keys(data).length > 0

    if(notempty){
        data.subject = getsubjects(data.subject)

        teachers.push(data)

        return ans.redirect("/study")
    }
    return ans.render("teach.html", {subjects, weakday})
}

module.exports = {
    landing,
    study,
    teach
}