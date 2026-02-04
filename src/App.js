import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Discussion from './Components/Discussion'; // Import Discussion component
import JobPost from './Components/JobPost'; // Import JobPost component
import ProfilePage from './Components/ProfilePage'; // Import ProfilePage component
import EventPortal from './Components/EventPortal'; // Import EventPortal component
import AlumniDirectory from './Components/AlumniDirectory';
import Donation from './Components/Donation';
import Newsletter from './Components/Newsletter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/discussion" element={<Discussion />} /> {/* Add the discussion route */}
        <Route path="/jobpost" element={<JobPost />} /> {/* Add job post route */}
        <Route path="/profile" element={<ProfilePage />} /> {/* Add profile route */}
        <Route path="/event-portal" element={<EventPortal />} /> {/* Add event portal route */}
        <Route path="/alumni-directory" element={<AlumniDirectory />} />
        <Route path="/donation" element={<Donation />} /> {/* Add donation route */}
        <Route path="/newsletter" element={<Newsletter />} /> {/* Add newsletter route */}
      </Routes>
    </Router>
  );
}

export default App;