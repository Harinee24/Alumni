import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './JobPost.css';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: '',
    department: '',
    gradYear: '',
    email: '',
    role: '',
    knownSkills: [],
    experienceInYears: 0,
    currentCompany: '',
    currentRole: '',
    currentJobLocation: '',
    pastExperience: [],
    profilePic: '', // New field for profile pic
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [picFile, setPicFile] = useState(null); // Local file state

  const navigate = useNavigate();
  const navigateToDiscussion = () => navigate('/discussion');
  const navigateToJobPost = () => navigate('/jobpost');
  const navigateToDashboard = () => navigate('/dashboard');
  const navigateToEvent = () => navigate('/event-portal');
  const navigateToProfile = () => navigate('/profile');
  const navigateToDonation = () => navigate('/donation');
  const navigateToDirectory = () => navigate('/alumni-directory');

  // Fetch user profile
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/auth/profile', { withCredentials: true })
      .then((response) => {
        const data = response.data;
        setUser({
          ...data,
          knownSkills: data.knownSkills || [],
          pastExperience: data.pastExperience || [],
          profilePic: data.profilePic || '', // add profilePic
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching profile');
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'knownSkills') {
      setUser((prev) => ({
        ...prev,
        knownSkills: value ? value.split(',').map((s) => s.trim()) : [],
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Past Experience Handlers
  const handlePastChange = (index, field, value) => {
    const updated = [...(user.pastExperience || [])];
    updated[index][field] = value;
    setUser((prev) => ({ ...prev, pastExperience: updated }));
  };
  const addPastExperience = () => {
    setUser((prev) => ({
      ...prev,
      pastExperience: [...(prev.pastExperience || []), { company: '', role: '', years: 0 }],
    }));
  };
  const removePastExperience = (index) => {
    const updated = (user.pastExperience || []).filter((_, i) => i !== index);
    setUser((prev) => ({ ...prev, pastExperience: updated }));
  };

  // Handle profile pic upload
  const handlePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPicFile(e.target.files[0]);
    }
  };

  const uploadProfilePic = async () => {
    if (!picFile) return null;
    const formData = new FormData();
    formData.append('profilePic', picFile);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/upload-pic',
        formData,
        { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setUser((prev) => ({ ...prev, profilePic: res.data.profilePic }));
      toast.success('Profile picture updated!', { autoClose: 2000 });
      setPicFile(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload profile picture', { autoClose: 2000 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (picFile) await uploadProfilePic(); // Upload pic first
    try {
      const response = await axios.put(
        'http://localhost:5000/api/auth/profile',
        user,
        { withCredentials: true }
      );
      const updated = response.data;
      setUser({
        ...updated,
        knownSkills: updated.knownSkills || [],
        pastExperience: updated.pastExperience || [],
      });
      setLoading(false);
      toast.success('Profile updated successfully!', { position: "top-right", autoClose: 3000 });
    } catch {
      setError('Error updating profile');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true })
      .then(() => navigate('/'));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="page-wrapper">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/cklogo.png" alt="logo" />
          <a href="#" onClick={navigateToDashboard} style={{ color: "white" }}>AlumniSphere</a>
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
            src={user.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : "profile-logo.png"}
            alt="Profile"
            onClick={navigateToProfile}
            style={{ cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
      </nav>

      <div className="job-container">
        <h2 className="title">MY PROFILE</h2>

        <div className="form-card">
          <h3 className="form-title">Update Your Information</h3>
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Profile Pic */}
          <div className="form-group">
            <label>Profile Picture</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img
                src={user.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : 'profile-logo.png'}
                alt="Profile"
                style={{ marginLeft: '70px', width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #231A6D' }}
              />
              <input type="file" accept="image/*" onChange={handlePicChange} />
            </div>
          </div>

          {/* Other profile fields */}
          <form onSubmit={handleSubmit}>
            <div className="form-grid">

               <div className="form-group">
                 <label>Name</label>
                 <input type="text" name="name" value={user.name} onChange={handleChange} />
               </div>

               <div className="form-group">
                 <label>Department</label>
                 <input type="text" name="department" value={user.department} onChange={handleChange} />
               </div>

               <div className="form-group">
                 <label>Graduation Year</label>
                 <input type="number" name="gradYear" value={user.gradYear} onChange={handleChange} />
               </div>

               <div className="form-group">
                 <label>Email</label>
                 <input type="email" name="email" value={user.email} onChange={handleChange} />
               </div>

               <div className="form-group">
                 <label>Experience in Years</label>
                 <input type="number" name="experienceInYears" value={user.experienceInYears} onChange={handleChange} />
               </div>

               <div className="form-group">
                 <label>Known Skills (comma separated)</label>
                 <input
                  type="text"
                  name="knownSkills"
                  value={(user.knownSkills || []).join(', ')}
                  onChange={handleChange}
                />
              </div>

              {user.role === 'Alumni' && (
                <>
                  <div className="form-group">
                    <label>Current Company</label>
                    <input type="text" name="currentCompany" value={user.currentCompany} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Current Role</label>
                    <input type="text" name="currentRole" value={user.currentRole} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Current Job Location</label>
                    <input type="text" name="currentJobLocation" value={user.currentJobLocation} onChange={handleChange} />
                  </div>

                  {user.pastExperience?.map((exp, index) => (
                    <div key={index} className="form-group" style={{ gridColumn: "1 / -1" }}>
                      
                      <h4 style={{ marginBottom: "10px", color: "#231A6D", paddingBottom: "5px" }}>
                        Past Experience {index + 1}
                      </h4>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "2fr 2fr 1fr",
                          gap: "15px",
                          alignItems: "end"
                        }}
                      >
                        <div>
                          <label>Company</label>
                          <input
                            type="text"
                            value={exp.company || ''}
                            onChange={(e) =>
                              handlePastChange(index, 'company', e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label>Role</label>
                          <input
                            type="text"
                            value={exp.role || ''}
                            onChange={(e) =>
                              handlePastChange(index, 'role', e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label>Years</label>
                          <input
                            type="number"
                            value={exp.years || 0}
                            onChange={(e) =>
                              handlePastChange(index, 'years', e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removePastExperience(index)}
                        className="submit-btn"
                        style={{ marginTop: "10px", backgroundColor: "#b22222", marginTop: "20px" }}
                      >
                        Remove
                      </button>

                    </div>
                  ))}

                  <div style={{ gridColumn: "1 / -1" }}>
                    <button
                      type="button"
                      onClick={addPastExperience}
                      className="submit-btn"
                    >
                      + Add Past Experience
                    </button>
                  </div>
                </>
              )}

            </div>

            
            {/* ... keep all existing form fields as in your code ... */}
            <div className="form-actions">
              <button type="submit" className="submit-btn">Save Changes</button>
            </div>
          </form>

          <div className="form-actions" style={{ marginTop: "15px" }}>
            <button type="button" className="submit-btn" onClick={handleLogout} style={{ backgroundColor: "#b22222" }}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="footer">
        © 2026 CKCET Alumni Network | All Rights Reserved
      </div>
    </div>
  );
};

export default ProfilePage;