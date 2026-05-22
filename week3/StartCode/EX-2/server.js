// server.js
import express from 'express';
import courses from "./course.js";
const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria
    let filteredCourses = courses.filter(course => course.department.toLowerCase() === dept.toLowerCase());
    
        filteredCourses = filteredCourses.filter(l => l.level.toLowerCase() === level.toLowerCase());
        filteredCourses = filteredCourses.filter(minc => minc.credits >= parseInt(minCredits));
        filteredCourses = filteredCourses.filter(maxc => maxc.credits <= parseInt(maxCredits));
        filteredCourses = filteredCourses.filter(s => s.semester.toLowerCase() === semester.toLowerCase());
        filteredCourses = filteredCourses.filter(inst => inst.instructor.toLowerCase().includes(instructor.toLowerCase()));
        if(filteredCourses.length === 0){
            return res.status(404);
        }


    res.json(filteredCourses);  

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
