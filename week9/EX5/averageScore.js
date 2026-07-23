const { Sequelize, Student, Score } = require('../EX1/index');

async function getStudentAverageScores() {
  const results = await Score.findAll({
    attributes: [
      'student_id',
      [Sequelize.fn('AVG', Sequelize.col('score')), 'average_score']
    ],
    include: [
      {
        model: Student,
        attributes: ['id', 'firstname', 'lastname']
      }
    ],
    group: ['Score.student_id', 'Student.id', 'Student.firstname', 'Student.lastname'],
    raw: true,
    nest: true
  });

  return results.map((row) => {
    const firstname = row.Student ? row.Student.firstname : '';
    const lastname = row.Student ? row.Student.lastname : '';
    return {
      student_id: row.student_id,
      full_name: `${firstname || ''} ${lastname || ''}`.trim(),
      average_score: row.average_score ? parseFloat(Number(row.average_score).toFixed(2)) : 0
    };
  });
}

module.exports = {
  getStudentAverageScores
};
