import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { companies } from '../../data/companies';
import { evaluateEligibility } from '../../utils/eligibility';

const CompanyDetailsPage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [applied, setApplied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('student-profile');
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  const company = useMemo(() => companies.find((item) => item.id === Number(id)), [id]);
  const eligibility = useMemo(() => {
    if (!company || !profile) return null;
    return evaluateEligibility(
      {
        cgpa: Number(profile.cgpa),
        branch: profile.branch,
        backlogs: Number(profile.backlogs),
        batch: Number(profile.batch),
      },
      {
        requiredCgpa: company.requiredCgpa,
        requiredBranch: company.requiredBranch,
        requiredBacklogs: company.requiredBacklogs,
        requiredBatch: company.requiredBatch,
      },
    );
  }, [company, profile]);

  const handleApply = () => {
    const apps = JSON.parse(localStorage.getItem('student-applications') || '[]');
    if (!apps.find((item) => item.companyId === company.id)) {
      apps.push({ companyId: company.id, companyName: company.name, status: 'Applied' });
      localStorage.setItem('student-applications', JSON.stringify(apps));
      setApplied(true);
    }
  };

  if (!company) return <div>Company not found.</div>;

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 10px 26px rgba(15,23,42,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{company.name}</h2>
          <div style={{ width: '48px', height: '48px', borderRadius: '999px', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{company.logo}</div>
        </div>
        <p style={{ color: '#64748b' }}>{company.description}</p>
        <ul>
          <li><strong>Package:</strong> {company.package}</li>
          <li><strong>Role:</strong> {company.role}</li>
          <li><strong>Skills:</strong> {company.skills.join(', ')}</li>
          <li><strong>Deadline:</strong> {company.deadline}</li>
          <li><strong>Eligibility:</strong> {company.requiredCgpa}+ CGPA, {company.requiredBranch}, backlog ≤ {company.requiredBacklogs}, batch {company.requiredBatch}</li>
        </ul>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={handleApply} style={{ padding: '0.8rem 1rem', border: 'none', borderRadius: '0.8rem', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>{applied ? 'Applied' : 'Apply'}</button>
          <button onClick={() => setBookmarked((prev) => !prev)} style={{ padding: '0.8rem 1rem', border: '1px solid #cbd5e1', borderRadius: '0.8rem', background: bookmarked ? '#fef3c7' : '#fff', cursor: 'pointer' }}>{bookmarked ? 'Bookmarked' : 'Bookmark'}</button>
        </div>
        {eligibility && (
          <div style={{ marginTop: '1rem', padding: '0.8rem', borderRadius: '0.8rem', background: eligibility.eligible ? '#ecfdf5' : '#fef2f2' }}>
            {eligibility.eligible ? 'You are eligible for this role.' : eligibility.reasons.join(' • ')}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetailsPage;
