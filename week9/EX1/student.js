const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Student extends Model {}

  Student.init({
    firstname: DataTypes.STRING(30),
    lastname: DataTypes.STRING(120),
    sex: DataTypes.ENUM('male', 'female', 'other'),
    dob: DataTypes.DATEONLY,
    status: DataTypes.BOOLEAN,
    address: DataTypes.TEXT,
    tel: DataTypes.STRING(30)
  }, {
    sequelize,
    modelName: 'Student',
    tableName: 'student_tbl',
    timestamps: false
  });

  return Student;
};