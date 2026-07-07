import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const defaultProfile = {
  name: 'Aarav Kumar',
  usn: '1DS21CS001',
  branch: 'CSE',
  semester: '7',
  cgpa: '8.5',
  skills: 'React, Node.js, Java',
  email: 'aarav@example.com',
  phone: '9876543210',
  resume: '',
  photo: '',
  batch: '2026',
  backlogs: '0',
};

const StudentProfilePage = () => {
  const { theme } = useAuth();
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    const stored = localStorage.getItem('student-profile');
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('student-profile', JSON.stringify(profile));
    alert('Profile saved locally.');
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      <h2>Student Profile</h2>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {Object.entries(profile).map(([key, value]) => {
          if (key === 'resume' || key === 'photo') {
            return (
              <div key={key}>
                <label style={{ display: 'block', marginBottom: '0.35rem' }}>{key === 'resume' ? 'Resume Upload' : 'Profile Photo (optional)'}</label>
                <input type="file" onChange={() => {}} />
              </div>
            );
          }

          return (
            <div key={key}>
              <label style={{ display: 'block', marginBottom: '0.35rem', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</label>
              <input
                name={key}
                value={value}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.7rem', borderRadius: '0.7rem', border: theme === 'dark' ? '1px solid #475569' : '1px solid #cbd5e1' }}
              />
            </div>
          );
        })}
      </div>
      <button onClick={handleSave} style={{ marginTop: '1.5rem', padding: '0.8rem 1.2rem', border: 'none', borderRadius: '0.8rem', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>
        Save Profile
      </button>
    </div>
  );
};

export default StudentProfilePage;
