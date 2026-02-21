// // src/Components/AlumniDirectory.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AlumniDirectory.css';  // Add your custom styles
// import { useNavigate } from 'react-router-dom';

// const AlumniDirectory = () => {
//   const [alumni, setAlumni] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch alumni data from the backend
//   const fetchAlumni = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/auth/alumni-directory', { withCredentials: true });
//       setAlumni(response.data);
//       setLoading(false);
//     } catch (error) {
//       setError('Failed to fetch alumni details.');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAlumni(); // Fetch alumni data on component mount
//   }, []);
//   const navigate = useNavigate();
//   const navigateToDiscussion = () => {
//     navigate('/discussion');
//   };

//   // Navigate to the Job Portal page
//   const navigateToJobPost = () => {
//     navigate('/jobpost');
//   };
//   const navigateToEvent= () => {
//     navigate('/event-portal');
//   };
//   const navigateToDashboard= () => {
//     navigate('/dashboard');
//   };
//   const navigateToProfile= () => {
//     navigate('/profile');
//   };
//   const navigateToDonation= () => {
//     navigate('/donation');
//   };

//   return (
//     <div className="alumni-directory-container">
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo"><a href='#' onClick={navigateToDashboard} style={{color:"white"}}>AlumniSphere</a></div>
//         <div className="nav-links">
//           <a href="#" onClick={navigateToDiscussion}>Discussion Forum</a> {/* Use navigate for redirection */}
//           <a href="#" onClick={navigateToJobPost}>Job Portal</a> {/* Navigate to Job Portal */}
//           <a href="#" onClick={navigateToEvent}>Events</a>
//           <a href="#" onClick={navigateToDonation}>Giving</a>
//         </div>
//         <div className="profile-btn">
//   {/* Profile logo */}
//   <img 
//     src="profile-logo.png" 
//     alt="Profile" 
//     className="profile-logo" 
//     onClick={navigateToProfile} 
//     style={{
//       cursor: 'pointer',
//       width: '40px',
//       height: '40px',
//       borderRadius: '50%', // This makes the image circular
//       objectFit: 'cover' // Ensures the image fits nicely inside the circle
//     }}
//   />
// </div>

//       </nav>

//       <section className="hero-section">
//         <h1>Alumni Directory</h1>
//       </section>

//       <div className="directory-content">
//         {error && <p className="error-message">{error}</p>}

//         {loading ? (
//           <p>Loading alumni data...</p>
//         ) : (
//           <div className="alumni-list">
//             {alumni.map((alumnus, index) => (
//               <div key={index} className="alumni-item">
//                 <h3>{alumnus.name}</h3>
//                 <p><strong>Degree:</strong> {alumnus.department}</p>
//                 <p><strong>Year of Graduation:</strong> {alumnus.gradYear}</p>
//                 <p><strong>Skills:</strong> {alumnus.knownSkills.join(', ')}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <footer className="footer">
//         <p>&copy; 2026 AlumniSphere. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default AlumniDirectory;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AlumniDirectory.css';
import { useNavigate } from 'react-router-dom';

const AlumniDirectory = () => {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const navigate = useNavigate();

  // ---------------- FETCH ALUMNI ----------------
  const fetchAlumni = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/auth/alumni-directory',
        { withCredentials: true }
      );
      setAlumni(response.data);
      setFilteredAlumni(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch alumni details.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  // ---------------- FILTER LOGIC ----------------
  useEffect(() => {
    let filtered = alumni;

    if (selectedDepartment) {
      filtered = filtered.filter(
        (alumnus) =>
          alumnus.department &&
          alumnus.department.toLowerCase().includes(selectedDepartment.toLowerCase())
      );
    }

    if (selectedYear) {
      filtered = filtered.filter(
        (alumnus) => alumnus.gradYear === parseInt(selectedYear)
      );
    }

    setFilteredAlumni(filtered);
  }, [selectedDepartment, selectedYear, alumni]);

  // ---------------- NAVIGATION ----------------
  const navigateToDiscussion = () => navigate('/discussion');
  const navigateToJobPost = () => navigate('/jobpost');
  const navigateToEvent = () => navigate('/event-portal');
  const navigateToDashboard = () => navigate('/dashboard');
  const navigateToProfile = () => navigate('/profile');
  const navigateToDonation = () => navigate('/donation');

  return (
    <div className="alumni-directory-container">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <a href='#' onClick={navigateToDashboard} style={{color:"white"}}>
            AlumniSphere
          </a>
        </div>

        <div className="nav-links">
          <a href="#" onClick={navigateToDiscussion}>Discussion Forum</a>
          <a href="#" onClick={navigateToJobPost}>Job Portal</a>
          <a href="#" onClick={navigateToEvent}>Events</a>
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

      <section className="hero-section">
        <h1>Alumni Directory</h1>
      </section>

      {/* ---------------- FILTER SECTION ---------------- */}
<div className="filter-section">
  <label className="filter-label">Filter Alumni:</label>
  <div className="filter-group">
    <label>Filter by Department</label>
    <select
      value={selectedDepartment}
      onChange={(e) => setSelectedDepartment(e.target.value)}
    >
      <option value="">All</option>
      <option value="Computer Science">CSE</option>
      <option value="Electronics and Communication Engineering">ECE</option>
      <option value="Electrical and Electronics Engineering">EEE</option>
      <option value="Civil Engineering">Civil</option>
      <option value="Mechanical Engineering">Mech</option>
      <option value="Artificial Intelligience and Data Science">AI & DS</option>
    </select>
  </div>

  <div className="filter-group">
    <label>Filter by Graduation Year</label>
    <select
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
    >
      <option value="">All</option>
      {Array.from({ length: 12 }, (_, i) => 2026 - i).map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>

</div>

      {/* ---------------- ALUMNI LIST ---------------- */}
      <div className="directory-content">
        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <p>Loading alumni data...</p>
        ) : filteredAlumni.length === 0 ? (
          <p>No alumni found.</p>
        ) : (
          <div className="alumni-list">
            {filteredAlumni.map((alumnus, index) => (
              <div key={index} className="alumni-item">
                <h3>{alumnus.name}</h3>
                <p><strong>Department:</strong> {alumnus.department}</p>
                <p><strong>Year of Graduation:</strong> {alumnus.gradYear}</p>
                <p>
                  <strong>Skills:</strong>{" "}
                  {alumnus.knownSkills?.length > 0
                    ? alumnus.knownSkills.join(', ')
                    : "Not specified"}
                </p>
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

export default AlumniDirectory;