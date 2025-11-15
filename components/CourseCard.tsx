import React from 'react';
import { IonCard, IonCardContent, IonButton, IonIcon, IonBadge } from '@ionic/react';
import { chevronForward } from 'ionicons/icons';
import { Course } from '../types';
import '../styles/CourseCard.css';

interface CourseCardProps {
  course: Course;
  onSelect: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect }) => {
  return (
    <IonCard className="course-card" button onClick={() => onSelect(course.id)}>
      <IonCardContent>
        <h2 className="course-title">{course.name}</h2>
        <div className="course-info">
          <IonBadge color="primary">{course.students.length} estudiantes</IonBadge>
        </div>
        <div className="course-action">
          <span>Tomar Asistencia</span>
          <IonIcon icon={chevronForward} />
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default CourseCard;
