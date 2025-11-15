import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton,
  IonText,
  IonIcon,
} from '@ionic/react';
import { clipboardOutline } from 'ionicons/icons';
import '../styles/LoginPage.css';

interface LoginPageProps {
  onLogin: (email: string, pass: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('teacher@school.edu');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, ingrese su correo y contraseña.');
      return;
    }
    setError('');
    onLogin(email, password);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding ion-text-center login-content">
        <div className="login-container">
          <div className="logo-section">
            <IonIcon icon={clipboardOutline} className="logo-icon" />
          </div>

          <h1 className="app-title">Control de Asistencia</h1>

          <IonCard className="login-card">
            <IonCardContent>
              <form onSubmit={handleLogin}>
                <IonItem className="email-item">
                  <IonInput
                    label="Correo Electrónico"
                    labelPlacement="stacked"
                    type="email"
                    placeholder="teacher@school.edu"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value || '')}
                  />
                </IonItem>

                <IonItem className="password-item">
                  <IonInput
                    label="Contraseña"
                    labelPlacement="stacked"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value || '')}
                  />
                </IonItem>

                {error && (
                  <IonText color="danger" className="error-text">
                    <p>{error}</p>
                  </IonText>
                )}

                <IonButton
                  type="submit"
                  expand="block"
                  className="login-button"
                >
                  Iniciar Sesión
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>

          <p className="copyright-text">
            © 2024 Distrito Escolar. Todos los derechos reservados.
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
