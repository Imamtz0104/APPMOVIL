import fs from 'fs';
import path from 'path';

const DB_FILE = path.resolve('./server/data.json');

// Default data structure
const DEFAULT_DB = {
  teachers: {},
  students: {},
  courses: {},
  attendance: {},
};

let db = loadDB();

function loadDB() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn('[db] Error loading database:', err.message);
  }
  return JSON.parse(JSON.stringify(DEFAULT_DB));
}

function saveDB() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (err) {
    console.error('[db] Error saving database:', err);
  }
}

export function getDB() {
  return db;
}

export function getTeachers() {
  return Object.values(db.teachers);
}

export function getTeacher(id) {
  return db.teachers[id];
}

export function createTeacher(data) {
  const id = generateId();
  db.teachers[id] = { id, ...data, createdAt: new Date().toISOString() };
  saveDB();
  return db.teachers[id];
}

export function deleteTeacher(id) {
  delete db.teachers[id];
  saveDB();
}

export function getStudents() {
  return Object.values(db.students);
}

export function getStudent(id) {
  return db.students[id];
}

export function createStudent(data) {
  const id = generateId();
  db.students[id] = { id, ...data, createdAt: new Date().toISOString() };
  saveDB();
  return db.students[id];
}

export function deleteStudent(id) {
  delete db.students[id];
  saveDB();
}

export function getCourses() {
  return Object.values(db.courses);
}

export function getCourse(id) {
  return db.courses[id];
}

export function createCourse(data) {
  const id = generateId();
  db.courses[id] = {
    id,
    name: data.name,
    teacherId: data.teacherId,
    students: data.students || [],
    createdAt: new Date().toISOString(),
  };
  saveDB();
  return db.courses[id];
}

export function updateCourse(id, data) {
  if (db.courses[id]) {
    db.courses[id] = { ...db.courses[id], ...data };
    saveDB();
  }
  return db.courses[id];
}

export function addStudentToCourse(courseId, studentName) {
  const course = db.courses[courseId];
  if (!course) return null;

  const student = createStudent({ name: studentName });
  course.students.push(student);
  saveDB();
  return course;
}

export function removeStudentFromCourse(courseId, studentId) {
  const course = db.courses[courseId];
  if (!course) return null;

  course.students = course.students.filter((s) => s.id !== studentId);
  deleteStudent(studentId);
  saveDB();
  return course;
}

export function saveAttendance(data) {
  const id = generateId();
  db.attendance[id] = {
    id,
    courseId: data.courseId,
    date: data.date || new Date().toISOString(),
    records: data.records,
    createdAt: new Date().toISOString(),
  };
  saveDB();
  return db.attendance[id];
}

export function getAttendanceByDate(date) {
  return Object.values(db.attendance).filter((a) => a.date === date);
}

function generateId() {
  return Math.random().toString(36).substring(2, 11);
}

export default {
  getDB,
  getTeachers,
  getTeacher,
  createTeacher,
  deleteTeacher,
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  addStudentToCourse,
  removeStudentFromCourse,
  saveAttendance,
  getAttendanceByDate,
};
