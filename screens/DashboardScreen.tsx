import React from 'react';
import { Course } from '../types';
import CourseCard from '../components/CourseCard';

interface DashboardScreenProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ courses, onSelectCourse }) => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h2 className="text-3xl font-bold mb-6 text-brand-subtle border-b-2 border-brand-accent pb-3">Tus Cursos</h2>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} onSelect={onSelectCourse} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-brand-secondary rounded-lg">
          <p className="text-brand-light">No tienes cursos asignados.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardScreen;