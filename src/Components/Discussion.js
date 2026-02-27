// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import './Discussion.css';
// import { useNavigate } from 'react-router-dom';

// const Discussion = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [attachment, setAttachment] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState({ profilePic: '', _id: null });
//   const messageEndRef = useRef(null);
//   const navigate = useNavigate();

//   // Fetch current user profile
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/auth/profile', { withCredentials: true })
//       .then(res => setUser(res.data || { profilePic: '', _id: null }))
//       .catch(err => console.error('Failed to fetch profile:', err));
//   }, []);

//   // Fetch messages
//   const fetchMessages = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:5000/api/messages', { withCredentials: true });
//       setMessages(response.data);
//     } catch (err) {
//       setError('Failed to fetch messages');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     if (messageEndRef.current) {
//       messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   // Send a new message with optional attachment
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() && !attachment) return;

//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('content', newMessage);
//       if (attachment) {
//         formData.append('attachment', attachment);
//       }

//       await axios.post(
//         'http://localhost:5000/api/messages',
//         formData,
//         { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
//       );

//       setNewMessage('');
//       setAttachment(null);
//       fetchMessages();
//     } catch (err) {
//       setError('Failed to send message');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Navigation functions
//   const navigateToJobPost = () => navigate('/jobpost');
//   const navigateToProfile = () => navigate('/profile');
//   const navigateToDashboard = () => navigate('/dashboard');
//   const navigateToEvent = () => navigate('/event-portal');
//   const navigateToDonation = () => navigate('/donation');

//   return (
//     <div className="page-wrapper">
//       {/* NAVBAR */}
//       <nav className="navbar">
//         <div className="logo">
//           <img src="/cklogo.png" alt="logo" />
//           <a href="/dashboard">AlumniSphere</a>
//         </div>

//         <div className="nav-links">
//           <a href="#">Discussion Forum</a>
//           <a href="#" onClick={navigateToJobPost}>Job Portal</a>
//           <a href="#" onClick={navigateToEvent}>Events</a>
//           <a href="#" onClick={navigateToDonation}>Giving</a>
//         </div>

//         <div className="profile-btn">
//           <img
//             src={user.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : "profile-logo.png"}
//             alt="Profile"
//             onClick={navigateToProfile}
//             style={{
//               cursor: 'pointer',
//               width: '40px',
//               height: '40px',
//               borderRadius: '50%',
//               objectFit: 'cover'
//             }}
//           />
//         </div>
//       </nav>

//       {/* PAGE TITLE */}
//       <div className="job-container">
//         <h2 className="title">Discussion Forum</h2>

//         {/* DISCUSSION CARD */}
//         <div className="form-card messages">
//           {error && <p className="error-message">{error}</p>}

//           {loading ? (
//             <p>Loading messages...</p>
//           ) : (
//             <div className="message-list">
//               {messages.map((message, index) => {
//                 const isSelf = message.sender._id === user._id;
//                 return (
//                   <div key={index} className={`message ${isSelf ? 'self' : 'other'}`}>
//                     <div className="message-header">
//                       <span>{message.sender.name}</span>
//                       <span>{new Date(message.timestamp).toLocaleString()}</span>
//                     </div>
//                     {message.content && <p>{message.content}</p>}
//                     {message.attachment && (
//                       <div className="attachment">
//                         {/\.(jpg|jpeg|png|gif)$/i.test(message.attachment) ? (
//                           <img
//                             src={`http://localhost:5000/api/messages/uploads/${message.attachment}`}
//                             alt="attachment"
//                             className="attachment-image"
//                           />
//                         ) : (
//                           <a
//                             href={`http://localhost:5000/api/messages/uploads/${message.attachment}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="attachment-link"
//                           >
//                             {message.attachment} <span className="download-arrow">⬇️</span>
//                           </a>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//               <div ref={messageEndRef} />
//             </div>
//           )}

