import React from 'react';
import { IonItem, IonLabel, IonButton, IonIcon, IonAvatar } from '@ionic/react';
import { checkmarkCircle, closeCircle, timeOutline, trash } from 'ionicons/icons';
import { Student, AttendanceStatus } from '../types';
import '../styles/StudentRow.css';

interface StudentRowProps {
  student: Student;
  status: AttendanceStatus;
  onStatusChange: (studentId: string, newStatus: AttendanceStatus) => void;
  onDelete?: (studentId: string) => void;
}

const StudentRow: React.FC<StudentRowProps> = ({ student, status, onStatusChange, onDelete }) => {
  return (
    <IonItem className="student-row">
      <IonAvatar slot="start" className="student-avatar">
        {student.name.charAt(0).toUpperCase()}
      </IonAvatar>
      <IonLabel>
        <h3>{student.name}</h3>
        <p className={`status-badge status-${status}`}>
          {status === 'present' && 'Presente'}
          {status === 'absent' && 'Ausente'}
          {status === 'tardy' && 'Tardanza'}
        </p>
      </IonLabel>

      <div slot="end" className="status-buttons">
        <IonButton
          fill={status === 'present' ? 'solid' : 'outline'}
          color={status === 'present' ? 'success' : 'medium'}
          size="small"
          onClick={() => onStatusChange(student.id, 'present')}
          className="status-btn"
        >
          <IonIcon icon={checkmarkCircle} slot="icon-only" />
        </IonButton>
        <IonButton
          fill={status === 'absent' ? 'solid' : 'outline'}
          color={status === 'absent' ? 'danger' : 'medium'}
          size="small"
          onClick={() => onStatusChange(student.id, 'absent')}
          className="status-btn"
        >
          <IonIcon icon={closeCircle} slot="icon-only" />
        </IonButton>
        <IonButton
          fill={status === 'tardy' ? 'solid' : 'outline'}
          color={status === 'tardy' ? 'warning' : 'medium'}
          size="small"
          onClick={() => onStatusChange(student.id, 'tardy')}
          className="status-btn"
        >
          <IonIcon icon={timeOutline} slot="icon-only" />
        </IonButton>
        {onDelete && (
          <IonButton
            fill="outline"
            color="danger"
            size="small"
            onClick={() => onDelete(student.id)}
            className="delete-btn"
          >
            <IonIcon icon={trash} slot="icon-only" />
          </IonButton>
        )}
      </div>
    </IonItem>
  );
};

export default StudentRow;
