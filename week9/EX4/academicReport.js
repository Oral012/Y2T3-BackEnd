const { Student, Score, Course, Major } = require('../EX1/index');

async function getFullAcademicReport() {
  const students = await Student.findAll({
    include: [
      {
        model: Score,
        include: [
          {
            model: Course,
            include: [
              {
                model: Major
              }
            ]
          }
        ]
      }
    ]
  });

  const formattedReport = [];

  students.forEach((student) => {
    const studentData = student.toJSON();
    const scores = studentData.Scores || [];

    if (scores.length === 0) {
      formattedReport.push({
        student_id: studentData.id,
        full_name: `${studentData.firstname || ''} ${studentData.lastname || ''}`.trim(),
        score: null,
        academic_year: null,
        course_name: null,
        credit: null,
        major_name: null
      });
    } else {
      scores.forEach((scoreRecord) => {
        const course = scoreRecord.Course || {};
        const major = course.Major || {};
        formattedReport.push({
          student_id: studentData.id,
          full_name: `${studentData.firstname || ''} ${studentData.lastname || ''}`.trim(),
          score: scoreRecord.score,
          academic_year: scoreRecord.academic_year,
          course_name: course.name || null,
          credit: course.credit || null,
          major_name: major.name || null
        });
      });
    }
  });

  return formattedReport;
}

module.exports = {
  getFullAcademicReport
};
