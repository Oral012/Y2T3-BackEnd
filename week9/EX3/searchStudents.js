const { Student, Score, Course, Op } = require('../EX1/index');

async function searchStudents(keyword, minScore) {
  const scoreWhere = {};
  if (minScore !== undefined && minScore !== null && minScore !== '') {
    scoreWhere.score = {
      [Op.gte]: Number(minScore)
    };
  }

  const studentWhere = {};
  if (keyword) {
    const likeOp = Op.iLike || Op.like;
    studentWhere[Op.or] = [
      { firstname: { [likeOp]: `%${keyword}%` } },
      { lastname: { [likeOp]: `%${keyword}%` } }
    ];
  }

  const results = await Score.findAll({
    where: scoreWhere,
    include: [
      {
        model: Student,
        required: true,
        where: Object.keys(studentWhere).length > 0 ? studentWhere : undefined
      },
      {
        model: Course
      }
    ]
  });

  return results;
}

module.exports = {
  searchStudents
};
