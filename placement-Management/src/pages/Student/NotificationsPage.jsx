import { useEffect, useState } from 'react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('student-notifications');
    if (stored) {
      setNotifications(JSON.parse(stored));
    } else {
      setNotifications([
        { id: 1, message: 'New company added: TechNova' },
        { id: 2, message: 'Interview scheduled with DataForge' },
        { id: 3, message: 'Status updated: OA Scheduled' },
      ]);
      localStorage.setItem('student-notifications', JSON.stringify([
        { id: 1, message: 'New company added: TechNova' },
        { id: 2, message: 'Interview scheduled with DataForge' },
        { id: 3, message: 'Status updated: OA Scheduled' },
      ]));
    }
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
        {notifications.map((notification) => (
          <div key={notification.id} style={{ background: '#fff', padding: '1rem', borderRadius: '0.9rem' }}>
            {notification.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
