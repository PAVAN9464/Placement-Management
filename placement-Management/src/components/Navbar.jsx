import { Link } from 'react-router-dom';
import { FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, theme, toggleTheme } = useAuth();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: theme === 'dark' ? '#0f172a' : '#ffffff', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <Link to="/" style={{ color: theme === 'dark' ? '#f8fafc' : '#111827', fontSize: '1.2rem', fontWeight: 700 }}>Campus Placement Hub</Link>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button onClick={toggleTheme} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: theme === 'dark' ? '#fbbf24' : '#1d4ed8' }}>
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
        {user ? (
          <>
            <span style={{ color: theme === 'dark' ? '#e2e8f0' : '#334155' }}>{user.name} ({user.role})</span>
            <button onClick={logout} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#ef4444' }}>
              <FaSignOutAlt />
            </button>
          </>
        ) : (
          <Link to="/login" style={{ padding: '0.6rem 1rem', borderRadius: '999px', color: '#ffffff', background: '#2563eb' }}>Login</Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
