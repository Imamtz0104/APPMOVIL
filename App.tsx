import React, { useState, useMemo, useEffect } from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { Teacher, Course } from './types';
import { MOCK_TEACHER, MOCK_COURSES } from './services/mockData';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AttendancePage from './pages/AttendancePage';

const API_BASE = process.env.VITE_API_BASE || 'http://localhost:4000';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<Teacher | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  // --- Mock Authentication ---
  const handleLogin = (email: string, pass: string) => {
    if (email === MOCK_TEACHER.email && pass === 'password') {
      setCurrentUser(MOCK_TEACHER);
    } else {
      alert('¡Credenciales inválidas!');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Load courses from API
  useEffect(() => {
    const loadCourses = async () => {
      try {
        // For demo: use mock courses, but in real scenario you'd fetch from API
        // const res = await fetch(`${API_BASE}/courses`);
        // const data = await res.json();
        // setCourses(data);
        setCourses(MOCK_COURSES);
      } catch (err) {
        console.error('Error loading courses:', err);
        setCourses(MOCK_COURSES);
      }
    };
    loadCourses();
  }, []);

  // --- Data Fetching ---
  const teacherCourses = useMemo(() => {
    if (!currentUser) return [];
    return courses.filter(course => course.teacherId === currentUser.id);
  }, [currentUser, courses]);

  // Wrapper components para las rutas
  const LoginPageRoute = () => <LoginPage onLogin={handleLogin} />;

  const DashboardPageRoute = () => {
    if (!currentUser) return <Redirect to="/" />;
    return (
      <DashboardPage 
        user={currentUser}
        courses={teacherCourses}
        onLogout={handleLogout}
      />
    );
  };

  const AttendancePageRoute = (props: any) => {
    if (!currentUser) return <Redirect to="/" />;
    const { courseId } = props.match.params;
    const course = courses.find(c => c.id === courseId);
    
    if (!course) return <Redirect to="/dashboard" />;

    return (
      <AttendancePage 
        course={course}
        user={currentUser}
        onLogout={handleLogout}
      />
    );
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route 
            exact
            path="/" 
            component={currentUser ? DashboardPageRoute : LoginPageRoute}
          />
          <Route 
            exact
            path="/dashboard" 
            component={DashboardPageRoute}
          />
          <Route 
            exact
            path="/attendance/:courseId" 
            component={AttendancePageRoute}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;