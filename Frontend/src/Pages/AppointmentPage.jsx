import React, { useState, useEffect } from "react";
import "../assets/StyleSheets/AppointmentPage.css";

function AppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    patient: "",
    illness: "",
    doctorAssigned: "",
    date: "",
    time: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all appointments from backend
  const fetchAppointments = async () => {
    try {
      const res = await fetch("api/appointment");
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointment);
      } else {
        setError("Failed to fetch appointments");
      }
    } catch (err) {
      setError("Error fetching appointments: " + err.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit form to create or update appointment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const url = editingId
      ? `/api/appointment/${editingId}`
      : "/api/appointment";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Failed to save appointment");
        return;
      }

      // Reset form and editing state
      setFormData({
        patient: "",
        illness: "",
        doctorAssigned: "",
        date: "",
        time: "",
      });
      setEditingId(null);

      // Refresh list
      fetchAppointments();
    } catch (err) {
      setError("Error saving appointment: " + err.message);
    }
  };

  // Fill form with appointment data to edit
  const handleEdit = (appt) => {
    setFormData({
      patient: appt.patient,
      illness: appt.illness,
      doctorAssigned: appt.doctorAssigned,
      date: appt.date,
      time: appt.time,
    });
    setEditingId(appt._id);
  };

  // Delete appointment by id
  const handleDelete = async (id) => {
    setError(null);
    try {
      const res = await fetch(`/api/appointment/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Failed to delete appointment");
        return;
      }
      fetchAppointments();
    } catch (err) {
      setError("Error deleting appointment: " + err.message);
    }
  };

  return (
    <div className="appointment-container">
      <h2>Appointments</h2>

      {error && <div className="error-msg">{error}</div>}

      <form className="appointment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="patient"
          placeholder="Patient Name"
          value={formData.patient}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="illness"
          placeholder="Illness"
          value={formData.illness}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="doctorAssigned"
          placeholder="Doctor Assigned"
          value={formData.doctorAssigned}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Appointment" : "Add Appointment"}
        </button>
      </form>

      <div className="appointment-list">
        {appointments.length === 0 && <p>No appointments found.</p>}

        {appointments.map((appt) => (
          <div key={appt._id} className="appointment-item">
            <p>
              <strong>Patient:</strong> {appt.patient}
            </p>
            <p>
              <strong>Illness:</strong> {appt.illness}
            </p>
            <p>
              <strong>Doctor:</strong> {appt.doctorAssigned}
            </p>
            <p>
              <strong>Date:</strong> {appt.date}
            </p>
            <p>
              <strong>Time:</strong> {appt.time}
            </p>

            <button className="edit-btn" onClick={() => handleEdit(appt)}>
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDelete(appt._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppointmentPage;
