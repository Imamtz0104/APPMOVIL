import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonIcon,
} from '@ionic/react';
import { logOut } from 'ionicons/icons';
import { Course, Teacher } from '../types';
import CourseCard from '../components/CourseCard';
import '../styles/DashboardPage.css';

interface DashboardPageProps {
  user: Teacher;
  courses: Course[];
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  courses,
  onLogout,
}) => {
  const history = useHistory();

  const handleSelectCourse = (courseId: string) => {
    history.push(`/attendance/${courseId}`);
  };

  const handleLogoutClick = () => {
    onLogout();
    history.push('/');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Control de Asistencia</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogoutClick}>
              <IonIcon icon={logOut} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding dashboard-content">
        <div className="dashboard-header">
          <h2>Hola, {user.name}!</h2>
          <p>Tus Cursos</p>
        </div>

        {courses.length > 0 ? (
          <div className="courses-grid">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onSelect={handleSelectCourse}
              />
            ))}
          </div>
        ) : (
          <IonCard className="no-courses-card">
            <IonCardContent className="no-courses-content">
              <p>No tienes cursos asignados.</p>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
