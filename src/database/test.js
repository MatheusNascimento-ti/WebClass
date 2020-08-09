const database = require("./db.js")

database.then((db) => {
    teachers = {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "9929727709",
        bio: "Enthusiast of the best advanced chemistry technologies.Passionate about blowing things up in the laboratory and changing people's lives through experiments. More than 200,000 people have experienced one of my explosions.",
    }

    classvalue = {
        subject: "Chemistry",
        cost: 20,
    }
    
    classschedule = [
        { 
            weakday: 1,
            time_from: 720,
            time_to: 1700
        },
        { 
            weakday: 0,
            time_from: 520,
            time_to: 1100
        }
    ]
})

