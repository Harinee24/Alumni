// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Dashboard.css'; 
// import { Link } from 'react-router-dom';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState('');

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
//       // Redirect to homepage after logout
//       navigate('/');
//     } catch (error) {
//       setError('Error logging out');
//     }
//   };

//   // Sample Success Stories
//   const alumni = [
//     { name: 'John Doe', story: 'John launched his own tech startup after graduation.', profileImage: 'john.png' },
//     { name: 'Jane Smith', story: 'Jane became a renowned scientist in his field.', profileImage: 'jane.png' },
//     { name: 'Mike John', story: 'Mike is working as a CTO at a Fortune 500 company.', profileImage: 'mike.png' },
//     { name: 'Emily Davis', story: 'Emily is a successful entrepreneur who owns multiple businesses.', profileImage: 'emily.png' }
//   ];

//   // Navigate to the Discussion page
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

//   // Navigate to the Profile page when clicking the profile logo
//   const navigateToProfile = () => {
//     navigate('/profile');
//   };
//   const navigateToDonation= () => {
//     navigate('/donation');
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">
//     <img src="/cklogo.png" alt="CKCET Logo" className="ck-logo" />
//     <span>AlumniSphere</span>
//   </div>
//         <div className="nav-links">
//           <a href="#" onClick={navigateToDiscussion}>Discussion Forum</a> {/* Use navigate for redirection */}
//           <a href="#" onClick={navigateToJobPost}>Job Portal</a> {/* Navigate to Job Portal */}
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
//         <h1>Welcome CKCETians</h1>
//       </section>

//       {/* Services Section */}
//       <section className="services">
//         <h2>Our Services</h2>
//         <div className="services-container">
//   <div className="service">
//     <Link to="/discussion"><h3>Discussion Forum</h3></Link>
//   </div>
//   <div className="service">
//     <Link to="/jobpost"><h3>Job / Internship Portal</h3></Link>
//   </div>
//   <div className="service">
//     <Link to="/event-portal"><h3>Upcoming Events</h3></Link>
//   </div>
//   <div className="service">
//     <Link to="/alumni-directory"><h3>Alumni Directory</h3></Link>
//   </div>
//   <div className="service">
//     <Link to="/newsletter"><h3>CKCET Newsletter</h3></Link>
//   </div>
//   <div className="service">
//     <Link to="/donation"><h3>Donation Panel</h3></Link>
//   </div>
// </div>
//       </section>

//       {/* Achievements Section */}
//       <h2 id='achietitle'>Achievements of CKCET</h2>
//       <section className="achievements">
        
//         <div className="achievement">
//           <img src="vitachiev.png" alt="VIT Achievement" width="30px" height="220px" />
//           <p>CKCET has been ranked among the top universities in India, known for its excellence in education.</p>
//         </div>
//         <div className="achievement">
//           <img src="vitachi.png" alt="VIT Achievement 2" width="30px" height="220px" />
//           <p>CKCET has been recognized globally for its innovative research and academic programs.</p>
//         </div>
//       </section>

//       {/* Success Stories Section */}
//       <section className="success-stories">
//         <h2>Success Stories</h2>
//         {alumni.map((alumnus, index) => (
//           <div key={index} className="story">
//             <img src={process.env.PUBLIC_URL + (alumnus.profileImage || 'john.png')} alt={alumnus.name} />
//             <h3>{alumnus.name}</h3>
//             <p>{alumnus.story}</p>
//           </div>
//         ))}
//       </section>

//       {/* Media Gallery Section */}
//       <h2><center>Media Gallery</center></h2>
//       <section className="media-gallery">
//         <div className="gallery">
//           <img src="mg1.png" alt="Media 1" width="100px" height="100px"/>
//           <img src="mg2.png" alt="Media 2" width="100px" height="100px"/><br />
//           <img src="mg3.png" alt="Media 3" width="100px" height="100px"/>
//           <img src="mg4.png" alt="Media 4" width="100px" height="100px"/>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <p>&copy; 2026 AlumniSphere. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;





