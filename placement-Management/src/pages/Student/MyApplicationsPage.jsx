import { useEffect, useState } from 'react';

const statuses = ['Applied', 'OA Scheduled', 'OA Cleared', 'Technical Interview', 'HR Interview', 'Offer Received', 'Rejected'];

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('student-applications');
    if (stored) setApplications(JSON.parse(stored));
  }, []);

  return (
    <div>
      <h2>My Applications</h2>
      <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
        {applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          applications.map((application) => (
            <div key={application.companyId} style={{ background: '#fff', padding: '1rem', borderRadius: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>{application.companyName}</strong>
                <span style={{ color: '#2563eb' }}>{application.status}</span>
              </div>
              <select defaultValue={application.status} style={{ marginTop: '0.75rem', padding: '0.6rem', borderRadius: '0.6rem' }}>
                {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyApplicationsPage;
