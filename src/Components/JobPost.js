// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './JobPost.css';

// const JobPost = () => {

//   const [jobTitle, setJobTitle] = useState('');
//   const [company, setCompany] = useState('');
//   const [skills, setSkills] = useState('');
//   const [experience, setExperience] = useState('');
//   const [description, setDescription] = useState('');
//   const [location, setLocation] = useState('');

//   const [jobs, setJobs] = useState([]);
//   const [userRole, setUserRole] = useState(null);
//   const [authError, setAuthError] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   // ---------------- FETCH CURRENT USER ----------------
//   const fetchCurrentUser = async () => {
//     try {
//       const response = await axios.get(
//         'http://localhost:5000/api/auth/profile',
//         { withCredentials: true }
//       );
//       setUserRole(response.data.role);
//     } catch (err) {
//       console.error("User not logged in");
//       setAuthError("Please login to access job portal.");
//     }
//   };

//   // ---------------- FETCH JOBS ----------------
//   const fetchJobs = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         'http://localhost:5000/api/jobs',
//         { withCredentials: true }
//       );
//       setJobs(response.data);
//     } catch (error) {
//       setError('Failed to load jobs');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCurrentUser();
//     fetchJobs();
//   }, []);

  // // ---------------- HANDLE SUBMIT ----------------
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (userRole !== "Alumni") {
  //     alert("Only Alumni can post job openings.");
  //     return;
  //   }

  //   const jobData = {
  //     title: jobTitle,
  //     company,
  //     skills,
  //     experience,
  //     description,
  //     location,
  //   };

  //   try {
  //     setLoading(true);

  //     await axios.post(
  //       'http://localhost:5000/api/jobs',
  //       jobData,
  //       { withCredentials: true }
  //     );

  //     setJobTitle('');
  //     setCompany('');
  //     setSkills('');
  //     setExperience('');
  //     setDescription('');
  //     setLocation('');

  //     fetchJobs();

  //   } catch (error) {
  //     setError('Failed to post job');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

//   // ---------------- NAVIGATION ----------------
//   const navigateToDiscussion = () => navigate('/discussion');
//   const navigateToProfile = () => navigate('/profile');
//   const navigateToDashboard = () => navigate('/dashboard');
//   const navigateToEvent = () => navigate('/event-portal');
//   const navigateToDonation = () => navigate('/donation');

//   return (
//     <div className="job-post-container">

//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">
//           <a href="#" onClick={navigateToDashboard} style={{ color: "white" }}>
//             AlumniSphere
//           </a>
//         </div>

//         <div className="nav-links">
//           <a href="#" onClick={navigateToDiscussion}>Discussion Forum</a>
//           <a href="#">Job Portal</a>
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

//       {/* Hero */}
//       <section className="hero-section">
//         <h1>Job Portal</h1>
//       </section>

//       {/* Auth Error */}
//       {authError && (
//         <div style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
//           {authError}
//         </div>
//       )}


//       {/* POST FORM ONLY FOR ALUMNI */}
//       {userRole === "Alumni" && (
//         <div className="job-form-container">
//           <form onSubmit={handleSubmit}>
//             <h2>Post a New Job</h2>

//             <label>Job Title</label>
//             <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />

//             <label>Company</label>
//             <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />

//             <label>Skills</label>
//             <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} required />

//             <label>Experience (years)</label>
//             <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} required />

//             <label>Description</label>
//             <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

//             <label>Location</label>
//             <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />

//             <button type="submit" disabled={loading}>
//               {loading ? 'Posting...' : 'Post Job'}
//             </button>
//           </form>

//           {error && <p className="error-message">{error}</p>}
//         </div>
//       )}

//       {/* STUDENT VIEW MESSAGE */}
//       {userRole === "student" && (
//         <div style={{ textAlign: "center", marginTop: "20px", color: "#555" }}>
//           <p>Students can view jobs but cannot post openings.</p>
//         </div>
//       )}


//             {/* JOB LIST */}
//       <div className="job-list">
//         <h2>All Job Listings</h2>

//         {loading ? (
//           <p>Loading jobs...</p>
//         ) : (
//           <div className="message-list">
//             {jobs.map((job) => (
//               <div key={job._id} className="job-item">
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

//       <footer className="footer">
//         <p>&copy; 2026 AlumniSphere. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default JobPost;







// import React, { useState } from "react";
// import "./JobPost.css";

// function JobPost() {
//   const [jobs, setJobs] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedRole, setSelectedRole] = useState("All");

//   const [role, setRole] = useState("");
//   const [company, setCompany] = useState("");
//   const [stipend, setStipend] = useState("");
//   const [experience, setExperience] = useState("");

//   const handleAddJob = () => {
//     if (!role || !company || !stipend || !experience) {
//       alert("Please fill all fields");
//       return;
//     }

//     const newJob = {
//       id: jobs.length + 1,
//       role,
//       company,
//       stipend,
//       experience,
//       postedBy: "Alumni",
//     };

//     setJobs([...jobs, newJob]);

//     setRole("");
//     setCompany("");
//     setStipend("");
//     setExperience("");
//     setShowForm(false);
//   };

//   const filteredJobs =
//     selectedRole === "All"
//       ? jobs
//       : jobs.filter((job) => job.role === selectedRole);

//   return (
//     <div className="page-wrapper">
//       {/* NAVBAR */}
//       <div className="navbar">
//         <div className="logo">AlumniSphere</div>
//         <div className="nav-links">
//           <span>Discussion Forum</span>
//           <span>Job Portal</span>
//           <span>Events</span>
//           <span>Giving</span>
//         </div>
//       </div>

//       {/* MAIN */}
//       <div className="job-container">
//         <h2 className="title">JOB / INTERNSHIP PORTAL</h2>

//         <img
//           src="https://images.unsplash.com/photo-1551836022-d5d88e9218df"
//           alt="Handshake"
//           className="banner"
//         />

//         <div className="top-bar">
//           <div className="filter">
//             <label>Filter </label>
//             <select
//               value={selectedRole}
//               onChange={(e) => setSelectedRole(e.target.value)}
//             >
//               <option value="All">All</option>
//               {[...new Set(jobs.map((job) => job.role))].map(
//                 (roleOption, index) => (
//                   <option key={index} value={roleOption}>
//                     {roleOption}
//                   </option>
//                 )
//               )}
//             </select>
//           </div>

//           <button className="add-btn" onClick={() => setShowForm(!showForm)}>
//             + Add New
//           </button>
//         </div>

//         {/* PROFESSIONAL FORM */}
//         {showForm && (
//           <div className="form-card">
//             <h3 className="form-title">Post a New Job</h3>

//             <div className="form-grid">
//               <div className="form-group">
//                 <label>Role</label>
//                 <input
//                   type="text"
//                   value={role}
//                   onChange={(e) => setRole(e.target.value)}
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Company</label>
//                 <input
//                   type="text"
//                   value={company}
//                   onChange={(e) => setCompany(e.target.value)}
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Stipend</label>
//                 <input
//                   type="text"
//                   value={stipend}
//                   onChange={(e) => setStipend(e.target.value)}
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Experience</label>
//                 <input
//                   type="text"
//                   value={experience}
//                   onChange={(e) => setExperience(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="form-actions">
//               <button className="submit-btn" onClick={handleAddJob}>
//                 Submit
//               </button>
//             </div>
//           </div>
//         )}

//         {/* TABLE */}
//         <table className="job-table">
//           <thead>
//             <tr>
//               <th>S.No</th>
//               <th>Role</th>
//               <th>Company</th>
//               <th>Stipend</th>
//               <th>Experience</th>
//               <th>Posted by</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredJobs.length === 0 ? (
//               <tr>
//                 <td colSpan="6">No jobs available</td>
//               </tr>
//             ) : (
//               filteredJobs.map((job) => (
//                 <tr key={job.id}>
//                   <td>{job.id}</td>
//                   <td>{job.role}</td>
//                   <td>{job.company}</td>
//                   <td>{job.stipend}</td>
//                   <td>{job.experience}</td>
//                   <td>{job.postedBy}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="footer">© 2026 CKCET Alumni Network | All Rights Reserved</div>
//     </div>
//   );
// }

// export default JobPost;






import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JobPost.css";

function JobPost() {
  const navigate = useNavigate();

  // ---------------- STATE ----------------
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState("All");

  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState("");
  const [stipend, setStipend] = useState("");
  const [experience, setExperience] = useState(0);
  const [lastDate, setLastDate] = useState("");
  const [applyLink, setApplyLink] = useState("");

  const [userRole, setUserRole] = useState(null);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------- FETCH CURRENT USER ----------------
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/profile",
        { withCredentials: true }
      );
      setUserRole(response.data.role);
    } catch (err) {
      setAuthError("Please login to access job portal.");
    }
  };

  // ---------------- FETCH JOBS ----------------
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/jobs",
        { withCredentials: true }
      );

      const formattedJobs = response.data.map((job, index) => ({
        id: job._id,
        serial: index + 1,
        role: job.title,
        company: job.company,
        skills: job.skills,
        stipend: job.stipend,
        experience: job.experience,
        lastDate: job.lastDate,
        postedBy: job.user ? job.user.name : "Unknown",
        email: job.postedByEmail,
        applyLink: job.applyLink,
      }));

      setJobs(formattedJobs);
    } catch (error) {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchJobs();
  }, []);

  // ---------------- HANDLE SUBMIT ----------------
  const handleAddJob = async () => {
    if (!role || !company || !skills || !stipend || !lastDate) {
      alert("Please fill all fields");
      return;
    }

    if (userRole !== "Alumni") {
      alert("Only Alumni can post job openings.");
      return;
    }

    const jobData = {
      title: role,
      company,
      skills,
      stipend,
      experience,
      lastDate,
      applyLink,
    };

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/jobs",
        jobData,
        { withCredentials: true }
      );

      setRole("");
      setCompany("");
      setSkills("");
      setStipend("");
      setExperience(0);
      setLastDate("");
      setShowForm(false);

      fetchJobs();
    } catch (error) {
      setError("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs =
    selectedRole === "All"
      ? jobs
      : jobs.filter((job) => job.role === selectedRole);

  const navigateToDiscussion = () => navigate('/discussion');
  const navigateToJobPost = () => navigate('/jobpost');
  const navigateToEvent = () => navigate('/event-portal');
  const navigateToProfile = () => navigate('/profile');
  const navigateToDonation = () => navigate('/donation');
  const navigateToDashboard = () => navigate('/dashboard');
  const navigateToDirectory = () => navigate('/alumni-directory');

  return (
    <div className="page-wrapper">
      <nav className="navbar">
        <div className="logo">
          <img src="/cklogo.png" alt="logo" />
          <a href="#" onClick={navigateToDashboard} style={{ color: "white" }}>
            AlumniSphere
          </a>
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
        <h2 className="title">JOB / INTERNSHIP PORTAL</h2>

        <img
           src="/job.png"
           alt="Job Portal"
           className="banner"
         />

        <div className="top-bar">
          <div className="filter">
            <label>Filter </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="All">All</option>
              {[...new Set(jobs.map((job) => job.role))].map(
                (roleOption, index) => (
                  <option key={index} value={roleOption}>
                    {roleOption}
                  </option>
                )
              )}
            </select>
          </div>

          {userRole === "Alumni" && (
            <button
              className="add-btn"
              onClick={() => setShowForm(!showForm)}
            >
              + Add New
            </button>
          )}
        </div>

      {showForm && userRole === "Alumni" && (
      <div className="form-card">
        <h3 className="form-title">Post a New Opportunity</h3>

        <div className="form-grid">
          <div className="form-group">
            <label>Role</label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Frontend Developer"
            />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. ABC Pvt Ltd"
            />
          </div>

          <div className="form-group">
            <label>Skills</label>
            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Node.js"
            />
          </div>

          <div className="form-group">
            <label>Stipend / Salary</label>
            <input
              value={stipend}
              onChange={(e) => setStipend(e.target.value)}
              placeholder="e.g. 3 LPA"
            />
          </div>

          <div className="form-group">
            <label>Experience (Years)</label>
            <input
              type="number"
              min="0"
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Last Date to Apply</label>
            <input
              type="date"
              value={lastDate}
              onChange={(e) => setLastDate(e.target.value)}
            />
          </div>

          {/* Make Apply Link span full width */}
          <div className="form-group full-width">
            <label>Apply Link (Optional)</label>
            <input
              value={applyLink}
              onChange={(e) => setApplyLink(e.target.value)}
              placeholder="e.g. https://company.com/apply"
            />
          </div>
        </div>

        <div className="form-actions">
          <button className="submit-btn" onClick={handleAddJob}>
            {loading ? "Posting..." : "Submit"}
          </button>
        </div>
      </div>
    )}

        <table className="job-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Role</th>
              <th>Company</th>
              <th>Skills</th>
              <th>Stipend</th>
              <th>Experience</th>
              <th>Last Date</th>
              <th>Posted by</th>
              <th>Contact Email</th>              
              <th>Apply Link</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8">Loading jobs...</td>
              </tr>
            ) : filteredJobs.length === 0 ? (
              <tr>
                <td colSpan="8">No jobs available</td>
              </tr>
            ) : (
              filteredJobs.map((job, index) => (
                <tr key={job.id}>
                  <td>{index + 1}</td>
                  <td>{job.role}</td>
                  <td>{job.company}</td>
                  <td>{job.skills}</td>
                  <td>{job.stipend}</td>
                  <td>{job.experience}</td>
                  <td>{job.lastDate?.split("T")[0]}</td>
                  <td>{job.postedBy}</td>
                  <td>{job.email}</td>                  
                  <td>
                    {job.applyLink ? (
                      <a
                        href={job.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="apply-btn"
                      >
                        Apply
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="footer">
        © 2026 CKCET Alumni Network | All Rights Reserved
      </div>
    </div>
  );
}

export default JobPost;