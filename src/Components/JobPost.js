// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './JobPost.css'; // Assuming you have a CSS file for styling

// const JobPost = () => {
//   const [jobTitle, setJobTitle] = useState('');
//   const [company, setCompany] = useState('');
//   const [skills, setSkills] = useState('');
//   const [experience, setExperience] = useState('');
//   const [description, setDescription] = useState('');
//   const [location, setLocation] = useState('');
//   const [error, setError] = useState('');
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch jobs on component mount
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('http://localhost:5000/api/jobs', { withCredentials: true });
//         setJobs(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError('Failed to load jobs');
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   // Handle Job Post submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const jobData = {
//       title: jobTitle,
//       company,
//       skills,
//       experience,
//       description,
//       location,
//     };

//     try {
//       await axios.post('http://localhost:5000/api/jobs', jobData, { withCredentials: true });
//       setJobTitle('');
//       setCompany('');
//       setSkills('');
//       setExperience('');
//       setDescription('');
//       setLocation('');
//       // Reload jobs after submission
//       const response = await axios.get('http://localhost:5000/api/jobs', { withCredentials: true });
//       setJobs(response.data);
//     } catch (error) {
//       setError('Failed to post job');
//     }
//   };
//   const navigate = useNavigate();
    
//   const navigateToDiscussion = () => {
//     navigate('/discussion');
//   };

//   // Navigate to the Profile page when clicking the profile logo
//   const navigateToProfile = () => {
//     navigate('/profile');
//   };

//   const navigateToDashboard = () => {
//     navigate('/dashboard');
//   };
//   const navigateToEvent= () => {
//     navigate('/event-portal');
//   };
//   const navigateToDonation= () => {
//     navigate('/donation');
//   };

//   return (
//     <div className="job-post-container">
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo"><a href='#' onClick={navigateToDashboard} style={{color:"white"}}>AlumniSphere</a></div>
//         <div className="nav-links">
//           <a href="#" onClick={navigateToDiscussion}>Discussion Forum</a> {/* Use navigate for redirection */}
//           <a href="#" >Job Portal</a> {/* Navigate to Job Portal */}
//           <a href="#"onClick={navigateToEvent}>Events</a>
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
//       {/* Hero Section */}
//       <section className="hero-section">
//         <h1>Job Portal</h1>
//       </section>

//        {/* Display Job Listings */}
//        <div className="job-list">
//         <h2>All Job Listings</h2>
//         {loading ? (
//           <p>Loading jobs...</p>
//         ) : (
//           <div className="message-list">
//             {jobs.map((job) => (
//               <div key={job._id} className="job-item">
//                 {/* <div className="job-header">
//                   <span>{job.title}</span>
//                   <span>{new Date(job.createdAt).toLocaleString()}</span>
//                 </div> */}
//                 <p><strong>Title:</strong> {job.title}</p>
//                 <p><strong>Company:</strong> {job.company}</p>
//                 <p><strong>Skills:</strong> {job.skills}</p>
//                 <p><strong>Experience:</strong> {job.experience} years</p>
//                 <p><strong>Description:</strong> {job.description}</p>
//                 <p><strong>Location:</strong> {job.location}</p>
//                 <p><strong>Posted by:</strong> {job.user ? job.user.name : 'Unknown User'}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>


//       {/* Job Posting Form */}
//       <div className="job-form-container">
//         <form onSubmit={handleSubmit}>
//           <h2>Post a New Job</h2>

//           <div>
//             <label>Job Title</label>
//             <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
//           </div>

//           <div>
//             <label>Company</label>
//             <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
//           </div>

//           <div>
//             <label>Skills</label>
//             <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} required />
//           </div>

//           <div>
//             <label>Experience (years)</label>
//             <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} required />
//           </div>

//           <div>
//             <label>Description</label>
//             <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
//           </div>

//           <div>
//             <label>Location</label>
//             <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
//           </div>

//           <button type="submit" disabled={loading}>
//             {loading ? 'Posting...' : 'Post Job'}
//           </button>
//         </form>

//         {error && <p className="error-message">{error}</p>}
//       </div>

     
//       {/* Footer */}
//       <footer className="footer">
//         <p>&copy; 2026 AlumniSphere. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default JobPost;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './JobPost.css';

const JobPost = () => {

  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [jobs, setJobs] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [authError, setAuthError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ---------------- FETCH CURRENT USER ----------------
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/auth/profile',
        { withCredentials: true }
      );
      setUserRole(response.data.role);
    } catch (err) {
      console.error("User not logged in");
      setAuthError("Please login to access job portal.");
    }
  };

  // ---------------- FETCH JOBS ----------------
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'http://localhost:5000/api/jobs',
        { withCredentials: true }
      );
      setJobs(response.data);
    } catch (error) {
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchJobs();
  }, []);

  // ---------------- HANDLE SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userRole !== "Alumni") {
      alert("Only Alumni can post job openings.");
      return;
    }

    const jobData = {
      title: jobTitle,
      company,
      skills,
      experience,
      description,
      location,
    };

    try {
      setLoading(true);

      await axios.post(
        'http://localhost:5000/api/jobs',
        jobData,
        { withCredentials: true }
      );

      setJobTitle('');
      setCompany('');
      setSkills('');
      setExperience('');
      setDescription('');
      setLocation('');

      fetchJobs();

    } catch (error) {
      setError('Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  // ---------------- NAVIGATION ----------------
  const navigateToDiscussion = () => navigate('/discussion');
  const navigateToProfile = () => navigate('/profile');
  const navigateToDashboard = () => navigate('/dashboard');
  const navigateToEvent = () => navigate('/event-portal');
  const navigateToDonation = () => navigate('/donation');

  return (
    <div className="job-post-container">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <a href="#" onClick={navigateToDashboard} style={{ color: "white" }}>
            AlumniSphere
          </a>
        </div>

        <div className="nav-links">
          <a href="#" onClick={navigateToDiscussion}>Discussion Forum</a>
          <a href="#">Job Portal</a>
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

      {/* Hero */}
      <section className="hero-section">
        <h1>Job Portal</h1>
      </section>

      {/* Auth Error */}
      {authError && (
        <div style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
          {authError}
        </div>
      )}


      {/* POST FORM ONLY FOR ALUMNI */}
      {userRole === "Alumni" && (
        <div className="job-form-container">
          <form onSubmit={handleSubmit}>
            <h2>Post a New Job</h2>

            <label>Job Title</label>
            <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />

            <label>Company</label>
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />

            <label>Skills</label>
            <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} required />

            <label>Experience (years)</label>
            <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} required />

            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

            <label>Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />

            <button type="submit" disabled={loading}>
              {loading ? 'Posting...' : 'Post Job'}
            </button>
          </form>

          {error && <p className="error-message">{error}</p>}
        </div>
      )}

      {/* STUDENT VIEW MESSAGE */}
      {userRole === "student" && (
        <div style={{ textAlign: "center", marginTop: "20px", color: "#555" }}>
          <p>Students can view jobs but cannot post openings.</p>
        </div>
      )}


            {/* JOB LIST */}
      <div className="job-list">
        <h2>All Job Listings</h2>

        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <div className="message-list">
            {jobs.map((job) => (
              <div key={job._id} className="job-item">
                <p><strong>Title:</strong> {job.title}</p>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Skills:</strong> {job.skills}</p>
                <p><strong>Experience:</strong> {job.experience} years</p>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Posted by:</strong> {job.user ? job.user.name : 'Unknown User'}</p>
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

export default JobPost;