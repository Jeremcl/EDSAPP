import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <img src={logo} alt="EDS22 Logo" className="header-logo" />
          <div className="header-title">
            <h1>EDS22</h1>
            <p>Électro Dépannage Service</p>
          </div>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span className="user-name">
              {user.prenom} {user.nom}
            </span>
            <span className="user-role">{user.role}</span>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
