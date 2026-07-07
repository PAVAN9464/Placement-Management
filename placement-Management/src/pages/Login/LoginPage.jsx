import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const roles = [
  { value: 'student', label: 'Student' },
  { value: 'company', label: 'Company' },
  { value: 'admin', label: 'Placement Cell' },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (role) => {
    const nameMap = {
      student: 'Aarav Kumar',
      company: 'Acme Recruiters',
      admin: 'Placement Cell',
    };

    login(role, nameMap[role]);

    if (role === 'student') navigate('/student');
    if (role === 'company') navigate('/company');
    if (role === 'admin') navigate('/admin');
  };

  return (
    <div style={{ maxWidth: '480px', margin: '4rem auto', padding: '2rem', background: '#fff', borderRadius: '1.25rem', boxShadow: '0 12px 32px rgba(15,23,42,0.08)' }}>
      <h2 style={{ marginTop: 0 }}>Choose your role</h2>
      <p style={{ color: '#64748b' }}>Use dummy authentication to enter the demo portal.</p>
      <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
        {roles.map((role) => (
          <button key={role.value} onClick={() => handleLogin(role.value)} style={{ padding: '0.9rem 1rem', border: 'none', borderRadius: '0.9rem', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>
            Login as {role.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LoginPage;
