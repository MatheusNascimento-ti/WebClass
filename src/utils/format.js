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

async function converthour(time){
    const [hour, minutes] = time.split(':')

    return Number((hour * 60) + parseInt(minutes))
}

module.exports = {
    subjects,
    weakday,
    getsubjects,
    converthour
}