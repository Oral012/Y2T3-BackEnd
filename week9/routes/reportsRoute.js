const express = require('express');
const router = express.Router();

const { getScoresInRange } = require('../EX2/scoreRangeQuery');
const { searchStudents } = require('../EX3/searchStudents');
const { getFullAcademicReport } = require('../EX4/academicReport');
const { getStudentAverageScores } = require('../EX5/averageScore');
const { Student, Score, Course, Op } = require('../EX1/index');


router.get('/student-performance', async (req, res) => {
  try {
    const data = await getStudentAverageScores();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


router.get('/scores', async (req, res) => {
  try {
    const { keyword, minScore, inRange } = req.query;

    if (inRange === 'true') {
      const data = await getScoresInRange();
      return res.status(200).json({ success: true, data });
    }

    const data = await searchStudents(keyword, minScore);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


router.get('/full-report', async (req, res) => {
  try {
    const data = await getFullAcademicReport();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/top-students', async (req, res) => {
  try {
    const scores = await Score.findAll({
      where: {
        academic_year: '2025-2026',
        score: { [Op.gte]: 85 }
      },
      include: [
        {
          model: Student,
          required: true
        },
        {
          model: Course,
          required: true,
          where: { status: true }
        }
      ]
    });

    const data = scores.map((s) => {
      const student = s.Student || {};
      const course = s.Course || {};
      return {
        student_id: s.student_id,
        full_name: `${student.firstname || ''} ${student.lastname || ''}`.trim(),
        course: course.name || null,
        score: s.score,
        academic_year: s.academic_year
      };
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/at-risk-students', async (req, res) => {
  try {
    const scores = await Score.findAll({
      where: {
        score: { [Op.lt]: 50 }
      },
      include: [
        { model: Student, required: true },
        { model: Course }
      ]
    });
    res.status(200).json({ success: true, data: scores });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
