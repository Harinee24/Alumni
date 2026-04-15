// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import './Dashboard.css';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);

//   /* ================= LOGOUT ================= */
//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
//       navigate('/');
//     } catch (error) {
//       setError('Error logging out');
//     }
//   };

//   /* ================= ACHIEVEMENTS (Same as HomePage) ================= */
//   const alumni = [
//     {
//       name: "Autonomous Status Achievement",
//       story:
//         "CKCET has been granted autonomous status by the University Grants Commission (UGC) and Anna University for a period of 10 years, starting from 2025 until 2035.",
//       img: "autonomus.png"
//     },
//     {
//       name: "CK Technology Business Incubator",
//       story:
//         "Signed an MoU with Anna Incubator, Anna University, Chennai, to establish the CK Technology Business Incubator at CKCET campus, fostering innovation, incubation, and startups.",
//       img: "ach1.png"
//     }
//   ];

//   /* ================= ALUMNI SUCCESS STORIES (Same as HomePage) ================= */
//   const alumniStories = [
//     { name: "Prabakaran S", story: "Systems Engineer at TCS", img: "al1.png" },
//     { name: "Jayapriyan M", story: "Full Stack Developer at TCS", img: "al2.png" },
//     { name: "Rajavel", story: "Member Technical Staff at Zoho", img: "al3.png" },
//     { name: "Rangaraj M", story: "Senior Project Engineer at Wipro", img: "al4.png" },
//     { name: "Prabhaharan V", story: "Senior Systems Engineer at Infosys", img: "al5.png" },
//     { name: "Sivasuriyan Mohan", story: "Reinventor at Accenture", img: "al6.png" },
//   ];

//   /* ===== AUTO SLIDE FOR ALUMNI CAROUSEL ===== */
//   useEffect(() => {
//     const autoSlide = setInterval(() => {
//       setCurrentIndex((prev) =>
//         prev === alumniStories.length - 1 ? 0 : prev + 1
//       );
//     }, 2500);

//     return () => clearInterval(autoSlide);
//   }, [alumniStories.length]);

//   const nextSlide = () => {
//     setCurrentIndex((prev) =>
//       prev === alumniStories.length - 2 ? 0 : prev + 2
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? alumniStories.length - 2 : prev - 2
//     );
//   };

//   /* ================= NAVIGATION ================= */
//   const navigateToDiscussion = () => navigate('/discussion');
//   const navigateToJobPost = () => navigate('/jobpost');
//   const navigateToEvent = () => navigate('/event-portal');
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
//     <div className="home-page">

//       {/* ================= NAVBAR ================= */}
//       <nav className="navbar">
//         <div className="logo">
//           <img src="/cklogo.png" alt="logo" style={{width:"150px", height:"50px"}} />
//           <span>AlumniSphere</span>
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

//       {/* ================= HERO ================= */}
//       <section
//         className="hero"
//         style={{ backgroundImage: `url(/ck1.png)` }}
//       >
//         <div className="hero-overlay"></div>
//         <div className="hero-text">
//           <h1>Welcome CKCETians</h1>
//           <p>Stay Connected. Grow Together.</p>
//         </div>
//       </section>

//       {/* ================= SERVICES ================= */}
// <section className="services">
//   <h2>OUR SERVICES</h2>

//   <div className="service-grid">

//     <Link to="/discussion" className="service-link">
//       <div className="service-box" style={{ backgroundImage: "url(/mg1.png)" }}>
//         <h3>Discussion Forum</h3>
//       </div>
//     </Link>

//     <Link to="/jobpost" className="service-link">
//       <div className="service-box" style={{ backgroundImage: "url(/mg2.png)" }}>
//         <h3>Job / Internship Portal</h3>
//       </div>
//     </Link>

//     <Link to="/event-portal" className="service-link">
//       <div className="service-box" style={{ backgroundImage: "url(/mg3.png)" }}>
//         <h3>Upcoming Events</h3>
//       </div>
//     </Link>

//     <Link to="/alumni-directory" className="service-link">
//       <div className="service-box" style={{ backgroundImage: "url(/mg4.png)" }}>
//         <h3>Alumni Directory</h3>
//       </div>
//     </Link>

