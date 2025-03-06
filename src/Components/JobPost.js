import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobPost.css'; // Assuming you have a CSS file for styling

const JobPost = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/jobs', { withCredentials: true });
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load jobs');
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Handle Job Post submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      title: jobTitle,
      company,
      skills,
      experience,
      description,
      location,
    };

    try {
      await axios.post('http://localhost:5000/api/jobs', jobData, { withCredentials: true });
      setJobTitle('');
      setCompany('');
      setSkills('');
      setExperience('');
      setDescription('');
      setLocation('');
      // Reload jobs after submission
      const response = await axios.get('http://localhost:5000/api/jobs', { withCredentials: true });
      setJobs(response.data);
    } catch (error) {
      setError('Failed to post job');
    }
  };

  return (
    <div className="job-post-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">AlumniSphere</div>
        <div className="nav-links">
          <a href="/dashboard">Dashboard</a>
          <a href="#">Job Postings</a>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Job Portal</h1>
      </section>

       {/* Display Job Listings */}
       <div className="job-list">
        <h2>All Job Listings</h2>
        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <div className="message-list">
            {jobs.map((job) => (
              <div key={job._id} className="job-item">
                {/* <div className="job-header">
                  <span>{job.title}</span>
                  <span>{new Date(job.createdAt).toLocaleString()}</span>
                </div> */}
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


      {/* Job Posting Form */}
      <div className="job-form-container">
        <form onSubmit={handleSubmit}>
          <h2>Post a New Job</h2>

          <div>
            <label>Job Title</label>
            <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
          </div>

          <div>
            <label>Company</label>
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
          </div>

          <div>
            <label>Skills</label>
            <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} required />
          </div>

          <div>
            <label>Experience (years)</label>
            <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} required />
          </div>

          <div>
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>

          <div>
            <label>Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>

     
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 AlumniSphere. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default JobPost;
