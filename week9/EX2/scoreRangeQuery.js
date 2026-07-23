const { Score, Op } = require('../EX1/index');

async function getScoresInRange() {
  const scores = await Score.findAll({
    where: {
      academic_year: '2025-2026',
      score: {
        [Op.between]: [60, 90]
      }
    }
  });
  return scores;
}

module.exports = {
  getScoresInRange
};