//     <Link to="/newsletter" className="service-link">
//       <div className="service-box" style={{ backgroundImage: "url(/mg5.png)" }}>
//         <h3>CKCET Newsletter</h3>
//       </div>
//     </Link>

//     <Link to="/donation" className="service-link">
//       <div className="service-box" style={{ backgroundImage: "url(/ck1.png)" }}>
//         <h3>Donation Panel</h3>
//       </div>
//     </Link>

//   </div>
// </section>

//       {/* ================= ACHIEVEMENTS ================= */}
//       <section className="success">
//         <h2>ACHIEVEMENTS OF CKCET</h2>

//         <div className="success-grid">
//           {alumni.map((item, index) => (
//             <div key={index} className="card">
//               <img src={`/${item.img}`} alt={item.name} />
//               <h3>{item.name}</h3>
//               <p>{item.story}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ================= ALUMNI SUCCESS STORIES ================= */}
//       <section className="alumni-success">
//         <h2>ALUMNI SUCCESS STORIES</h2>

//         <div className="carousel-container">

//           <button className="arrow left" onClick={prevSlide}>
//             &#10094;
//           </button>

//           <div className="carousel">
//             <div
//               className="carousel-track"
//               style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//             >
//               {alumniStories.map((item, index) => (
//                 <div className="carousel-card" key={index}>
//                   <img src={`/${item.img}`} alt={item.name} />
//                   <h3>{item.name}</h3>
//                   <p>{item.story}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button className="arrow right" onClick={nextSlide}>
//             &#10095;
//           </button>

//         </div>
//       </section>

