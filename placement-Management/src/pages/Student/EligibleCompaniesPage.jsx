import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { companies } from '../../data/companies';
import { evaluateEligibility } from '../../utils/eligibility';

const EligibleCompaniesPage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('student-profile');
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  const parsedProfile = useMemo(() => ({
    cgpa: Number(profile?.cgpa || 0),
    branch: profile?.branch || '',
    backlogs: Number(profile?.backlogs || 0),
    batch: Number(profile?.batch || 0),
  }), [profile]);

  const sections = useMemo(() => {
    if (!profile) return { eligible: [], notEligible: [] };
    return companies.reduce(
      (acc, company) => {
        const result = evaluateEligibility(parsedProfile, {
          requiredCgpa: company.requiredCgpa,
          requiredBranch: company.requiredBranch,
          requiredBacklogs: company.requiredBacklogs,
          requiredBatch: company.requiredBatch,
        });

        if (result.eligible) acc.eligible.push({ ...company, result });
        else acc.notEligible.push({ ...company, result });
        return acc;
      },
      { eligible: [], notEligible: [] },
    );
  }, [parsedProfile, profile]);

  return (
    <div>
      <h2>Eligible Companies</h2>
      <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        <section>
          <h3>Eligible</h3>
          {sections.eligible.map((company) => (
            <div key={company.id} style={{ background: '#fff', padding: '1rem', borderRadius: '0.9rem', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>{company.name}</strong>
                <Link to={`/student/companies/${company.id}`} style={{ color: '#2563eb' }}>View Details</Link>
              </div>
              <p style={{ margin: '0.4rem 0', color: '#64748b' }}>{company.description}</p>
              <small>Package: {company.package} • Role: {company.role}</small>
            </div>
          ))}
        </section>

        <section>
          <h3>Not Eligible</h3>
          {sections.notEligible.map((company) => (
            <div key={company.id} style={{ background: '#fef2f2', padding: '1rem', borderRadius: '0.9rem', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>{company.name}</strong>
                <Link to={`/student/companies/${company.id}`} style={{ color: '#dc2626' }}>View Details</Link>
              </div>
              <ul style={{ paddingLeft: '1rem', color: '#7f1d1d' }}>
                {company.result.reasons.map((reason) => <li key={reason}>{reason}</li>)}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default EligibleCompaniesPage;
