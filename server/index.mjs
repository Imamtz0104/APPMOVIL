
/* Express API with local JSON database
   Endpoints:
   - POST /teachers        { id?, name, email }
   - DELETE /teachers/:id
   - POST /students        { id?, name }
   - DELETE /students/:id
   - POST /attendance      { courseId, date, records: { studentId: status } }
   - GET  /courses/:id     get course doc (students inside)
   - POST /courses/:id/students        { name }
   - DELETE /courses/:id/students/:studentId

   Notes:
   - Data is persisted in ./server/data.json
*/

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as db from './db.mjs';

const app = express();
const PORT = process.env.API_PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// Local database ready
console.log('[API] Using local JSON database');

// Create teacher
app.post('/teachers', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name and email required' });
    const teacher = db.createTeacher({ name, email });
    return res.json({ id: teacher.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
});

// Delete teacher
app.delete('/teachers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    db.deleteTeacher(id);
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
});

// Create student
app.post('/students', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'name required' });
    const student = db.createStudent({ name });
    return res.json({ id: student.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
});

// Delete student
app.delete('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    db.deleteStudent(id);
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
});

// Save attendance
app.post('/attendance', async (req, res) => {
  try {
    const { courseId, date, records } = req.body;
    if (!courseId || !records) return res.status(400).json({ error: 'courseId and records required' });
    const att = db.saveAttendance({ courseId, date, records });
    return res.json({ id: att.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
});

// Export course students as CSV (must be BEFORE /courses/:id to match first)
app.get('/courses/:id/students/export/csv', async (req, res) => {
  try {
    const { id } = req.params;
    const course = db.getCourse(id);
    if (!course) return res.status(404).json({ error: 'course not found' });

    // Create CSV content
    let csv = 'ID,Nombre\n';
    (course.students || []).forEach((student) => {
      csv += `"${student.id}","${student.name}"\n`;
    });

    // Send as downloadable file
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="alumnos_${course.name.replace(/\s+/g, '_')}.csv"`);
    res.send(csv);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
});

// Add student to a course
app.post('/courses/:id/students', async (req, res) => {
  try {
    const courseId = req.params.id;
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'name required' });

    const course = db.addStudentToCourse(courseId, name);
    if (!course) return res.status(404).json({ error: 'course not found' });
    
    // Return the last added student (newest one)
    const newStudent = course.students[course.students.length - 1];
    return res.json({ id: newStudent.id, course });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
});

// Remove student from a course
app.delete('/courses/:id/students/:studentId', async (req, res) => {
  try {
    const { id: courseId, studentId } = req.params;
    const course = db.removeStudentFromCourse(courseId, studentId);
    if (!course) return res.status(404).json({ error: 'course not found' });
    return res.json({ ok: true, course });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
});

// Get course (with students)
app.get('/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const course = db.getCourse(id);
    if (!course) return res.status(404).json({ error: 'course not found' });
    return res.json(course);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
