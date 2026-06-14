import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <span className="navbar-brand mb-0 h1">Employee Dashboard</span>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-lg-3 mx-lg-3 mt-3 mt-lg-0">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-link ${isActive ? "fw-bold text-primary" : "text-white"}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/employees"
            className={({ isActive }) =>
              `nav-link ${isActive ? "fw-bold text-primary" : "text-white"}`
            }
          >
            View Staff
          </NavLink>
        </div>

        <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 ms-lg-auto mt-3 mt-lg-0">
          {user && (
            <span className="text-white d-flex align-items-center d-none d-lg-flex">
              {user.image && (
                <img
                  src={user.image}
                  alt="Avatar"
                  className="rounded-circle me-2"
                  style={{ width: "30px", height: "30px", objectFit: "cover" }}
                />
              )}
              {user.firstName || user.username}
            </span>
          )}

          <button
            className="btn btn-outline-light btn-sm"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>

          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}