// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './EventPortal.css';
// import { useNavigate } from 'react-router-dom';

// const EventPortal = () => {

//   // ---------------- FORM STATE ----------------
//   const [formData, setFormData] = useState({
//     eventTopic: '',
//     degreeAndYear: '',
//     expectedStudents: '',
//     eventDateTime: '',
//     additionalNotes: '',
//   });

//   // ---------------- EVENTS STATE ----------------
//   const [events, setEvents] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();

//   // ---------------- FETCH EVENTS ----------------
//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get(
//         'http://localhost:5000/api/events/all-events',
//         { withCredentials: true }
//       );
//       setEvents(response.data);
//     } catch (err) {
//       console.error("Failed to fetch events", err);
//     }
//   };

//   // Fetch when page loads
//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // ---------------- HANDLE INPUT CHANGE ----------------
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // ---------------- HANDLE SUBMIT ----------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await axios.post(
//         'http://localhost:5000/api/events/create-event',
//         formData,
//         { withCredentials: true }
//       );

//       alert(response.data.message);

//       // Reset form
//       setFormData({
//         eventTopic: '',
//         degreeAndYear: '',
//         expectedStudents: '',
//         eventDateTime: '',
//         additionalNotes: '',
//       });

//       // Refresh events list
//       fetchEvents();

//     } catch (error) {
//       setError('Error: Failed to create event.');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- NAVIGATION ----------------
//   const navigateToDiscussion = () => navigate('/discussion');
//   const navigateToProfile = () => navigate('/profile');
//   const navigateToDashboard = () => navigate('/dashboard');
//   const navigateToJobPortal = () => navigate('/jobpost');
//   const navigateToDonation = () => navigate('/donation');

//   return (
//     <div className="event-portal-container">

//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">
//           <a href="#" onClick={navigateToDashboard} style={{ color: "white" }}>
//             AlumniSphere
//           </a>
//         </div>

//         <div className="nav-links">
//           <a href="#" onClick={navigateToDiscussion}>Discussion Forum</a>
//           <a href="#" onClick={navigateToJobPortal}>Job Portal</a>
//           <a href="#">Events</a>
//           <a href="#" onClick={navigateToDonation}>Giving</a>
//         </div>

//         <div className="profile-btn">
//           <img
//             src="profile-logo.png"
//             alt="Profile"
//             className="profile-logo"
//             onClick={navigateToProfile}
//             style={{
//               cursor: 'pointer',
//               width: '40px',
//               height: '40px',
//               borderRadius: '50%',
//               objectFit: 'cover'
//             }}
//           />
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="hero-section">
//         <h1>Create an Event</h1>
//       </section>

//       {/* Event Form */}
//       <div className="event-form">
//         <h2><center>Event Requisition Form</center></h2>

//         {error && <p className="error-message">{error}</p>}

//         <form onSubmit={handleSubmit} className="form-container">

//           <div className="form-group">
//             <label>Event Topic</label>
//             <input
//               type="text"
//               name="eventTopic"
//               value={formData.eventTopic}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Degree & Year of Students</label>
//             <input
//               type="text"
//               name="degreeAndYear"
//               value={formData.degreeAndYear}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Expected Students</label>
//             <input
//               type="number"
//               name="expectedStudents"
//               value={formData.expectedStudents}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Event Date and Time</label>
//             <input
//               type="datetime-local"
//               name="eventDateTime"
//               value={formData.eventDateTime}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Additional Notes</label>
//             <textarea
//               name="additionalNotes"
//               value={formData.additionalNotes}
//               onChange={handleChange}
//             ></textarea>
//           </div>

//           <button type="submit" disabled={loading} className="submit-button">
//             {loading ? 'Submitting...' : 'Submit Event'}
//           </button>

//         </form>
//       </div>

//       {/* ---------------- DISPLAY EVENTS ---------------- */}
//       <div className="events-list-section">
//         <h2><center>Previously Created Events</center></h2>

//         {events.length === 0 ? (
//           <p style={{ textAlign: 'center' }}>No events created yet.</p>
//         ) : (
//           <div className="events-container">
//             {events.map((event) => (
//               <div key={event._id} className="event-card">
//                 <h3>{event.eventTopic}</h3>
//                 <p><strong>Degree & Year:</strong> {event.degreeAndYear}</p>
//                 <p><strong>Expected Students:</strong> {event.expectedStudents}</p>
//                 <p>
//                   <strong>Date:</strong>{" "}
//                   {new Date(event.eventDateTime).toLocaleString()}
//                 </p>
//                 {event.additionalNotes && (
//                   <p><strong>Notes:</strong> {event.additionalNotes}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <footer className="footer">
//         <p>&copy; 2026 AlumniSphere. All Rights Reserved.</p>
//       </footer>

