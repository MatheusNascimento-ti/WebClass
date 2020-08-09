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
            subject INTEGER,
            cost TEXT,
            teachers_id INTAGER
        );
        CREATE TABLE IF NOT EXISTS class_schedule(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTAGER,
            weakday INTAGER,
            time_from INTAGER,
            time_to INTAGER
        );
    `)
}

module.exports = database.open(__dirname + "/database.sqlite").then(execute)