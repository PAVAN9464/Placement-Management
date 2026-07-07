import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { theme } = useAuth();
  return (
    <footer style={{ padding: '1rem 2rem', textAlign: 'center', color: theme === 'dark' ? '#cbd5e1' : '#475569', background: theme === 'dark' ? '#020617' : '#f8fafc' }}>
      © 2026 Campus Placement Hub. All rights reserved.
    </footer>
  );
};

export default Footer;
