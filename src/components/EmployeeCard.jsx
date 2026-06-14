import React from 'react';

export default function EmployeeCard({ employee }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-3">
      <div className="card employee-card shadow-sm h-100">
        <div className="card-body d-flex align-items-center gap-3">
          <img
            src={employee.image}
            alt={employee.firstName}
            className="avatar-img"
          />
          <div>
            <h6 className="mb-1">
              {employee.firstName} {employee.lastName}
            </h6>
            <p className="mb-0 small text-muted text-break">{employee.email}</p>
            <p className="mb-0 small text-muted">{employee.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
