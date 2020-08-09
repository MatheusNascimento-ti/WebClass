module.exports = async (db, teachersvalue, classvalue, classschedulevalues) => {
    const insertteacher = await db.run(`
        INSERT INTO teachers (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${teachersvalue.name}",
            "${teachersvalue.avatar}",
            "${teachersvalue.whatsapp}",
            "${teachersvalue.bio}"
        );
    `)
    const teacher_id = insertteacher.lastID

    const insertedclass = await db.run(`
            INSERT INTO classes (
                subjects,
                cost,
                teachers_id
            ) VALUES(
                "${classvalue.subject}",
                "${classvalue.cost}",
                "${teacher_id}"
            );
    `)

    const class_id = insertedclass.lastID

    const inserted_all_classschedulevalues =  classschedulevalues.map((classschedulevalues) =>{
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weakday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classschedulevalues.weakday}",
                "${classschedulevalues.time_from}",
                "${classschedulevalues.time_to}"
            );
        `)
    })

    await Promise.all(inserted_all_classschedulevalues)
}