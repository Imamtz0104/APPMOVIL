import React from 'react';
import { Teacher } from '../types';

interface HeaderProps {
  user: Teacher | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-brand-secondary shadow-lg">
      <div className="container mx-auto px-4 py-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
            <svg className="w-8 h-8 text-brand-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            <h1 className="text-xl md:text-2xl font-bold text-brand-subtle tracking-wider">
            Control de Asistencia
            </h1>
        </div>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-brand-light hidden sm:block">{user.name}</span>
            <button
              onClick={onLogout}
              className="bg-brand-accent hover:bg-brand-light text-white font-bold py-2 px-3 rounded-lg transition-colors flex items-center space-x-2"
              aria-label="Cerrar Sesión"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;