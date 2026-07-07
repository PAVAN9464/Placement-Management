import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUserGraduate, FaBuilding, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const links = {
  student: [
    { label: 'Dashboard', to: '/student', icon: <FaHome /> },
    { label: 'Profile', to: '/student/profile', icon: <FaUserGraduate /> },
  ],
  company: [
    { label: 'Dashboard', to: '/company', icon: <FaHome /> },
    { label: 'Opportunities', to: '/company/jobs', icon: <FaBuilding /> },
  ],
  admin: [
    { label: 'Dashboard', to: '/admin', icon: <FaHome /> },
    { label: 'Manage Placements', to: '/admin/placements', icon: <FaShieldAlt /> },
  ],
};

const Sidebar = () => {
  const { user, theme } = useAuth();
  const location = useLocation();

  if (!user) return null;

  return (
    <aside style={{ width: '240px', minHeight: '100%', padding: '1.5rem 1rem', background: theme === 'dark' ? '#111827' : '#f8fafc', borderRight: theme === 'dark' ? '1px solid #334155' : '1px solid #e5e7eb' }}>
      <h3 style={{ marginTop: 0, color: theme === 'dark' ? '#f8fafc' : '#111827' }}>Quick Links</h3>
      {links[user.role]?.map((link) => (
        <Link key={link.to} to={link.to} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0.5rem', marginBottom: '0.5rem', borderRadius: '0.75rem', color: location.pathname === link.to ? '#2563eb' : theme === 'dark' ? '#e2e8f0' : '#334155', background: location.pathname === link.to ? (theme === 'dark' ? '#1e3a8a' : '#dbeafe') : 'transparent' }}>
          {link.icon}
          <span>{link.label}</span>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