//       {/* ================= FOOTER ================= */}
//       <footer className="footer">
//         © 2026 CKCET Alumni Network | All Rights Reserved
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
  const [currentIndex, setCurrentIndex] = useState(0);

  /* ============ EVENTS ============ */
  const [events, setEvents]         = useState([]);
  const [eventIndex, setEventIndex] = useState(0);
  const [eventAnim, setEventAnim]   = useState('enter');

  /* ============ JOBS ============ */
  const [jobs, setJobs]         = useState([]);
  const [jobIndex, setJobIndex] = useState(0);
  const [jobAnim, setJobAnim]   = useState('enter');

  /* ============ USER ============ */
  const [user, setUser] = useState({ profilePic: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/profile', { withCredentials: true })
      .then(r => setUser(r.data || {})).catch(() => {});
    axios.get('http://localhost:5000/api/events/all-events', { withCredentials: true })
      .then(r => setEvents(r.data || [])).catch(() => {});
    axios.get('http://localhost:5000/api/jobs', { withCredentials: true })
      .then(r => setJobs(r.data || [])).catch(() => {});
  }, []);

  /* ---- auto rotate events every 4s ---- */
  useEffect(() => {
    if (events.length <= 1) return;
    const id = setInterval(() => {
      setEventAnim('exit');
      setTimeout(() => { setEventIndex(p => (p + 1) % events.length); setEventAnim('enter'); }, 380);
    }, 4000);
    return () => clearInterval(id);
  }, [events.length]);

  /* ---- auto rotate jobs every 4s (offset 2s) ---- */
  useEffect(() => {
    if (jobs.length <= 1) return;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        setJobAnim('exit');
        setTimeout(() => { setJobIndex(p => (p + 1) % jobs.length); setJobAnim('enter'); }, 380);
      }, 4000);
      return () => clearInterval(id);
    }, 2000);
    return () => clearTimeout(t);
  }, [jobs.length]);

  const jumpEvent = i => { setEventAnim('exit'); setTimeout(() => { setEventIndex(i); setEventAnim('enter'); }, 380); };
  const jumpJob   = i => { setJobAnim('exit');   setTimeout(() => { setJobIndex(i);   setJobAnim('enter');   }, 380); };

  const ev  = events[eventIndex];
  const job = jobs[jobIndex];

  const fmtDate = dt => dt ? new Date(dt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
  const fmtTime = dt => dt ? new Date(dt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '';

  /* ============ ACHIEVEMENTS ============ */
  const achievements = [
    { name: "Autonomous Status Achievement", story: "CKCET has been granted autonomous status by the University Grants Commission (UGC) and Anna University for a period of 10 years, starting from 2025 until 2035.", img: "autonomus.png" },
    { name: "CK Technology Business Incubator", story: "Signed an MoU with Anna Incubator, Anna University, Chennai, to establish the CK Technology Business Incubator at CKCET campus, fostering innovation, incubation, and startups.", img: "ach1.png" },
  ];

  /* ============ ALUMNI SUCCESS STORIES ============ */
  const alumniStories = [
    { name: "Prabakaran S",      story: "Systems Engineer at TCS",           img: "al1.png" },
    { name: "Jayapriyan M",      story: "Full Stack Developer at TCS",        img: "al2.png" },
    { name: "Rajavel",           story: "Member Technical Staff at Zoho",     img: "al3.png" },
    { name: "Rangaraj M",        story: "Senior Project Engineer at Wipro",   img: "al4.png" },
    { name: "Prabhaharan V",     story: "Senior Systems Engineer at Infosys", img: "al5.png" },
    { name: "Sivasuriyan Mohan", story: "Reinventor at Accenture",            img: "al6.png" },
  ];

  useEffect(() => {
    const id = setInterval(() =>
      setCurrentIndex(p => p === alumniStories.length - 1 ? 0 : p + 1), 2500);
    return () => clearInterval(id);
  }, [alumniStories.length]);

  const nextSlide = () => setCurrentIndex(p => p === alumniStories.length - 2 ? 0 : p + 2);
  const prevSlide = () => setCurrentIndex(p => p === 0 ? alumniStories.length - 2 : p - 2);

  /* ============ NAV ============ */
  const navigateToDiscussion = () => navigate('/discussion');
  const navigateToJobPost    = () => navigate('/jobpost');
  const navigateToEvent      = () => navigate('/event-portal');
  const navigateToProfile    = () => navigate('/profile');
  const navigateToDonation   = () => navigate('/donation');
  const navigateToDirectory  = () => navigate('/alumni-directory');

  return (
    <div className="home-page">

      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="logo">
          <img src="/cklogo.png" alt="logo" style={{ width: '150px', height: '50px' }} />
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
            src={user.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : 'profile-logo.png'}
            alt="Profile" onClick={navigateToProfile}
            style={{ cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero" style={{ backgroundImage: 'url(/ck1.png)' }}>
        <div className="hero-overlay" />
        <div className="hero-text">
          <h1>Welcome CKCETians</h1>
          <p>Stay Connected. Grow Together.</p>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="services">
        <h2>OUR SERVICES</h2>
        <div className="service-grid">
          {[
            { to: '/discussion',       img: 'mg1.png', label: 'Discussion Forum' },
            { to: '/jobpost',          img: 'mg2.png', label: 'Job / Internship Portal' },
            { to: '/event-portal',     img: 'mg3.png', label: 'Upcoming Events' },
            { to: '/alumni-directory', img: 'mg4.png', label: 'Alumni Directory' },
            { to: '/newsletter',       img: 'mg5.png', label: 'CKCET Newsletter' },
            { to: '/donation',         img: 'ck1.png', label: 'Donation Panel' },
          ].map((s, i) => (
            <Link key={i} to={s.to} className="service-link">
              <div className="service-box" style={{ backgroundImage: `url(/${s.img})` }}>
                <h3>{s.label}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STACKED UPDATES — Events on TOP, Jobs BELOW
          Placed directly ABOVE Achievements section
          ═══════════════════════════════════════════════════════════════ */}
      <section className="stacked-updates">

        {/* ── Section heading ── */}
        <div className="su-section-head">
          <div className="su-head-line" />
          <div className="su-head-center">
            <span className="su-live-pill">
              <span className="su-pulse-dot" />
              LIVE UPDATES
            </span>
            <h2 className="su-section-title">Events &amp; Opportunities</h2>
          </div>
          <div className="su-head-line" />
        </div>

        {/* ══════ BLOCK 1 — EVENTS (TOP) ══════ */}
        <div className="su-block su-block--events">

          {/* coloured top-border stripe */}
          <div className="su-top-stripe su-stripe--events" />

          <div className="su-block-inner">

            {/* header row */}
            <div className="su-block-hdr">
              <div className="su-hdr-left">
                <div className="su-hdr-icon-wrap su-icon--events">📅</div>
                <div>
                  <h3 className="su-hdr-title">Upcoming Events</h3>
                  <span className="su-hdr-sub">{events.length} event{events.length !== 1 ? 's' : ''} scheduled</span>
                </div>
              </div>
              <button className="su-all-btn su-all--events" onClick={navigateToEvent}>
                View All <span>→</span>
              </button>
            </div>

            {/* content */}
            {events.length === 0 ? (
              <div className="su-empty">No events scheduled right now.</div>
            ) : (
              <div className="su-body-grid">

                {/* ── featured rotating card ── */}
                <div className="su-feat-col">
                  {/* thin progress bar */}
                  <div className="su-prog-track">
                    <div key={`ep-${eventIndex}`} className="su-prog-bar su-prog--events" />
                  </div>

                  <div className={`su-feat-card su-feat--events su-anim-${eventAnim}`}>

                    <div className="su-card-toprow">
                      <span className="su-ordinal su-ordinal--events">
                        {String(eventIndex + 1).padStart(2,'0')} <em>of</em> {String(events.length).padStart(2,'0')}
                      </span>
                      <span className="su-pill-tag su-pill--event">EVENT</span>
                    </div>

                    <h4 className="su-card-heading">{ev?.eventTopic}</h4>

                    <div className="su-info-grid">
                      <div className="su-info-cell">
                        <span className="su-cell-icon">📆</span>
                        <div>
                          <span className="su-cell-label">Date</span>
                          <span className="su-cell-val">{fmtDate(ev?.eventDateTime)}</span>
                        </div>
                      </div>
                      <div className="su-info-cell">
                        <span className="su-cell-icon">🕐</span>
                        <div>
                          <span className="su-cell-label">Time</span>
                          <span className="su-cell-val">{fmtTime(ev?.eventDateTime)}</span>
                        </div>
                      </div>
                      {ev?.degreeAndYear && (
                        <div className="su-info-cell">
                          <span className="su-cell-icon">👥</span>
                          <div>
                            <span className="su-cell-label">For</span>
                            <span className="su-cell-val">{ev.degreeAndYear}</span>
                          </div>
                        </div>
                      )}
                      {ev?.expectedStudents && (
                        <div className="su-info-cell">
                          <span className="su-cell-icon">🎯</span>
                          <div>
                            <span className="su-cell-label">Expected</span>
                            <span className="su-cell-val">{ev.expectedStudents} students</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {ev?.additionalNotes && (
                      <p className="su-card-notes su-notes--events">"{ev.additionalNotes}"</p>
                    )}

                    <div className="su-dots">
                      {events.map((_, i) => (
                        <button key={i}
                          className={`su-dot ${i === eventIndex ? 'su-dot--on su-dot--events' : ''}`}
                          onClick={() => jumpEvent(i)} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── side list ── */}
                {events.length > 1 && (
                  <div className="su-side-col">
                    <p className="su-side-lbl">OTHER EVENTS</p>
                    {events.filter((_, i) => i !== eventIndex).slice(0, 4).map((e, i) => (
                      <div key={i} className="su-side-row su-side-row--events" onClick={navigateToEvent}>
                        <span className="su-side-bullet su-bullet--events" />
                        <div className="su-side-info">
                          <span className="su-side-name">{e.eventTopic}</span>
                          <span className="su-side-meta">{fmtDate(e.eventDateTime)}</span>
                        </div>
                        <span className="su-side-chev">›</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}
          </div>
        </div>

        {/* ── divider between blocks ── */}
        <div className="su-inter-divider">
          <div className="su-div-line" />
          <span className="su-div-icon">⚡</span>
          <div className="su-div-line" />
        </div>

        {/* ══════ BLOCK 2 — JOBS (BELOW) ══════ */}
        <div className="su-block su-block--jobs">

          <div className="su-top-stripe su-stripe--jobs" />

          <div className="su-block-inner">

            {/* header row */}
            <div className="su-block-hdr">
              <div className="su-hdr-left">
                <div className="su-hdr-icon-wrap su-icon--jobs">💼</div>
                <div>
                  <h3 className="su-hdr-title">Job / Internship Openings</h3>
                  <span className="su-hdr-sub">{jobs.length} position{jobs.length !== 1 ? 's' : ''} available</span>
                </div>
              </div>
              <button className="su-all-btn su-all--jobs" onClick={navigateToJobPost}>
                View All <span>→</span>
              </button>
            </div>

            {/* content */}
            {jobs.length === 0 ? (
              <div className="su-empty">No job openings right now.</div>
            ) : (
              <div className="su-body-grid">

                {/* ── featured rotating card ── */}
                <div className="su-feat-col">
                  <div className="su-prog-track">
                    <div key={`jp-${jobIndex}`} className="su-prog-bar su-prog--jobs" />
                  </div>

                  <div className={`su-feat-card su-feat--jobs su-anim-${jobAnim}`}>

                    <div className="su-card-toprow">
                      <span className="su-ordinal su-ordinal--jobs">
                        {String(jobIndex + 1).padStart(2,'0')} <em>of</em> {String(jobs.length).padStart(2,'0')}
                      </span>
                      <span className="su-pill-tag su-pill--job">JOB OPENING</span>
                    </div>

                    <h4 className="su-card-heading">{job?.title}</h4>

                    <div className="su-info-grid">
                      {job?.company && (
                        <div className="su-info-cell">
                          <span className="su-cell-icon">🏢</span>
                          <div>
                            <span className="su-cell-label">Company</span>
                            <span className="su-cell-val">{job.company}</span>
                          </div>
                        </div>
                      )}
                      {job?.stipend && (
                        <div className="su-info-cell">
                          <span className="su-cell-icon">💰</span>
                          <div>
                            <span className="su-cell-label">Stipend / Salary</span>
                            <span className="su-cell-val">{job.stipend}</span>
                          </div>
                        </div>
                      )}
                      {job?.experience !== undefined && job?.experience !== '' && (
                        <div className="su-info-cell">
                          <span className="su-cell-icon">🧑‍💻</span>
                          <div>
                            <span className="su-cell-label">Experience</span>
                            <span className="su-cell-val">{job.experience} yr{job.experience !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      )}
                      {job?.lastDate && (
                        <div className="su-info-cell">
                          <span className="su-cell-icon">⏳</span>
                          <div>
                            <span className="su-cell-label">Apply Before</span>
                            <span className="su-cell-val su-deadline">{job.lastDate.split('T')[0]}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {job?.skills && (
                      <div className="su-skills">
                        {job.skills.split(',').map((s, i) => (
                          <span key={i} className="su-skill-chip">{s.trim()}</span>
                        ))}
                      </div>
                    )}

                    <div className="su-dots">
                      {jobs.map((_, i) => (
                        <button key={i}
                          className={`su-dot ${i === jobIndex ? 'su-dot--on su-dot--jobs' : ''}`}
                          onClick={() => jumpJob(i)} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── side list ── */}
                {jobs.length > 1 && (
                  <div className="su-side-col">
                    <p className="su-side-lbl">OTHER OPENINGS</p>
                    {jobs.filter((_, i) => i !== jobIndex).slice(0, 4).map((j, i) => (
                      <div key={i} className="su-side-row su-side-row--jobs" onClick={navigateToJobPost}>
                        <span className="su-side-bullet su-bullet--jobs" />
                        <div className="su-side-info">
                          <span className="su-side-name">{j.title}</span>
                          <span className="su-side-meta">{j.company}</span>
                        </div>
                        <span className="su-side-chev">›</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}
          </div>
        </div>

      </section>
      {/* ═══════════════════════ END STACKED UPDATES ═══════════════════════ */}

      {/* ===== ACHIEVEMENTS (directly below updates) ===== */}
      <section className="success">
        <h2>ACHIEVEMENTS OF CKCET</h2>
        <div className="success-grid">
          {achievements.map((item, i) => (
            <div key={i} className="card">
              <img src={`/${item.img}`} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.story}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ALUMNI SUCCESS STORIES ===== */}
      <section className="alumni-success">
        <h2>ALUMNI SUCCESS STORIES</h2>
        <div className="carousel-container">
          <button className="arrow left" onClick={prevSlide}>&#10094;</button>
          <div className="carousel">
            <div className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {alumniStories.map((item, i) => (
                <div className="carousel-card" key={i}>
                  <img src={`/${item.img}`} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>{item.story}</p>
                </div>
              ))}
            </div>
          </div>
          <button className="arrow right" onClick={nextSlide}>&#10095;</button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        © 2026 CKCET Alumni Network | All Rights Reserved
      </footer>

    </div>
  );
};

export default Dashboard;