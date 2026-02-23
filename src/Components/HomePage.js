// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router v6
// import './HomePage.css';

// function HomePage() {
//   const navigate = useNavigate(); // Initialize useNavigate

//   const navigateToLogin = () => {
//     navigate('/login'); // Navigate to the Login page
//   };

//   const alumni = [
//     { name: 'John Doe', story: 'John launched his own tech startup after graduation.', profileImage: 'john.png' },
//     { name: 'Jane Smith', story: 'Jane became a renowned scientist in his field.', profileImage: 'jane.png' },
//     { name: 'Mike John', story: 'Mike is working as a CTO at a Fortune 500 company.', profileImage: 'mike.png' },
//     { name: 'Emily Davis', story: 'Emily is a successful entrepreneur who owns multiple businesses.', profileImage: 'emily.png' }
//   ];

//   return (
//     <div className="home-page">
//       {/* Navbar */}
//       <nav className="navbar" >
//         <div className="logo">
//     <img src="cklogo.png" alt="CKCET Logo" className="ck-logo" />
//     <span>AlumniSphere</span>
//   </div>
//         <div className="login-btn">
//           <button onClick={navigateToLogin}>Login</button> {/* Redirect to Login page */}
//         </div>
//       </nav>
//       <nav className="navbar" style={{ backgroundColor: "#A5D8F5" }}>
//         <div className="nav-links">
//           <a href="#">Discussion Forum</a>
//           <a href="#">Job Portal</a>
//           <a href="#">Events</a>
//           <a href="#">Giving</a>
//         </div>
//       </nav>     

//       {/* Hero Section */}
//       <section className="hero-section" style={{ backgroundColor: "#A5D8F5" }}>
//         <h1 style={{ color: "#231A6D" }}>Welcome to CKCET Alumni Page where Alumni & Students connect</h1>
//         <button onClick={navigateToLogin} className="connect-btn">Connect Now!</button>
//       </section>

//       {/* Services Section */}
//       <section className="services">
//         <h2>Our Services</h2>
//         <div className="services-container">
//           <div className="service"><h3>Discussion Forum</h3></div>
//           <div className="service"><h3>Job/Internship Portal</h3></div>
//           <div className="service"><h3>Upcoming Events</h3></div>
//           <div className="service"><h3>Alumni Directory</h3></div>
//           <div className="service"><h3>CKCET Newsletter</h3></div>
//           <div className="service"><h3>Donation Panel</h3></div>
//         </div>
//       </section>

//       {/* Achievements Section */}
//       <h2 id='achietitle'>Achievements of CKCET</h2>
//       <section className="achievements">
//         <div className="achievement">
//           <img src="vitachiev.png" alt="VIT Achievement 1" width="30px" height="220px"/>
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

//       {/* Footer */}
//       <footer className="footer">
//         <p>&copy; 2026 AlumniSphere. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default HomePage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  /* ================= BACKGROUND IMAGES ================= */

  const images = [
    process.env.PUBLIC_URL + "/ck1.png",
    process.env.PUBLIC_URL + "/ck2.png",
    process.env.PUBLIC_URL + "/ck3.jpeg"

  ];

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goLogin = () => {
    navigate("/login");
  };

  /* ================= ACHIEVEMENTS ================= */

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

  /* ================= ALUMNI SUCCESS STORIES ================= */

  const alumniStories = [
    {
      name: "Prabakaran S",
      story: "Systems Engineer at TCS",
      img: "al1.png"
    },
    {
      name: "Jayapriyan M",
      story: "Full Stack Developer at TCS ",
      img: "al2.png"
    },
    {
      name: "Rajavel",
      story: "Member Technical Staff at Zoho",
      img: "al3.png"
    },
    {
      name: "Rangaraj M",
      story: "Senior Project Engineer at Wipro",
      img: "al4.png"
    },
    {
      name: "Prabhaharan V",
      story: "Senior Systems Engineer at Infosys",
      img: "al5.png"
    },
    {
      name: "Sivasuriyan Mohan",
      story: "Reinventor at Accenture",
      img: "al6.png"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

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
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <div className="logo">
          <img src="/cklogo.png" alt="logo" />
          <span>AlumniSphere</span>
        </div>

        <div className="nav-links">
          <a href="/login">Discussion Forum</a>
          <a href="/login">Job Portal</a>
          <a href="/login">Events</a>
          <a href="/login">Alumni Directory</a>
          <a href="/login">Giving</a>
        </div>

        <button className="login-btn" onClick={goLogin} style={{width:"100px"}}>
          LOGIN
        </button>
      </nav>
      

      {/* ================= HERO ================= */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${images[bgIndex]})` }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-text">
          <h1>Welcome to CKCET Alumni Network</h1>
          <p>Connecting Alumni & Students for Growth and Innovation</p>
          <button
  onClick={goLogin}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  style={{
    marginTop: "20px",
    padding: "14px 20px",
    borderRadius: "30px",
    border: "none",
    background: "linear-gradient(135deg, #0300b5, #8093ff)",
    color: "white",
    fontWeight: "600",
    letterSpacing: "1px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
    boxShadow: isHovered
      ? "0 0 20px #A5D8F5"
      : "0 0 0px rgba(0,0,0,0)"
  }}
>
  Connect Now
</button>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="services">
        <h2>OUR SERVICES</h2>

        <div className="service-grid">
          <div className="service-box" style={{ backgroundImage: "url(/mg1.png)" }}>
            <h3>Discussion Forum</h3>
          </div>

          <div className="service-box" style={{ backgroundImage: "url(/mg2.png)" }}>
            <h3>Job / Internship Portal</h3>
          </div>

          <div className="service-box" style={{ backgroundImage: "url(/mg3.png)" }}>
            <h3>Upcoming Events</h3>
          </div>

          <div className="service-box" style={{ backgroundImage: "url(/mg4.png)" }}>
            <h3>Alumni Directory</h3>
          </div>

          <div className="service-box" style={{ backgroundImage: "url(/mg5.png)" }}>
            <h3>College Newsletter</h3>
          </div>

          <div className="service-box" style={{ backgroundImage: "url(/ck1.png)" }}>
            <h3>Donation Panel</h3>
          </div>
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
}

export default HomePage;