import React, { useState, useEffect } from 'react';
import '../assets/StyleSheets/PatientPage.css';

function PatientPage() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    illness: '',
    phoneNo: '',
    email: '',
  });
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const fetchPatients = async () => {
    try {
      const res = await fetch('/api/patient');
      const data = await res.json();
      if (data.success) setPatients(data.patient);
    } catch (error) {
      console.error('Failed to fetch patients', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditChange = e => {
    setEditFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, illness, phoneNo, email } = formData;
    if (!name || !illness || !phoneNo || !email) {
      alert('Please fill all fields');
      return;
    }
    try {
      const res = await fetch('/api/patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          illness,
          phoneNo: Number(phoneNo),
          email,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormData({ name: '', illness: '', phoneNo: '', email: '' });
        fetchPatients();
      } else {
        alert(data.message || 'Failed to add patient');
      }
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this patient?')) return;
    try {
      const res = await fetch(`/api/patient/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchPatients();
      } else {
        alert(data.message || 'Failed to delete patient');
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const startEditing = (patient) => {
    setEditingPatientId(patient._id);
    setEditFormData({
      name: patient.name,
      illness: patient.illness,
      phoneNo: patient.phoneNo,
      email: patient.email,
    });
  };

  const cancelEditing = () => {
    setEditingPatientId(null);
    setEditFormData({});
  };

  const submitEdit = async (id) => {
    const { name, illness, phoneNo, email } = editFormData;
    if (!name || !illness || !phoneNo || !email) {
      alert('Please fill all fields');
      return;
    }
    try {
      const res = await fetch(`/api/patient/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          illness,
          phoneNo: Number(phoneNo),
          email,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEditingPatientId(null);
        fetchPatients();
      } else {
        alert(data.message || 'Failed to update patient');
      }
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  return (
    <div className="container">
      <h2>Add New Patient</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="inputField"
        />
        <input
          name="illness"
          placeholder="Illness"
          value={formData.illness}
          onChange={handleChange}
          required
          className="inputField"
        />
        <input
          name="phoneNo"
          placeholder="Phone Number"
          value={formData.phoneNo}
          onChange={handleChange}
          required
          type="number"
          className="inputField"
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          type="email"
          className="inputField"
        />
        <button type="submit" className="btn primaryBtn">Add Patient</button>
      </form>

      <h2>Patients List</h2>
      {patients.length === 0 && <p>No patients found.</p>}

      {patients.map(patient => (
        <div key={patient._id} className="patientCard">
          {editingPatientId === patient._id ? (
            <>
              <input
                name="name"
                value={editFormData.name}
                onChange={handleEditChange}
                className="inlineInput"
              />
              <input
                name="illness"
                value={editFormData.illness}
                onChange={handleEditChange}
                className="inlineInput"
              />
              <input
                name="phoneNo"
                value={editFormData.phoneNo}
                onChange={handleEditChange}
                type="number"
                className="inlineInput"
              />
              <input
                name="email"
                value={editFormData.email}
                onChange={handleEditChange}
                type="email"
                className="inlineInput"
              />
              <div className="buttonsGroup">
                <button
                  onClick={() => submitEdit(patient._id)}
                  className="btn primaryBtn"
                >
                  Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="btn secondaryBtn"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {patient.name}</p>
              <p><strong>Illness:</strong> {patient.illness}</p>
              <p><strong>Phone:</strong> {patient.phoneNo}</p>
              <p><strong>Email:</strong> {patient.email}</p>
              <button
                onClick={() => startEditing(patient)}
                className="btn primaryBtn"
                style={{ marginRight: 10 }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(patient._id)}
                className="btn dangerBtn"
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default PatientPage;
