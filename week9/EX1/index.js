const { Sequelize, DataTypes, Op } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER ,
  process.env.DB_PASSWORD ,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false
  }
);


const Student = require('./student')(sequelize);
const Major = require('./major')(sequelize);
const Course = require('./course')(sequelize);
const Score = require('./score')(sequelize);


Student.hasMany(Score, { foreignKey: 'student_id' });
Score.belongsTo(Student, { foreignKey: 'student_id' });

Course.hasMany(Score, { foreignKey: 'course_id' });
Score.belongsTo(Course, { foreignKey: 'course_id' });

Major.hasMany(Course, { foreignKey: 'major_id' });
Course.belongsTo(Major, { foreignKey: 'major_id' });

module.exports = {
  sequelize,
  Sequelize,
  Op,
  Student,
  Major,
  Course,
  Score
};