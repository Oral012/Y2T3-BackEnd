const express = require('express');
const router = express.Router();
const { markAttendance, getStudentAttendanceByDate, getClassAttendance, getStudentAttendanceSummary } = require('./ex3.js');

router.post('/attendance', async (req, res) => {
  try {
    const { studentId, date } = req.query;
    const { classId, status } = req.body; 
    if (!studentId || !date || !classId || !status) {
      return res.status(400).json({ error: 'Missing required parameters or body fields.' });
    }

    const record = await markAttendance(studentId, classId, date, status);
    res.status(201).json({ message: 'Attendance recorded successfully', data: record });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/attendance', async (req, res) => {
  try {
    const { studentId, date } = req.query;

    if (!studentId || !date) {
      return res.status(400).json({ error: 'studentId and date are required query parameters.' });
    }

    const records = await getStudentAttendanceByDate(studentId, date);
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/classes/:id/attendance', async (req, res) => {
  try {
    const classId = req.params.id;
    const classAttendance = await getClassAttendance(classId);
    res.json(classAttendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/students/:id/attendance', async (req, res) => {
  try {
    const studentId = req.params.id;
    const summary = await getStudentAttendanceSummary(studentId);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});