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
    

    

    if(!filters.subjects || !filters.weakday || !filters.time){
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
async function teach(req, ans) {
    const createteachers = require("./database/createteachers")
    const data = req.query

    const notempty = Object.keys(data).length > 0

    if(notempty){
        const teachervalue ={
            name: data.name,
            avatar: data.avatar,
            whatsapp: data.whatsapp,
            bio: data.bio
        } 
        const classvalue = {
            subjects: data.subjects, 
            cost: data.cost
        }
        const classschedulevalues = data.weakday.map((weakday, index) => {
            return {
                weakday,
                time_from: converthour(data.time_from[index]),
                time_to: converthour(data.time_to[index])
            }
        })
        try {
            const db = await database
            await createteachers(db, {teachervalue, classvalue, classschedulevalues})

            let querrystring = "?subjects=" + data.subjects
            querrystring += "&weakday=" + data.weakday[0]
            querrystring += "&time=" + data.time_from[0] 

            return ans.redirect("/study" + querrystring)
        } catch (error) {
            console.log(error)
        }
        
        
    }
    return ans.render("teach.html", {subjects, weakday})
}

module.exports = {
    landing,
    study,
    teach
}