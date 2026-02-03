// // import React, { useState } from 'react';
// // import './Login.css';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const Login = () => {
// //   const navigate = useNavigate();
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [role, setRole] = useState('Student');
// //   const [error, setError] = useState('');

// //   const handleLogin = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await axios.post('http://localhost:5000/api/auth/login', {
// //         email,
// //         password,
// //       }, { withCredentials: true });

// //       if (response.status === 200) {
// //         console.log('Login successful!');
// //         navigate('/dashboard');  // Navigate to dashboard after login
// //       }
// //     } catch (err) {
// //       setError(err.response ? err.response.data.message : 'Something went wrong!');
// //     }
// //   };

// //   return (
// //     <div className="login-container">
// //       <h1>Welcome VITian</h1>
// //       <form onSubmit={handleLogin}>
// //         <div className="form-group">
// //           <label htmlFor="email">Mail ID:</label>
// //           <input
// //             type="email"
// //             id="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="password">Password:</label>
// //           <input
// //             type="password"
// //             id="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="role">Role:</label>
// //           <select
// //             id="role"
// //             value={role}
// //             onChange={(e) => setRole(e.target.value)}
// //             required
// //           >
// //             <option value="Student">Student</option>
// //             <option value="Alumni">Alumni</option>
// //             <option value="Staff">Staff</option>
// //           </select>
// //         </div>
// //         {error && <p className="error-message">{error}</p>}
// //         <button type="submit">Login</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Login;

// import React, { useState } from 'react';
// import './Login.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('Student');
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', {
//         email,
//         password,
//       }, { withCredentials: true });

//       if (response.status === 200) {
//         console.log('Login successful!');
//         navigate('/dashboard');  // Navigate to dashboard after login
//       }
//     } catch (err) {
//       setError(err.response ? err.response.data.message : 'Something went wrong!');
//     }
//   };

//   // Function to handle navigating back to HomePage
//   const handleBack = () => {
//     navigate('/');  // Navigate to HomePage
//   };

//   return (
//     <div className="login-container">
//       <h1>Welcome VITian</h1>
//       <form onSubmit={handleLogin}>
//         <div className="form-group">
//           <label htmlFor="email">Mail ID:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="role">Role:</label>
//           <select
//             id="role"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             required
//           >
//             <option value="Student">Student</option>
//             <option value="Alumni">Alumni</option>
//             <option value="Staff">Staff</option>
//           </select>
//         </div>
//         {error && <p className="error-message">{error}</p>}
//         <button type="submit">Login</button>
//       </form>

//       {/* Back Button to redirect to HomePage */}
//       <button onClick={handleBack} className="back-btn">
//         Back to Home
//       </button>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      }, { withCredentials: true });

      if (response.status === 200) {
        console.log('Login successful!');
        navigate('/dashboard');  // Navigate to dashboard after login
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Something went wrong!');
    }
  };

  // Function to handle navigating back to HomePage
  const handleBack = () => {
    navigate('/');  // Navigate to HomePage
  };

  return (
    <div className="login-container">
      <h1>Welcome CKCETian</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Mail ID:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{width:'100%'}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="Student">Student</option>
            <option value="Alumni">Alumni</option>
            <option value="Staff">Staff</option>
          </select>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button
  type="submit"
  style={{
    backgroundColor: "#231A6D", // button background
    color: "white",              // text color
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  Login
</button>

      </form>

      {/* Back Button to redirect to HomePage */}
      <button onClick={handleBack} className="back-btn">
        Back to Home
      </button>
    </div>
  );
};

export default Login;