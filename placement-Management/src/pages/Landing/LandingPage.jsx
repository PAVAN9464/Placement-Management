import { Link } from 'react-router-dom';
import { FaRocket, FaChartBar, FaUsers, FaHandshake } from 'react-icons/fa';

const features = [
  { icon: <FaRocket />, title: 'Fast Placements', desc: 'Streamline placements with smart workflows and updates.' },
  { icon: <FaChartBar />, title: 'Insights', desc: 'Monitor applications, offers, and student progress at a glance.' },
  { icon: <FaUsers />, title: 'Unified Access', desc: 'Students, companies, and admins collaborate in one platform.' },
];

const LandingPage = () => (
  <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
    <section style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2rem', alignItems: 'center', padding: '2rem 0' }}>
      <div>
        <p style={{ color: '#2563eb', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Campus Placement Management</p>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '0.5rem 0' }}>Bridge students, companies, and placement cells.</h1>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#475569' }}>A polished portal to manage opportunities, applications, and recruitment events with ease.</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <Link to="/login" style={{ padding: '0.8rem 1.2rem', background: '#2563eb', color: '#fff', borderRadius: '999px' }}>Login</Link>
          <a href="#about" style={{ padding: '0.8rem 1.2rem', border: '1px solid #cbd5e1', borderRadius: '999px', color: '#111827' }}>Learn More</a>
        </div>
      </div>
      <div style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', padding: '2rem', borderRadius: '1.5rem', color: '#fff' }}>
        <FaHandshake size={48} />
        <h3 style={{ marginTop: '1rem' }}>Everything in one place</h3>
        <p>Track applications, schedule interviews, and drive successful placement outcomes.</p>
      </div>
    </section>

    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
      {features.map((feature) => (
        <div key={feature.title} style={{ background: '#fff', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 8px 24px rgba(15,23,42,0.08)' }}>
          <div style={{ color: '#2563eb', fontSize: '1.5rem' }}>{feature.icon}</div>
          <h3>{feature.title}</h3>
          <p style={{ color: '#64748b' }}>{feature.desc}</p>
        </div>
      ))}
    </section>

    <section id="about" style={{ marginTop: '3rem', display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 1fr' }}>
      <div>
        <h2>About the platform</h2>
        <p style={{ color: '#475569' }}>Designed for college placement cells to manage recruiters, students, and placement drives from a single dashboard.</p>
      </div>
      <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '1rem' }}>
        <h3>Key stats</h3>
        <p>120+ students onboarded</p>
        <p>35 companies connected</p>
        <p>98% placement readiness</p>
      </div>
    </section>
  </div>
);

export default LandingPage;
