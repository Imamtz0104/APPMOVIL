import { Teacher, Course, Student } from '../types';

export const MOCK_TEACHER: Teacher = {
  id: 't1',
  name: 'Prof. Alan Turing',
  email: 'teacher@school.edu'
};

const STUDENTS: Student[] = [
  { id: 's1', name: 'Ada Lovelace' },
  { id: 's2', name: 'Grace Hopper' },
  { id: 's3', name: 'Charles Babbage' },
  { id: 's4', name: 'John von Neumann' },
  { id: 's5', name: 'Margaret Hamilton' },
  { id: 's6', name: 'Tim Berners-Lee' },
  { id: 's7', name: 'Linus Torvalds' },
  { id: 's8', name: 'Vint Cerf' },
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    name: 'Cálculo I',
    teacherId: 't1',
    students: STUDENTS.slice(0, 5),
  },
  {
    id: 'c2',
    name: 'Introducción a los Algoritmos',
    teacherId: 't1',
    students: STUDENTS.slice(2, 7),
  },
  {
    id: 'c3',
    name: 'Arquitectura de Computadoras',
    teacherId: 't1',
    students: STUDENTS.slice(4, 8),
  },
  {
    id: 'c4',
    name: 'Álgebra Lineal',
    teacherId: 't1',
    students: STUDENTS.slice(0, 8),
  },
];