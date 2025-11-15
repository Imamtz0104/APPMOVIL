const API_BASE = process.env.VITE_API_BASE || 'http://localhost:4000';

export async function fetchCourse(courseId: string) {
  const res = await fetch(`${API_BASE}/courses/${courseId}`);
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function addStudentToCourse(courseId: string, name: string) {
  const res = await fetch(`${API_BASE}/courses/${courseId}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function deleteStudentFromCourse(courseId: string, studentId: string) {
  const res = await fetch(`${API_BASE}/courses/${courseId}/students/${studentId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function postAttendance(courseId: string, records: any) {
  const res = await fetch(`${API_BASE}/attendance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId, records }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function downloadStudentsCSV(courseId: string, courseName: string) {
  try {
    const res = await fetch(`${API_BASE}/courses/${courseId}/students/export/csv`);
    if (!res.ok) throw new Error('Error downloading file');
    
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alumnos_${courseName.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (err) {
    console.error('Error downloading students:', err);
    throw err;
  }
}

export default { fetchCourse, addStudentToCourse, deleteStudentFromCourse, postAttendance, downloadStudentsCSV };
