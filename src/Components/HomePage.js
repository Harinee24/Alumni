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
//     { name: 'Jane Smith', story: 'Jane became a renowned scientist in her field.', profileImage: 'jane.png' },
//     { name: 'Mike John', story: 'Mike is working as a CTO at a Fortune 500 company.', profileImage: 'mike.png' },
//     { name: 'Emily Davis', story: 'Emily is a successful entrepreneur who owns multiple businesses.', profileImage: 'emily.png' }
//   ];

//   return (
//     <div className="home-page">
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">AlumniSphere</div>
//         <div className="nav-links">
//           <a href="#">Discussion Forum</a>
//           <a href="#">Job Portal</a>
//           <a href="#">Events</a>
//           <a href="#">Giving</a>
//         </div>
//         <div className="login-btn">
//           <button onClick={navigateToLogin}>Login</button> {/* Redirect to Login page */}
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="hero-section">
//         <h1>Welcome to VIT Alumni Page where Alumni & Students connect</h1>
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
//           <div className="service"><h3>VIT Newsletter</h3></div>
//           <div className="service"><h3>Donation Panel</h3></div>
//         </div>
//       </section>

//       {/* Achievements Section */}
//       <section className="achievements">
//         <h2>Achievements of VIT</h2>
//         <div className="achievement">
//           <img src="vitachiev.png" alt="VIT Achievement 1" width="30px" height="220px"/>
//           <p>VIT has been ranked among the top universities in India, known for its excellence in education.</p>
//         </div>
//         <div className="achievement">
//           <img src="vitachi.png" alt="VIT Achievement 2" width="30px" height="220px" />
//           <p>VIT has been recognized globally for its innovative research and academic programs.</p>
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
//         <p>&copy; 2025 AlumniSphere. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default HomePage;

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router v6
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate(); // Initialize useNavigate

  const navigateToLogin = () => {
    navigate('/login'); // Navigate to the Login page
  };

  const alumni = [
    { name: 'John Doe', story: 'John launched his own tech startup after graduation.', profileImage: 'john.png' },
    { name: 'Jane Smith', story: 'Jane became a renowned scientist in his field.', profileImage: 'jane.png' },
    { name: 'Mike John', story: 'Mike is working as a CTO at a Fortune 500 company.', profileImage: 'mike.png' },
    { name: 'Emily Davis', story: 'Emily is a successful entrepreneur who owns multiple businesses.', profileImage: 'emily.png' }
  ];

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar" >
        <div className="logo">
    <img src="cklogo.png" alt="CKCET Logo" className="ck-logo" />
    <span>AlumniSphere</span>
  </div>
        <div className="nav-links">
          <a href="#">Discussion Forum</a>
          <a href="#">Job Portal</a>
          <a href="#">Events</a>
          <a href="#">Giving</a>
        </div>
        <div className="login-btn">
          <button onClick={navigateToLogin}>Login</button> {/* Redirect to Login page */}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundColor: "#A5D8F5" }}>
        <h1 style={{ color: "#231A6D" }}>Welcome to CKCET Alumni Page where Alumni & Students connect</h1>
        <button onClick={navigateToLogin} className="connect-btn">Connect Now!</button>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="services-container">
          <div className="service"><h3>Discussion Forum</h3></div>
          <div className="service"><h3>Job/Internship Portal</h3></div>
          <div className="service"><h3>Upcoming Events</h3></div>
          <div className="service"><h3>Alumni Directory</h3></div>
          <div className="service"><h3>CKCET Newsletter</h3></div>
          <div className="service"><h3>Donation Panel</h3></div>
        </div>
      </section>

      {/* Achievements Section */}
      <h2 id='achietitle'>Achievements of CKCET</h2>
      <section className="achievements">
        <div className="achievement">
          <img src="vitachiev.png" alt="VIT Achievement 1" width="30px" height="220px"/>
          <p>CKCET has been ranked among the top universities in India, known for its excellence in education.</p>
        </div>
        <div className="achievement">
          <img src="vitachi.png" alt="VIT Achievement 2" width="30px" height="220px" />
          <p>CKCET has been recognized globally for its innovative research and academic programs.</p>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="success-stories">
        <h2>Success Stories</h2>
        {alumni.map((alumnus, index) => (
          <div key={index} className="story">
            <img src={process.env.PUBLIC_URL + (alumnus.profileImage || 'john.png')} alt={alumnus.name} />
            <h3>{alumnus.name}</h3>
            <p>{alumnus.story}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 AlumniSphere. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;