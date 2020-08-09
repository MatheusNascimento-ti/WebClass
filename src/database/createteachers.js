module.exports = async function(db,{teachervalue, classvalue, schedulevalues}){
    const insertteacher = await db.run(`
        INSERT INTO teachers (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            ${teachervalue.name},
            ${teachervalue.avatar},
            ${teachervalue.whatsapp},
            ${teachervalue.bio}
        );
    `)
    const teacher_id = insertteacher.lastID

    const insertedclass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                teacher_id
            ) VALUES(
                ${classvalue.subject},
                ${classvalue.cost},
                ${teacher_id}
            );
    `)

    const class_id = insertedclass.lastID

    const inserted_all_classschedulevalues =  classschedulevalues.mat((value) =>{
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weakday,
                time_from,
                time_to
            ) VALUES (
                ${class_id},
                ${value.weakday},
                ${value.time_from},
                ${value.time_to}
            );
        `)
    })

    await promise.all(inserted_all_classschedulevalues)
}