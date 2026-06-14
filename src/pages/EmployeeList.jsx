import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import Spinner from '../components/Spinner.jsx';
import EmployeeCard from '../components/EmployeeCard.jsx';
import api from '../utils/api.js';

const ITEMS_PER_PAGE = 9;

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get('/users');
        setEmployees(res.data.users || []);
      } catch (err) {
        setError('Failed to load employees');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const filtered = employees.filter((emp) => {
    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
  <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
    <Sidebar />

    <div className="container py-4 flex-grow-1">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h3>Employees</h3>
        <Link to="/employees/add" className="btn btn-success">
          + Add Employee
        </Link>
      </div>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          {paginated.length === 0 ? (
            <p className="text-muted">No employees found.</p>
          ) : (
            paginated.map((emp) => <EmployeeCard key={emp.id} employee={emp} />)
          )}
        </div>
      )}
    </div>

    {!loading && totalPages > 1 && (
      <nav className="d-flex justify-content-center mb-3 mt-auto">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            <i class="bi bi-arrow-left-circle"></i>
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? 'active' : ''}`}
          >
            <button className="page-link" onClick={() => setCurrentPage(page)}>
              {page}
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            <i class="bi bi-arrow-right-circle"></i>
          </button>
        </li>
        </ul>
      </nav>
    )}
  </div>
);
}