import React, { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonInput,
  IonLoading,
} from '@ionic/react';
import { arrowBack, checkmarkCircle, close, timeOutline, add, trash, download } from 'ionicons/icons';
import { Course, Teacher, AttendanceRecord, AttendanceStatus } from '../types';
import StudentRow from '../components/StudentRow';
import { fetchCourse, addStudentToCourse, deleteStudentFromCourse, postAttendance, downloadStudentsCSV } from '../src/services/api';
import '../styles/AttendancePage.css';

interface AttendancePageProps {
  course: Course;
  user: Teacher;
  onLogout: () => void;
}

const AttendancePage: React.FC<AttendancePageProps> = ({
  course,
  user,
  onLogout,
}) => {
  const history = useHistory();
  const [currentCourse, setCurrentCourse] = useState<Course>(course);
  const [attendance, setAttendance] = useState<AttendanceRecord>(() => {
    const initial: AttendanceRecord = {};
    course.students.forEach((student) => {
      initial[student.id] = 'present';
    });
    return initial;
  });

  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [error, setError] = useState('');

  // Load course from API on mount
  useEffect(() => {
    const loadCourse = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCourse(course.id);
        setCurrentCourse(data);
        // Reset attendance with new students
        const initial: AttendanceRecord = {};
        (data.students || []).forEach((student: any) => {
          initial[student.id] = 'present';
        });
        setAttendance(initial);
      } catch (err) {
        console.error('Error loading course:', err);
        setError('No se pudo cargar el curso');
      } finally {
        setIsLoading(false);
      }
    };
    loadCourse();
  }, [course.id]);

  const handleStatusChange = (studentId: string, newStatus: AttendanceStatus) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: newStatus,
    }));
  };

  const handleAddStudent = async () => {
    if (!newStudentName.trim()) return;
    try {
      setIsLoading(true);
      const result = await addStudentToCourse(currentCourse.id, newStudentName);
      setCurrentCourse(result.course);
      setAttendance((prev) => ({
        ...prev,
        [result.id]: 'present',
      }));
      setNewStudentName('');
      setError('');
    } catch (err) {
      console.error('Error adding student:', err);
      setError('Error al agregar alumno');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    try {
      setIsLoading(true);
      const result = await deleteStudentFromCourse(currentCourse.id, studentId);
      setCurrentCourse(result.course);
      setAttendance((prev) => {
        const newRecord = { ...prev };
        delete newRecord[studentId];
        return newRecord;
      });
      setError('');
    } catch (err) {
      console.error('Error deleting student:', err);
      setError('Error al eliminar alumno');
    } finally {
      setIsLoading(false);
    }
  };

  const attendanceSummary = useMemo(() => {
    const summary: Record<AttendanceStatus, number> = { present: 0, absent: 0, tardy: 0 };
    Object.values(attendance).forEach((status: AttendanceStatus) => {
      summary[status]++;
    });
    return summary;
  }, [attendance]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await postAttendance(currentCourse.id, attendance);
      setIsSaved(true);
      setError('');
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      console.error('Error saving attendance:', err);
      setError('Error al guardar asistencia');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    history.push('/dashboard');
  };

  const handleLogoutClick = () => {
    onLogout();
    history.push('/');
  };

  const handleDownloadStudents = async () => {
    try {
      setIsLoading(true);
      await downloadStudentsCSV(currentCourse.id, currentCourse.name);
      setError('');
    } catch (err) {
      console.error('Error downloading:', err);
      setError('Error al descargar alumnos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={handleBack}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>{currentCourse.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleDownloadStudents} title="Descargar alumnos">
              <IonIcon icon={download} />
            </IonButton>
            <IonButton onClick={handleLogoutClick}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding attendance-content">
        <IonLoading isOpen={isLoading} message="Procesando..." />

        {error && (
          <IonCard color="danger">
            <IonCardContent>
              <p>{error}</p>
            </IonCardContent>
          </IonCard>
        )}

        <div className="attendance-date">
          <p>Asistencia para el {new Date().toLocaleDateString()}</p>
        </div>

        <div className="summary-cards">
          <div className="summary-card present">
            <IonIcon icon={checkmarkCircle} />
            <div className="summary-value">{attendanceSummary.present}</div>
            <div className="summary-label">Presentes</div>
          </div>
          <div className="summary-card absent">
            <IonIcon icon={close} />
            <div className="summary-value">{attendanceSummary.absent}</div>
            <div className="summary-label">Ausentes</div>
          </div>
          <div className="summary-card tardy">
            <IonIcon icon={timeOutline} />
            <div className="summary-value">{attendanceSummary.tardy}</div>
            <div className="summary-label">Tardanzas</div>
          </div>
        </div>

        <IonCard className="add-student-card">
          <IonCardContent>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <IonInput
                placeholder="Nombre del alumno"
                value={newStudentName}
                onIonChange={(e) => setNewStudentName(e.detail.value || '')}
              />
              <IonButton onClick={handleAddStudent} color="primary" size="small">
                <IonIcon icon={add} slot="icon-only" />
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard className="students-card">
          <IonCardContent>
            {currentCourse.students && currentCourse.students.length > 0 ? (
              <IonList>
                {currentCourse.students.map((student) => (
                  <StudentRow
                    key={student.id}
                    student={student}
                    status={attendance[student.id] || 'present'}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteStudent}
                  />
                ))}
              </IonList>
            ) : (
              <p style={{ textAlign: 'center', color: '#999' }}>No hay alumnos registrados</p>
            )}
          </IonCardContent>
        </IonCard>

        <div className="save-button-container">
          <IonButton
            expand="block"
            color={isSaved ? 'success' : 'primary'}
            onClick={handleSave}
            className="save-button"
          >
            {isSaved ? '✓ ¡Asistencia Guardada!' : 'Guardar Asistencia'}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AttendancePage;
