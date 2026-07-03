const Sequilize = require('sequelize');
const sequelize = require('../database.js');

const Student = sequelize.define("Student", {
    name: Sequilize.STRING,
    email: Sequilize.STRING,
})
const Class = sequelize.define("Class", {
    classname: Sequilize.STRING,
    room: Sequilize.STRING,})
const AttendanceRecord = sequelize.define("AttendanceRecord", {
    date: Sequilize.DATE,
    status: Sequilize.STRING,
})
Student.hasMany(AttendanceRecord)
AttendanceRecord.belongsTo(Student)
Class.hasMany(AttendanceRecord) 
AttendanceRecord.belongsTo(Class)

const markAttendance = async (studentId, classId, date, status) => {
    const [record, created] = await AttendanceRecord.findOrCreate({
        where: { studentId, classId, date }
    });
    if (!created) {
        record.status = status;
        await record.save();
    }
    return record;
};  

const getStudentAttendanceByDate = async (studentId, date) => {
    return await AttendanceRecord.findAll({
        where: { studentId, date },
        include: Class,
    });
}

const getCallAttdance = async (classId) => {
    return await AttendanceRecord.findAll({
        where: { classId },
        include: Student,
    });
}

