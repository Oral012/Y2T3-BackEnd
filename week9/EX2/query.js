const { Op } = require('sequelize');
const { Score, Student, Course } = require('../EX1/index'); 

async function getScoresInRange() {
  try {
    const scores = await Score.findAll({
      where: {
        academic_year: '2025-2026',
        score: {
          [Op.between]: [60, 90] 
        }
      },
      attributes: ['id', 'score', 'academic_year', 'student_id', 'course_id'],
      include: [
        {
          model: Student,
          attributes: ['firstname', 'lastname']
        },
        {
          model: Course,
          attributes: ['name']
        }
      ]
    });

    return scores;
  } catch (error) {
    console.error('Error fetching scores in range:', error);
  }
}