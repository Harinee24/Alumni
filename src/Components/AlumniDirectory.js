// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AlumniDirectory.css';
// import { useNavigate } from 'react-router-dom';

// const AlumniDirectory = () => {
//   const [alumni, setAlumni] = useState([]);
//   const [filteredAlumni, setFilteredAlumni] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [selectedYear, setSelectedYear] = useState('');

//   const navigate = useNavigate();

//   // ---------------- FETCH ALUMNI ----------------
//   const fetchAlumni = async () => {
//     try {
//       const response = await axios.get(
//         'http://localhost:5000/api/auth/alumni-directory',
//         { withCredentials: true }
//       );
//       setAlumni(response.data);
//       setFilteredAlumni(response.data);
//       setLoading(false);
//     } catch (error) {
//       setError('Failed to fetch alumni details.');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAlumni();
//   }, []);

//   // ---------------- FILTER LOGIC ----------------
//   useEffect(() => {
//     let filtered = alumni;

//     if (selectedDepartment) {
//       filtered = filtered.filter(
//         (alumnus) =>
//           alumnus.department &&
//           alumnus.department.toLowerCase().includes(selectedDepartment.toLowerCase())
//       );
//     }

//     if (selectedYear) {
//       filtered = filtered.filter(
//         (alumnus) => alumnus.gradYear === parseInt(selectedYear)
//       );
//     }

//     setFilteredAlumni(filtered);
//   }, [selectedDepartment, selectedYear, alumni]);

//   // ---------------- NAVIGATION ----------------
//   const navigateToDiscussion = () => navigate('/discussion');
//   const navigateToJobPost = () => navigate('/jobpost');
//   const navigateToEvent = () => navigate('/event-portal');
//   const navigateToDashboard = () => navigate('/dashboard');
//   const navigateToProfile = () => navigate('/profile');
//   const navigateToDonation = () => navigate('/donation');

//   return (
//     <div className="alumni-directory-container">

//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">
//           <a href='#' onClick={navigateToDashboard} style={{color:"white"}}>
//             AlumniSphere
//           </a>
//         </div>

//         <div className="nav-links">
//           <a href="#" onClick={navigateToDiscussion}>Discussion Forum</a>
//           <a href="#" onClick={navigateToJobPost}>Job Portal</a>
//           <a href="#" onClick={navigateToEvent}>Events</a>
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

//       <section className="hero-section">
//         <h1>Alumni Directory</h1>
//       </section>

//       {/* ---------------- FILTER SECTION ---------------- */}
// <div className="filter-section">
//   <label className="filter-label">Filter Alumni:</label>
//   <div className="filter-group">
//     <label>Filter by Department</label>
//     <select
//       value={selectedDepartment}
//       onChange={(e) => setSelectedDepartment(e.target.value)}
//     >
//       <option value="">All</option>
//       <option value="Computer Science">CSE</option>
//       <option value="Electronics and Communication Engineering">ECE</option>
//       <option value="Electrical and Electronics Engineering">EEE</option>
//       <option value="Civil Engineering">Civil</option>
//       <option value="Mechanical Engineering">Mech</option>
//       <option value="Artificial Intelligience and Data Science">AI & DS</option>
//     </select>
//   </div>

//   <div className="filter-group">
//     <label>Filter by Graduation Year</label>
//     <select
//       value={selectedYear}
//       onChange={(e) => setSelectedYear(e.target.value)}
//     >
//       <option value="">All</option>
//       {Array.from({ length: 12 }, (_, i) => 2026 - i).map((year) => (
//         <option key={year} value={year}>
//           {year}
//         </option>
//       ))}
//     </select>
//   </div>

// </div>

//       {/* ---------------- ALUMNI LIST ---------------- */}
//       <div className="directory-content">
//         {error && <p className="error-message">{error}</p>}

//         {loading ? (
//           <p>Loading alumni data...</p>
//         ) : filteredAlumni.length === 0 ? (
//           <p>No alumni found.</p>
//         ) : (
//           <div className="alumni-list">
//             {filteredAlumni.map((alumnus, index) => (
//               <div key={index} className="alumni-item">
//                 <h3>{alumnus.name}</h3>
//                 <p><strong>Department:</strong> {alumnus.department}</p>
//                 <p><strong>Year of Graduation:</strong> {alumnus.gradYear}</p>
//                 <p>
//                   <strong>Skills:</strong>{" "}
//                   {alumnus.knownSkills?.length > 0
//                     ? alumnus.knownSkills.join(', ')
//                     : "Not specified"}
//                 </p>
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
import './JobPost.css'; // Use same CSS template
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
  const navigateToDirectory = () => navigate('/alumni-directory');

  return (
    <div className="page-wrapper">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/cklogo.png" alt="logo" />
          <span onClick={navigateToDashboard} style={{ cursor: "pointer" }}>
            AlumniSphere
          </span>
        </div>

        <div className="nav-links">
          <a href="#" onClick={navigateToDiscussion}>Discussion Forum</a>
          <a href="#" onClick={navigateToJobPost}>Job Portal</a>
          <a href="#" onClick={navigateToEvent}>Events</a>
          <a href="#" onClick={navigateToDirectory}>Alumni Directory</a>          
          <a href="#" onClick={navigateToDonation}>Giving</a>
        </div>

        <div className="profile-btn">
          <img
            src="profile-logo.png"
            alt="Profile"
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

      <div className="job-container">
        <h2 className="title">ALUMNI DIRECTORY</h2>

        <img
          src="/alumni.png"
          alt="Alumni Directory"
          className="banner"
        />

        {/* FILTER SECTION styled like top-bar */}
        <div className="top-bar">
          <div className="filter">
            <label>Department </label>
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

          <div className="filter">
            <label>Graduation Year </label>
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

        {/* TABLE like Job Portal */}
        <table className="job-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Department</th>
              <th>Graduation Year</th>
              <th>Skills</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">Loading alumni data...</td>
              </tr>
            ) : filteredAlumni.length === 0 ? (
              <tr>
                <td colSpan="5">No alumni found.</td>
              </tr>
            ) : (
              filteredAlumni.map((alumnus, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{alumnus.name}</td>
                  <td>{alumnus.department}</td>
                  <td>{alumnus.gradYear}</td>
                  <td>
                    {alumnus.knownSkills?.length > 0
                      ? alumnus.knownSkills.join(', ')
                      : "Not specified"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {error && <p style={{ marginTop: "10px", color: "red" }}>{error}</p>}
      </div>

      <div className="footer">
        © 2026 CKCET Alumni Network | All Rights Reserved
      </div>
    </div>
  );
};

export default AlumniDirectory;