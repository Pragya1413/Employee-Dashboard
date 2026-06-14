import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard() {
  const { user } = useAuth();
  const currentHour = new Date().getHours();

  const getGreeting = () => {
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 17) return "Good Afternoon";
    return "Good Evening";
  };
  return (
    <div>
      <Sidebar />
      <div className="container py-5">
        <h2>
  {getGreeting()}, {user?.firstName || user?.username}! 👋
</h2>
        <p className="text-muted">Welcome to your employee management dashboard.</p>

        <div className="row g-3 mt-4">
          <div className="col-md-6">
            <div className="card shadow-sm p-4">
              <h5>Employee List</h5>
              <p className="text-muted">View and search all employees.</p>
              <Link to="/employees" className="btn btn-primary">
                View Employees
              </Link>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm p-4">
              <h5>Add Employee</h5>
              <p className="text-muted">Add a new employee to the list.</p>
              <Link to="/employees/add" className="btn btn-success">
                Add Employee
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