//     </div>
//   );
// };

// export default EventPortal;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventPortal.css';
import { useNavigate } from 'react-router-dom';

const EventPortal = () => {

  const [formData, setFormData] = useState({
    eventTopic: '',
    degreeAndYear: '',
    expectedStudents: '',
    eventDateTime: '',
    additionalNotes: '',
  });

  const [events, setEvents] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authError, setAuthError] = useState('');

  const navigate = useNavigate();

  // ---------------- FETCH LOGGED-IN USER ----------------
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/auth/profile',
        { withCredentials: true }
      );

      setUserRole(response.data.role);

    } catch (err) {
      console.error("User not logged in");
      setAuthError("Please login to access events.");
    }
  };

  // ---------------- FETCH EVENTS ----------------
  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/events/all-events',
        { withCredentials: true }
      );
      setEvents(response.data);
    } catch (err) {
      console.error("Failed to fetch events", err);
    }
  };

  // On load
  useEffect(() => {
    fetchCurrentUser();
    fetchEvents();
  }, []);

  // ---------------- HANDLE INPUT ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ---------------- HANDLE SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userRole !== "Alumni") {
      alert("Only Alumni can create events.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/events/create-event',
        formData,
        { withCredentials: true }
      );

      alert(response.data.message);

      setFormData({
        eventTopic: '',
        degreeAndYear: '',
        expectedStudents: '',
        eventDateTime: '',
        additionalNotes: '',
      });

      fetchEvents();

    } catch (error) {
      setError('Error: Failed to create event.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- NAVIGATION ----------------
  const navigateToDiscussion = () => navigate('/discussion');
  const navigateToProfile = () => navigate('/profile');
  const navigateToDashboard = () => navigate('/dashboard');
  const navigateToJobPortal = () => navigate('/jobpost');
  const navigateToDonation = () => navigate('/donation');
  const navigateToDirectory = () => navigate('/alumni-directory');

  return (
    <div className="event-portal-container">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <a href="#" onClick={navigateToDashboard} style={{ color: "white" }}>
            AlumniSphere
          </a>
        </div>

        <div className="nav-links">
          <a href="#" onClick={navigateToDiscussion}>Discussion Forum</a>
          <a href="#" onClick={navigateToJobPortal}>Job Portal</a>
          <a href="#">Events</a>
          <a href="#" onClick={navigateToDirectory}>Alumni Directory</a>
          <a href="#" onClick={navigateToDonation}>Giving</a>
        </div>

        <div className="profile-btn">
          <img
            src="profile-logo.png"
            alt="Profile"
            className="profile-logo"
            onClick={navigateToProfile}
            style={{
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <h1>Events</h1>
      </section>

      {/* If not logged in */}
      {authError && (
        <div style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
          {authError}
        </div>
      )}

      {/* Show form ONLY for Alumni */}
      {userRole === "Alumni" && (
        <div className="event-form">
          <h2><center>Create an Event</center></h2>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit} className="form-container">

            <div className="form-group">
              <label>Event Topic</label>
              <input
                type="text"
                name="eventTopic"
                value={formData.eventTopic}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Degree & Year of Students</label>
              <input
                type="text"
                name="degreeAndYear"
                value={formData.degreeAndYear}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Expected Students</label>
              <input
                type="number"
                name="expectedStudents"
                value={formData.expectedStudents}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Event Date and Time</label>
              <input
                type="datetime-local"
                name="eventDateTime"
                value={formData.eventDateTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Additional Notes</label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Event'}
            </button>

          </form>
        </div>
      )}

      {/* If Student */}
      {userRole === "student" && (
        <div style={{ textAlign: "center", marginTop: "20px", color: "#555" }}>
          <p>Students can view events but cannot create events.</p>
        </div>
      )}

      {/* Events List */}
      <div className="events-list-section">
        <h2><center>Previously Created Events</center></h2>

        {events.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No events created yet.</p>
        ) : (
          <div className="events-container">
            {events.map((event) => (
              <div key={event._id} className="event-card">
                <h3>{event.eventTopic}</h3>
                <p><strong>Degree & Year:</strong> {event.degreeAndYear}</p>
                <p><strong>Expected Students:</strong> {event.expectedStudents}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.eventDateTime).toLocaleString()}
                </p>
                {event.additionalNotes && (
                  <p><strong>Notes:</strong> {event.additionalNotes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="footer">
        <p>&copy; 2026 AlumniSphere. All Rights Reserved.</p>
      </footer>

    </div>
  );
};

export default EventPortal;