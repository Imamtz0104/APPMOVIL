import React, { useState, useMemo } from 'react';
import { Course, AttendanceRecord, AttendanceStatus } from '../types';
import StudentRow from '../components/StudentRow';

interface AttendanceScreenProps {
  course: Course;
  onBack: () => void;
  onSave: (records: AttendanceRecord) => void;
}

const AttendanceScreen: React.FC<AttendanceScreenProps> = ({ course, onBack, onSave }) => {
  const [attendance, setAttendance] = useState<AttendanceRecord>(() => {
    const initial: AttendanceRecord = {};
    course.students.forEach(student => {
      initial[student.id] = 'present'; // Default to present
    });
    return initial;
  });

  const handleStatusChange = (studentId: string, newStatus: AttendanceStatus) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: newStatus
    }));
  };

  const attendanceSummary = useMemo(() => {
    // FIX: Explicitly type `summary` to provide an index signature.
    // This allows TypeScript to correctly type-check dynamic property access.
    const summary: Record<AttendanceStatus, number> = { present: 0, absent: 0, tardy: 0 };
    Object.values(attendance).forEach(status => {
      summary[status]++;
    });
    return summary;
  }, [attendance]);
  
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
      onSave(attendance);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000); // Reset after 3 seconds
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-brand-accent transition-colors">
            <svg className="w-6 h-6 text-brand-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div>
            <h2 className="text-3xl font-bold text-brand-subtle">{course.name}</h2>
            <p className="text-brand-light">Tomando asistencia para el {new Date().toLocaleDateString()}</p>
        </div>
      </div>
      
      <div className="bg-brand-secondary p-4 rounded-lg mb-6 flex justify-around text-center">
        <div>
            <p className="text-2xl font-bold text-green-400">{attendanceSummary.present}</p>
            <p className="text-sm text-brand-light">Presente</p>
        </div>
        <div>
            <p className="text-2xl font-bold text-red-400">{attendanceSummary.absent}</p>
            <p className="text-sm text-brand-light">Ausente</p>
        </div>
        <div>
            <p className="text-2xl font-bold text-yellow-400">{attendanceSummary.tardy}</p>
            <p className="text-sm text-brand-light">Tardanza</p>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        {course.students.map(student => (
          <StudentRow
            key={student.id}
            student={student}
            status={attendance[student.id]}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
      
      <div className="text-center">
        <button 
          onClick={handleSave}
          className={`w-full max-w-xs font-bold py-3 px-4 rounded-lg transition-colors duration-300 ${isSaved ? 'bg-green-600' : 'bg-brand-accent hover:bg-brand-light'} text-white`}
          >
            {isSaved ? '¡Asistencia Guardada!' : 'Guardar Asistencia'}
        </button>
      </div>

    </div>
  );
};

export default AttendanceScreen;