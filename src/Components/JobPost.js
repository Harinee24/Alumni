// // src/Components/JobPost.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import './JobPost.css'; // Import the CSS for styling

// const JobPost = () => {
//   const [jobData, setJobData] = useState({
//     title: '',
//     company: '',
//     skills: '',
//     experience: '',
//     description: '',
//     location: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setJobData({
//       ...jobData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!jobData.title || !jobData.company || !jobData.skills || !jobData.experience || !jobData.description || !jobData.location) {
//       return setError('All fields are required!');
//     }

//     setLoading(true);
//     try {
//       await axios.post('http://localhost:5000/api/jobs', jobData, { withCredentials: true });
//       setJobData({
//         title: '',
//         company: '',
//         skills: '',
//         experience: '',
//         description: '',
//         location: ''
//       });
//       setError('');
//       alert('Job posting successfully created!');
//     } catch (error) {
//       setError('Failed to post job');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="job-post-container">
//       <h2>Post a New Job</h2>
//       {error && <p className="error-message">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Job Title</label>
//           <input
//             type="text"
//             name="title"
//             value={jobData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Company</label>
//           <input
//             type="text"
//             name="company"
//             value={jobData.company}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Skills</label>
//           <input
//             type="text"
//             name="skills"
//             value={jobData.skills}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Experience (in years)</label>
//           <input
//             type="number"
//             name="experience"
//             value={jobData.experience}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             name="description"
//             value={jobData.description}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Location</label>
//           <input
//             type="text"
//             name="location"
//             value={jobData.location}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? 'Posting...' : 'Post Job'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default JobPost;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobPost.css';

const JobPost = () => {
  // State for new job post
  const [job, setJob] = useState({
    title: '',
    company: '',
    skills: '',
    experience: '',
    description: '',
    location: '',
  });

  // State for already posted jobs
  const [jobs, setJobs] = useState([]);

  // State for error handling
  const [error, setError] = useState('');

  // Fetch the posted jobs from the backend when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs', { withCredentials: true });
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Error fetching jobs');
      }
    };

    fetchJobs();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Handle form submission to create a new job posting
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', job, { withCredentials: true });
      setJob({
        title: '',
        company: '',
        skills: '',
        experience: '',
        description: '',
        location: '',
      });

      // Refresh the job list after a new job posting is added
      const response = await axios.get('http://localhost:5000/api/jobs', { withCredentials: true });
      setJobs(response.data);
    } catch (error) {
      setError('Error posting job');
      console.error('Error posting job:', error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  return (
    <div className="job-post-container">
      {/* Job posting form */}
      <h2>Create a Job Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Job Title:</label>
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={job.company}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Skills:</label>
          <input
            type="text"
            name="skills"
            value={job.skills}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Experience (in years):</label>
          <input
            type="number"
            name="experience"
            value={job.experience}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={job.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={job.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Post Job</button>
      </form>

      {/* Displaying posted jobs */}
      <h2>Posted Job Openings</h2>
      {error && <p className="error">{error}</p>}
      <div className="job-list">
        {jobs.length === 0 ? (
          <p>No job openings available at the moment.</p>
        ) : (
          jobs.map((jobItem, index) => (
            <div key={index} className="job-item">
              <h3>{jobItem.title}</h3>
              <p><strong>Company:</strong> {jobItem.company}</p>
              <p><strong>Skills:</strong> {jobItem.skills}</p>
              <p><strong>Experience:</strong> {jobItem.experience} years</p>
              <p><strong>Description:</strong> {jobItem.description}</p>
              <p><strong>Location:</strong> {jobItem.location}</p>
              <p><strong>Date Posted:</strong> {new Date(jobItem.datePosted).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobPost;