import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      navigate('/');
    } catch (error) {
      setError('Error logging out');
    }
  };

  /* ================= ACHIEVEMENTS (Same as HomePage) ================= */
  const alumni = [
    {
      name: "CK Technology Business Incubator",
      story:
        "Signed an MoU with Anna Incubator, Anna University, Chennai, to establish the CK Technology Business Incubator at CKCET campus, fostering innovation, incubation, and startups.",
      img: "ach1.png"
    },
    {
      name: "Startup Tamilnadu Hackathon Achievement",
      story:
        "At the prestigious 'Thiruppur Road Safety Hackathon,' organized by Startup Tamilnadu and Thiruppur District, two final-year EEE students from CKCET secured second place and won a cash prize of Rs. 20,000/-.",
      img: "ach2.png"
    }
  ];

  /* ================= ALUMNI SUCCESS STORIES (Same as HomePage) ================= */
  const alumniStories = [
    { name: "Prabakaran S", story: "Systems Engineer at TCS", img: "al1.png" },
    { name: "Jayapriyan M", story: "Full Stack Developer at TCS", img: "al2.png" },
    { name: "Rajavel", story: "Member Technical Staff at Zoho", img: "al3.png" },
    { name: "Rangaraj M", story: "Senior Project Engineer at Wipro", img: "al4.png" },
    { name: "Prabhaharan V", story: "Senior Systems Engineer at Infosys", img: "al5.png" },
    { name: "Sivasuriyan Mohan", story: "Reinventor at Accenture", img: "al6.png" },
  ];

  /* ===== AUTO SLIDE FOR ALUMNI CAROUSEL ===== */
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === alumniStories.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(autoSlide);
  }, [alumniStories.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === alumniStories.length - 2 ? 0 : prev + 2
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? alumniStories.length - 2 : prev - 2
    );
  };

  /* ================= NAVIGATION ================= */
  const navigateToDiscussion = () => navigate('/discussion');
  const navigateToJobPost = () => navigate('/jobpost');
  const navigateToEvent = () => navigate('/event-portal');
  const navigateToProfile = () => navigate('/profile');
  const navigateToDonation = () => navigate('/donation');

  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <div className="logo">
          <img src="/cklogo.png" alt="logo" />
          <span>AlumniSphere</span>
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

      {/* ================= HERO ================= */}
      <section
        className="hero"
        style={{ backgroundImage: `url(/ck1.png)` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-text">
          <h1>Welcome CKCETians</h1>
          <p>Stay Connected. Grow Together.</p>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
<section className="services">
  <h2>OUR SERVICES</h2>

  <div className="service-grid">

    <Link to="/discussion" className="service-link">
      <div className="service-box" style={{ backgroundImage: "url(/mg1.png)" }}>
        <h3>Discussion Forum</h3>
      </div>
    </Link>

    <Link to="/jobpost" className="service-link">
      <div className="service-box" style={{ backgroundImage: "url(/mg2.png)" }}>
        <h3>Job / Internship Portal</h3>
      </div>
    </Link>

    <Link to="/event-portal" className="service-link">
      <div className="service-box" style={{ backgroundImage: "url(/mg3.png)" }}>
        <h3>Upcoming Events</h3>
      </div>
    </Link>

    <Link to="/alumni-directory" className="service-link">
      <div className="service-box" style={{ backgroundImage: "url(/mg4.png)" }}>
        <h3>Alumni Directory</h3>
      </div>
    </Link>

    <Link to="/newsletter" className="service-link">
      <div className="service-box" style={{ backgroundImage: "url(/mg5.png)" }}>
        <h3>CKCET Newsletter</h3>
      </div>
    </Link>

    <Link to="/donation" className="service-link">
      <div className="service-box" style={{ backgroundImage: "url(/ck1.png)" }}>
        <h3>Donation Panel</h3>
      </div>
    </Link>

  </div>
</section>

      {/* ================= ACHIEVEMENTS ================= */}
      <section className="success">
        <h2>ACHIEVEMENTS OF CKCET</h2>

        <div className="success-grid">
          {alumni.map((item, index) => (
            <div key={index} className="card">
              <img src={`/${item.img}`} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.story}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ALUMNI SUCCESS STORIES ================= */}
      <section className="alumni-success">
        <h2>ALUMNI SUCCESS STORIES</h2>

        <div className="carousel-container">

          <button className="arrow left" onClick={prevSlide}>
            &#10094;
          </button>

          <div className="carousel">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {alumniStories.map((item, index) => (
                <div className="carousel-card" key={index}>
                  <img src={`/${item.img}`} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>{item.story}</p>
                </div>
              ))}
            </div>
          </div>

          <button className="arrow right" onClick={nextSlide}>
            &#10095;
          </button>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        © 2026 CKCET Alumni Network | All Rights Reserved
      </footer>

    </div>
  );
};

export default Dashboard;