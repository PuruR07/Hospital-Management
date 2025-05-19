import React, { useEffect, useState } from 'react';
import '../assets/StyleSheets/DoctorsPage.css';
function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    phoneNo: '',
    email: ''
  });
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch doctors on mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await fetch('/api/doctors');
      const data = await res.json();
      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, phoneNo: Number(formData.phoneNo) };

    try {
      if (editingDoctorId) {
        const res = await fetch(`/api/doctors/${editingDoctorId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Failed to update doctor');
      } else {
        const res = await fetch('/api/doctors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Failed to add doctor');
      }

      setFormData({ name: '', specialty: '', phoneNo: '', email: '' });
      setEditingDoctorId(null);
      setIsFormVisible(false);
      fetchDoctors();
    } catch (err) {
      console.error('Error submitting doctor:', err);
    }
  };

  const handleEdit = (doctor) => {
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty,
      phoneNo: doctor.phoneNo,
      email: doctor.email
    });
    setEditingDoctorId(doctor._id);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete doctor');
      fetchDoctors();
    } catch (err) {
      console.error('Error deleting doctor:', err);
    }
  };

  return (
    <div className="doctors-page">
      <h1>Doctors Management</h1>

      <button className="add-doctor-btn" onClick={() => {
        setEditingDoctorId(null);
        setFormData({ name: '', specialty: '', phoneNo: '', email: '' });
        setIsFormVisible(true);
      }}>
        Add New Doctor
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="doctor-form">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="specialty" placeholder="Specialty" value={formData.specialty} onChange={handleChange} required />
          <input type="text" name="phoneNo" placeholder="Phone No." value={formData.phoneNo} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <button type="submit">{editingDoctorId ? 'Update' : 'Add'} Doctor</button>
        </form>
      )}

      <div className="doctor-cards">
        {doctors.map((doc) => (
          <div className="doctor-card" key={doc._id}>
            <h3>{doc.name}</h3>
            <p><strong>Specialty:</strong> {doc.specialty}</p>
            <p><strong>Phone:</strong> {doc.phoneNo}</p>
            <p><strong>Email:</strong> {doc.email}</p>
            <button onClick={() => handleEdit(doc)}>Update</button>
            <button onClick={() => handleDelete(doc._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsPage;
