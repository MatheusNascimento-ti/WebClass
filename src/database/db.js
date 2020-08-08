const database = require("sqlite-async")

database.open(__dirname + "/database").then(execute)

function execute(db){
    db.exec(`
        CREATE TABLE IF NOT EXISTS teachers(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );
        CREATE TABLE IF NOT EXISTS classes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject TEXT,
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