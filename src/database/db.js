const database = require("sqlite-async")

function execute(db){
   return db.exec(`
        CREATE TABLE IF NOT EXISTS teachers(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );
        CREATE TABLE IF NOT EXISTS classes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subjects INTEGER,
            cost TEXT,
            teachers_id INTEGER
        );
        CREATE TABLE IF NOT EXISTS class_schedule(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weakday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
}

module.exports = database.open(__dirname + "/database.sqlite").then(execute)