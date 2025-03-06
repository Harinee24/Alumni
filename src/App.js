import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Discussion from './Components/Discussion'; // Import Discussion component
import JobPost from './Components/JobPost'; // Import JobPost component
import ProfilePage from './Components/ProfilePage'; // Import ProfilePage component

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
      </Routes>
    </Router>
  );
}

export default App;
