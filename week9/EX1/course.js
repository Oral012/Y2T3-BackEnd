const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model {}

  Course.init({
    name: DataTypes.STRING(120),
    credit: DataTypes.DOUBLE,
    hours: DataTypes.DOUBLE,
    status: DataTypes.BOOLEAN,
    major_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
    tableName: 'course_tbl',
    timestamps: false
  });

  return Course;
};