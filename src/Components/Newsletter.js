// // src/Components/AlumniDirectory.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Newsletter.css';  // Add your custom styles
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
//         <h1>CKCET Newsletter</h1>
//       </section>

//       <div className="directory-content">
//         {error && <p className="error-message">{error}</p>}

//         {loading ? (
//           <p>Loading alumni data...</p>
//         ) : (
//           <div className="alumni-list">
//               <div className="alumni-item">
//                 <h3>November</h3>
//                 <p><strong>Click to download</strong></p>
//               </div>
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








import React from "react";
import { useNavigate } from "react-router-dom";
import "./Newsletter.css";
import PDFViewer from "./PDFViewer";

const Newsletter = () => {
  const navigate = useNavigate();

  const navigateToDiscussion = () => navigate('/discussion');
  const navigateToJobPost = () => navigate('/jobpost');
  const navigateToEvent = () => navigate('/event-portal');
  const navigateToDonation = () => navigate('/donation');
  const navigateToDashboard = () => navigate('/dashboard');
  const navigateToProfile = () => navigate('/profile');
  const navigateToDirectory = () => navigate('/alumni-directory');

  const newsletters = [
    {
      title: "January 2026 Newsletter",
      file: "/newsletters/jan-2026.pdf"
    },
    {
      title: "December 2025 Newsletter",
      file: "/newsletters/dec-2025.pdf"
    },
    {
      title: "November 2025 Newsletter",
      file: "/newsletters/nov-2025.pdf"
    }
  ];

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
        <h2 className="title">NEWSLETTER ARCHIVE</h2>

        <div className="form-card" style={{ padding: "25px" }}>
          {newsletters.map((nl, index) => (
            <div key={index} style={{ marginBottom: "40px" }}>
              
              <h3 style={{ marginBottom: "15px" }}>{nl.title}</h3>

              {/* PDF Viewer */}
              <PDFViewer file={nl.file} />

              {/* Download Button */}
              <div style={{ marginTop: "15px", display: "flex", justifyContent: "center" }}>
                <a
                  href={nl.file}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="submit-btn"
                  style={{
                    textDecoration: "none",
                    padding: "10px 20px",
                    fontSize: "14px",
                    backgroundColor: "#231A6D"
                  }}
                >
                  Download
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>

      <div className="footer">
        © 2026 CKCET Alumni Network | All Rights Reserved
      </div>

    </div>
  );
};

export default Newsletter;