const express = require("express")
const server = express()
const nunjucks = require("nunjucks")

const teachers = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "9929727709",
        bio: "Enthusiast of the best advanced chemistry technologies.Passionate about blowing things up in the laboratory and changing people's lives through experiments. More than 200,000 people have experienced one of my explosions.",
        subject: "Chemistry",
        cost: 20,
        weakday: [0],
        "time-from": [720],
        "time-to": [1700]

    },
    {
        name: "Maria Clara",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "9929727709",
        bio: "Enthusiast of the best advanced chemistry technologies.Passionate about blowing things up in the laboratory and changing people's lives through experiments. More than 200,000 people have experienced one of my explosions.",
        subject: "Chemistry",
        cost: 20,
        weakday: [0],
        "time-from": [720],
        "time-to": [1700]

    }
]

const subjects = [
    "Art",
    "History",
    "English",
    "geography",
    "physics",
    "biology",
    "chemistry",
    "math",
    "physical education"
]

const weakday = [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

function getsubjects(subjectnumber) {
    const position = +subjectnumber - 1

    return subjects[position]
}
function landing(req, ans) {
    return ans.render("index.html")
}
function study(req, ans) {
    const filters = req.query
    return ans.render("study.html", {teachers, subjects, filters, weakday})
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

nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server
.use(express.static("public"))
.get("/", landing)
.get("/study", study)
.get("/teach", teach)
.listen(5500)