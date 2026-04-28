import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getEmployees, deleteEmployee } from '../services/api';
import EmployeeForm from './EmployeeForm';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [skip, setSkip] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const limit = 10;

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await getEmployees(skip, limit, search);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search
    const delayDebounceFn = setTimeout(() => {
      fetchEmployees();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, skip]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingEmployee(null);
    setIsFormOpen(true);
  };

  const handleSave = () => {
    setIsFormOpen(false);
    fetchEmployees();
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div className="search-bar">
          <Search size={18} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Search employees..." 
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSkip(0); // Reset to first page on search
            }}
          />
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Role</th>
              <th>Status</th>
              <th>Hire Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Loading...</td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No employees found.</td>
              </tr>
            ) : (
              employees.map(employee => (
                <tr key={employee.id}>
                  <td>
                    <div style={{ fontWeight: '500' }}>{employee.first_name} {employee.last_name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{employee.email}</div>
                  </td>
                  <td>{employee.department}</td>
                  <td>{employee.role}</td>
                  <td>
                    <span className={`badge ${employee.is_active ? 'badge-active' : 'badge-inactive'}`}>
                      {employee.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{new Date(employee.hire_date).toLocaleDateString()}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn-icon" onClick={() => handleEdit(employee)} title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button className="btn-icon" onClick={() => handleDelete(employee.id)} title="Delete" style={{ color: 'var(--danger-color)' }}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Showing {employees.length > 0 ? skip + 1 : 0} to {skip + employees.length}
        </span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn" 
            style={{ backgroundColor: 'white', border: '1px solid var(--border-color)' }}
            disabled={skip === 0}
            onClick={() => setSkip(Math.max(0, skip - limit))}
          >
            <ChevronLeft size={18} />
            Previous
          </button>
          <button 
            className="btn" 
            style={{ backgroundColor: 'white', border: '1px solid var(--border-color)' }}
            disabled={employees.length < limit}
            onClick={() => setSkip(skip + limit)}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {isFormOpen && (
        <EmployeeForm 
          employee={editingEmployee} 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleSave} 
        />
      )}
    </div>
  );
};

export default EmployeeList;
