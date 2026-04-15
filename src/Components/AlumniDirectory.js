// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './JobPost.css'; // Use same CSS template
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
//   const navigateToDirectory = () => navigate('/alumni-directory');

//   const [user, setUser] = useState({ profilePic: '' });

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/auth/profile', { withCredentials: true })
//       .then((res) => {
//         setUser(res.data || { profilePic: '' });
//       })
//       .catch((err) => {
//         console.error('Failed to fetch profile:', err);
//       });
//   }, []);  

//   return (
//     <div className="page-wrapper">

//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">
//           <img src="/cklogo.png" alt="logo" style={{width:"150px", height:"50px"}}/>
//           <span onClick={navigateToDashboard} style={{ cursor: "pointer" }}>
//             AlumniSphere
//           </span>
//         </div>

//         <div className="nav-links">
//           <a href="#" onClick={navigateToDiscussion}>Discussion Forum</a>
//           <a href="#" onClick={navigateToJobPost}>Job Portal</a>
//           <a href="#" onClick={navigateToEvent}>Events</a>
//           <a href="#" onClick={navigateToDirectory}>Alumni Directory</a>          
//           <a href="#" onClick={navigateToDonation}>Giving</a>
//         </div>

//         <div className="profile-btn">
//         <img
//           src={user.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : "profile-logo.png"}
//           alt="Profile"
//           onClick={navigateToProfile}
//           style={{
//             cursor: 'pointer',
//             width: '40px',
//             height: '40px',
//             borderRadius: '50%',
//             objectFit: 'cover'
//           }}
//         />
//         </div>
//       </nav>

//       <div className="job-container">
//         <h2 className="title">ALUMNI DIRECTORY</h2>

//         <img
//           src="/alumni.png"
//           alt="Alumni Directory"
//           className="banner"
//         />

//         {/* FILTER SECTION styled like top-bar */}
//         <div className="top-bar">
//           <div className="filter">
//             <label>Department </label>
//             <select
//               value={selectedDepartment}
//               onChange={(e) => setSelectedDepartment(e.target.value)}
//             >
//               <option value="">All</option>
//               <option value="Computer Science">CSE</option>
//               <option value="Electronics and Communication Engineering">ECE</option>
//               <option value="Electrical and Electronics Engineering">EEE</option>
//               <option value="Civil Engineering">Civil</option>
//               <option value="Mechanical Engineering">Mech</option>
//               <option value="Artificial Intelligience and Data Science">AI & DS</option>
//             </select>
//           </div>

//           <div className="filter">
//             <label>Graduation Year </label>
//             <select
//               value={selectedYear}
//               onChange={(e) => setSelectedYear(e.target.value)}
//             >
//               <option value="">All</option>
//               {Array.from({ length: 12 }, (_, i) => 2026 - i).map((year) => (
//                 <option key={year} value={year}>
//                   {year}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* TABLE like Job Portal */}
//         <table className="job-table">
//           <thead>
//             <tr>
//               <th>S.No</th>
//               <th>Name</th>
//               <th>Department</th>
//               <th>Graduation Year</th>
//               <th>Skills</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="5">Loading alumni data...</td>
//               </tr>
//             ) : filteredAlumni.length === 0 ? (
//               <tr>
//                 <td colSpan="5">No alumni found.</td>
//               </tr>
//             ) : (
//               filteredAlumni.map((alumnus, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{alumnus.name}</td>
//                   <td>{alumnus.department}</td>
//                   <td>{alumnus.gradYear}</td>
//                   <td>
//                     {alumnus.knownSkills?.length > 0
//                       ? alumnus.knownSkills.join(', ')
//                       : "Not specified"}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>

//         {error && <p style={{ marginTop: "10px", color: "red" }}>{error}</p>}
//       </div>

//       <div className="footer">
//         © 2026 CKCET Alumni Network | All Rights Reserved
//       </div>
//     </div>
//   );
// };

