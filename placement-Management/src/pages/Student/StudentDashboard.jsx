import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { companies } from '../../data/companies';
import { evaluateEligibility } from '../../utils/eligibility';

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedProfile = localStorage.getItem('student-profile');
    const storedApplications = localStorage.getItem('student-applications');
    const storedNotifications = localStorage.getItem('student-notifications');

    if (storedProfile) setProfile(JSON.parse(storedProfile));
    if (storedApplications) setApplications(JSON.parse(storedApplications));
    if (storedNotifications) setNotifications(JSON.parse(storedNotifications));
  }, []);

  const eligibleCount = companies.filter((company) => {
    if (!profile) return false;
    return evaluateEligibility(
      { cgpa: Number(profile.cgpa), branch: profile.branch, backlogs: Number(profile.backlogs), batch: Number(profile.batch) },
      { requiredCgpa: company.requiredCgpa, requiredBranch: company.requiredBranch, requiredBacklogs: company.requiredBacklogs, requiredBatch: company.requiredBatch },
    ).eligible;
  }).length;

  return (
    <div>
      <h2>Student Dashboard</h2>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginTop: '1rem' }}>
        {[
          { label: 'Eligible Companies', value: eligibleCount },
          { label: 'Applied Companies', value: applications.length },
          { label: 'Upcoming Interviews', value: 2 },
          { label: 'Offers', value: 1 },
          { label: 'Rejections', value: 0 },
          { label: 'Notifications', value: notifications.length },
        ].map((card) => (
          <div key={card.label} style={{ background: '#fff', padding: '1rem', borderRadius: '1rem', boxShadow: '0 8px 24px rgba(15,23,42,0.08)' }}>
            <h3 style={{ marginBottom: '0.2rem' }}>{card.value}</h3>
            <p style={{ margin: 0, color: '#64748b' }}>{card.label}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Quick Links</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/student/profile" style={{ color: '#2563eb' }}>Profile</Link>
          <Link to="/student/companies" style={{ color: '#2563eb' }}>Eligible Companies</Link>
          <Link to="/student/applications" style={{ color: '#2563eb' }}>My Applications</Link>
          <Link to="/student/notifications" style={{ color: '#2563eb' }}>Notifications</Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
