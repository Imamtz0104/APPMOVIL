import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (email: string, pass: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
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
    // In a real app, you'd validate credentials
    // Here we just call the onLogin prop
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-primary p-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
           <svg className="w-16 h-16 text-brand-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
        </div>
        <h1 className="text-3xl font-bold text-center text-brand-subtle mb-8">Control de Asistencia</h1>
        
        <form onSubmit={handleLogin} className="bg-brand-secondary shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-brand-light text-sm font-bold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className="shadow appearance-none border border-brand-accent rounded w-full py-2 px-3 bg-brand-primary text-brand-subtle leading-tight focus:outline-none focus:shadow-outline focus:border-brand-light"
              id="email"
              type="email"
              placeholder="teacher@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-brand-light text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow appearance-none border border-brand-accent rounded w-full py-2 px-3 bg-brand-primary text-brand-subtle mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-brand-light"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-brand-accent hover:bg-brand-light text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors"
              type="submit"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
         <p className="text-center text-brand-accent text-xs">
          &copy;2024 Distrito Escolar. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;