//           <form onSubmit={handleSendMessage} className="msgcont">
//             <textarea
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Write a message..."
//             />
//             <input
//               type="file"
//               accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
//               onChange={(e) => setAttachment(e.target.files[0])}
//             />
//             <button type="submit" disabled={loading} className="sendbutton">
//               {loading ? 'Sending...' : 'Send'}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* FOOTER */}
//       <footer className="footer">
//         <p>&copy; 2026 AlumniSphere. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Discussion;





import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Discussion.css';
import { useNavigate } from 'react-router-dom';

const Discussion = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ profilePic: '', _id: null });

  const [previewImage, setPreviewImage] = useState(null); // <-- Step 3 state
  const messageEndRef = useRef(null);
  const navigate = useNavigate();

  // Fetch current user profile
  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/profile', { withCredentials: true })
      .then(res => setUser(res.data || { profilePic: '', _id: null }))
      .catch(err => console.error('Failed to fetch profile:', err));
  }, []);

  // Fetch messages
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/messages', { withCredentials: true });
      setMessages(response.data);
    } catch (err) {
      setError('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Send a new message with optional attachment
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !attachment) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('content', newMessage);
      if (attachment) {
        formData.append('attachment', attachment);
      }

      await axios.post(
        'http://localhost:5000/api/messages',
        formData,
        { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setNewMessage('');
      setAttachment(null);
      fetchMessages();
    } catch (err) {
      setError('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  // Navigation functions
  const navigateToJobPost = () => navigate('/jobpost');
  const navigateToProfile = () => navigate('/profile');
  const navigateToDashboard = () => navigate('/dashboard');
  const navigateToEvent = () => navigate('/event-portal');
  const navigateToDonation = () => navigate('/donation');
  const navigateToDirectory = () => navigate('/alumni-directory');

  return (
    <div className="page-wrapper">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <img src="/cklogo.png" alt="logo" style={{width:"150px", height:"50px"}} />
          <a href="/dashboard">AlumniSphere</a>
        </div>

        <div className="nav-links">
          <a href="#">Discussion Forum</a>
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

      {/* PAGE TITLE */}
      <div className="job-container">
        <h2 className="title">DISCUSSION FORUM</h2>

        {/* DISCUSSION CARD */}
        <div className="form-card messages">
          {error && <p className="error-message">{error}</p>}

          {loading ? (
            <p>Loading messages...</p>
          ) : (
            <div className="message-list">
              {messages.map((message, index) => {
                const isSelf = message.sender._id === user._id;
                return (
                  <div key={index} className={`message ${isSelf ? 'self' : 'other'}`}>
                    <div className="message-header">
                      <span>{message.sender.name}</span>
                      <span>{new Date(message.timestamp).toLocaleString()}</span>
                    </div>
                    {message.content && <p>{message.content}</p>}
                    {message.attachment && (
                      <div className="attachment">
                        {/\.(jpg|jpeg|png|gif)$/i.test(message.attachment) ? (
                          <img
                            src={`http://localhost:5000/api/messages/uploads/${message.attachment}`}
                            alt="attachment"
                            className="attachment-image"
                            onClick={() =>
                              setPreviewImage(
                                `http://localhost:5000/api/messages/uploads/${message.attachment}`
                              )
                            }
                          />
                        ) : (
                          <a
                            href={`http://localhost:5000/api/messages/uploads/${message.attachment}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="attachment-link"
                          >
                            {message.attachment} <span className="download-arrow">⬇️</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={messageEndRef} />
            </div>
          )}

          <form onSubmit={handleSendMessage} className="msgcont">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write a message..."
            />
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
              onChange={(e) => setAttachment(e.target.files[0])}
            />
            <button type="submit" disabled={loading} className="sendbutton">
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>

      {/* IMAGE PREVIEW MODAL (Step 3) */}
{/* IMAGE PREVIEW MODAL */}
      {previewImage && (
        <div className="image-modal" onClick={() => setPreviewImage(null)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={previewImage} alt="Preview" className="modal-img" />
            <div className="modal-actions">
              <a href={previewImage} download className="download-btn">
                ⬇️ Download
              </a>
              <button className="close-btn" onClick={() => setPreviewImage(null)}>
                ✖
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2026 AlumniSphere. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Discussion;