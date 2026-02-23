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
      name: "Autonomous Status Achievement",
      story:
        "CKCET has been granted autonomous status by the University Grants Commission (UGC) and Anna University for a period of 10 years, starting from 2025 until 2035.",
      img: "autonomus.png"
    },
    {
      name: "CK Technology Business Incubator",
      story:
        "Signed an MoU with Anna Incubator, Anna University, Chennai, to establish the CK Technology Business Incubator at CKCET campus, fostering innovation, incubation, and startups.",
      img: "ach1.png"
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
  const navigateToDirectory = () => navigate('/alumni-directory');

  const [user, setUser] = useState({ profilePic: '' });

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/auth/profile', { withCredentials: true })
      .then((res) => {
        setUser(res.data || { profilePic: '' });
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
      });
  }, []);

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
          <a href="#" onClick={navigateToDirectory}>Alumni Directory</a>
          <a href="#" onClick={navigateToDonation}>Giving</a>
        </div>

        <div className="profile-btn">
        <img
          src={user.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : "profile-logo.png"}
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