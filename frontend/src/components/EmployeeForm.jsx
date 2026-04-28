import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { createEmployee, updateEmployee } from '../services/api';

const EmployeeForm = ({ employee, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    department: 'Engineering',
    role: '',
    salary: '',
    is_active: true,
    hire_date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (employee) {
        await updateEmployee(employee.id, formData);
      } else {
        await createEmployee(formData);
      }
      onSave();
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Failed to save employee. Email might be a duplicate.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in">
        <div className="modal-header">
          <h2 className="modal-title">{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
          <button type="button" onClick={onClose} className="btn-icon">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input type="text" name="first_name" required className="form-input" value={formData.first_name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input type="text" name="last_name" required className="form-input" value={formData.last_name} onChange={handleChange} />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" name="email" required className="form-input" value={formData.email} onChange={handleChange} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Department</label>
              <select name="department" className="form-input" value={formData.department} onChange={handleChange}>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <input type="text" name="role" required className="form-input" value={formData.role} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Salary</label>
              <input type="number" name="salary" required min="0" step="0.01" className="form-input" value={formData.salary} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Hire Date</label>
              <input type="date" name="hire_date" required className="form-input" value={formData.hire_date} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
            <input type="checkbox" name="is_active" id="is_active" checked={formData.is_active} onChange={handleChange} />
            <label htmlFor="is_active" style={{ fontSize: '0.875rem' }}>Active Employee</label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" onClick={onClose} className="btn" style={{ backgroundColor: 'var(--bg-color)' }}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