// export default AlumniDirectory;






import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AlumniDirectory.css";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AlumniDirectory = () => {

  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [user, setUser] = useState({ profilePic: "" });

  const navigate = useNavigate();

  // -------- FETCH ALUMNI DATA --------
  const fetchAlumni = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/alumni-directory",
        { withCredentials: true }
      );

      setAlumni(response.data);
      setFilteredAlumni(response.data);
      setLoading(false);

    } catch (error) {
      setError("Failed to fetch alumni details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  // -------- FETCH USER PROFILE --------
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/profile", { withCredentials: true })
      .then((res) => {
        setUser(res.data || { profilePic: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // -------- FILTER LOGIC --------
  useEffect(() => {

    let filtered = alumni;

    if (selectedDepartment) {
      filtered = filtered.filter(
        (a) =>
          a.department &&
          a.department.toLowerCase().includes(selectedDepartment.toLowerCase())
      );
    }

    if (selectedYear) {
      filtered = filtered.filter(
        (a) => a.gradYear === parseInt(selectedYear)
      );
    }

    setFilteredAlumni(filtered);

  }, [selectedDepartment, selectedYear, alumni]);

  // -------- EXPORT EXCEL FUNCTION --------
  const exportToExcel = (data, fileName) => {

    const formattedData = data.map((alumnus, index) => ({
      "S.No": index + 1,
      Name: alumnus.name,
      Department: alumnus.department,
      "Graduation Year": alumnus.gradYear,
      Skills: alumnus.knownSkills?.join(", ") || "Not specified",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Alumni");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const dataFile = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(dataFile, fileName + ".xlsx");
  };

  // -------- NAVIGATION --------
  const navigateToDiscussion = () => navigate("/discussion");
  const navigateToJobPost = () => navigate("/jobpost");
  const navigateToEvent = () => navigate("/event-portal");
  const navigateToDashboard = () => navigate("/dashboard");
  const navigateToProfile = () => navigate("/profile");
  const navigateToDonation = () => navigate("/donation");
  const navigateToDirectory = () => navigate("/alumni-directory");

  return (

    <div className="page-wrapper">

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">
          <img src="/cklogo.png" alt="logo" className="logo-img" style={{width:"150px", height:"50px"}}/>
          <span onClick={navigateToDashboard} className="logo-text">
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
            src={
              user.profilePic
                ? `http://localhost:5000/uploads/${user.profilePic}`
                : "/profile-logo.png"
            }
            alt="Profile"
            onClick={navigateToProfile}
            className="profile-img"
          />
        </div>

      </nav>

      {/* MAIN CONTENT */}

      <div className="directory-container">

        <h2 className="title">ALUMNI DIRECTORY</h2>

        <img
          src="/alumni.png"
          alt="Alumni"
          className="banner"
        />

        {/* FILTERS */}

        <div className="filter-bar">

          <div className="filter">
            <label>Department</label>

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
            <label>Graduation Year</label>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">All</option>

              {Array.from({ length: 12 }, (_, i) => 2026 - i).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}

            </select>

          </div>

        </div>

        {/* EXPORT BUTTONS */}

        <div className="export-section">

          <button
            className="export-btn"
            onClick={() => exportToExcel(alumni, "All_Alumni_Data")}
          >
            Export All Alumni
          </button>

          <button
            className="export-btn"
            onClick={() =>
              exportToExcel(filteredAlumni, "Filtered_Alumni_Data")
            }
          >
            Export Filtered Data
          </button>

        </div>

        {/* TABLE */}

        <table className="alumni-table">

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
                <td colSpan="5">No alumni found</td>
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
                      ? alumnus.knownSkills.join(", ")
                      : "Not specified"}
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

        {error && <p className="error">{error}</p>}

      </div>

      <div className="footer">
        © 2026 CKCET Alumni Network | All Rights Reserved
      </div>

    </div>
  );
};

export default AlumniDirectory;