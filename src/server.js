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

    }
]

function landing(res, ans) {
    return ans.sendFile(__dirname + "/views/index.html")
}
function study(res, ans) {
    return ans.sendFile(__dirname + "/views/study.html")
}
function teach(pres, ans) {
    return ans.sendFile(__dirname + "/views/teach.html")
}

const express = require("express")
const server = express()

server.use(express.static("public"))
.get("/", landing)
.get("/study", study)
.get("/teach", teach)
.listen(5500)