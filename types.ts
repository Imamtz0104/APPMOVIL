export interface Teacher {
  id: string;
  name: string;
  email: string;
}

export interface Student {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  name: string;
  teacherId: string;
  students: Student[];
}

export type AttendanceStatus = 'present' | 'absent' | 'tardy';

export interface AttendanceRecord {
  [studentId: string]: AttendanceStatus;
}
