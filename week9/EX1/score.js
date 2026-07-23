const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Score extends Model {}

  Score.init({
    score: DataTypes.DOUBLE,
    academic_year: DataTypes.STRING(30),
    course_id: DataTypes.INTEGER,
    student_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Score',
    tableName: 'score_tbl',
    timestamps: false
  });

  return Score;
};