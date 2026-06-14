import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Toast from '../components/Toast.jsx';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  department: '',
  role: '',
};

export default function AddEmployee() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState('');
  const [localEmployees, setLocalEmployees] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number with starting digit between 6-9';
    }
    if (!form.department.trim()) newErrors.department = 'Department is required';
    if (!form.role.trim()) newErrors.role = 'Role is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLocalEmployees([...localEmployees, { ...form, id: Date.now() }]);
      setForm(initialForm);
      setToast('Employee added successfully!');
    }
  };

  return (
    <div>
      <Sidebar />

      <div className="card container my-3 py-4" style={{ maxWidth: '600px' }}>
        <h3 className="mb-4">Add Employee</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name <span className="text-danger">*</span></label>
            <input
              type="text"
              name="fullName"
              className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
              value={form.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email <span className="text-danger">*</span></label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number <span className="text-danger">*</span></label>
            <input
              type="text"
              name="phone"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Department <span className="text-danger">*</span></label>
            <input
              type="text"
              name="department"
              className={`form-control ${errors.department ? 'is-invalid' : ''}`}
              value={form.department}
              onChange={handleChange}
            />
            {errors.department && <div className="invalid-feedback">{errors.department}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Role <span className="text-danger">*</span></label>
            <input
              type="text"
              name="role"
              className={`form-control ${errors.role ? 'is-invalid' : ''}`}
              value={form.role}
              onChange={handleChange}
            />
            {errors.role && <div className="invalid-feedback">{errors.role}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add Employee
          </button>
        </form>
      </div>

      {localEmployees.length > 0 && (
        <div className="card container my-4 py-3" style={{ maxWidth: '600px' }}>
          <h5>Employees Added</h5>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {localEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.fullName}</td>
                    <td>{emp.email}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.department}</td>
                    <td>{emp.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Toast message={toast} type="success" onClose={() => setToast('')} />
    </div>
  );
}