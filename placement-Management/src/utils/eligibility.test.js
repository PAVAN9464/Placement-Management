import { describe, expect, it } from 'vitest';
import { evaluateEligibility } from './eligibility';

describe('evaluateEligibility', () => {
  it('marks a student eligible when all requirements are met', () => {
    const result = evaluateEligibility(
      {
        cgpa: 8.5,
        branch: 'CSE',
        backlogs: 0,
        batch: 2026,
      },
      {
        requiredCgpa: 8.5,
        requiredBranch: 'CSE',
        requiredBacklogs: 0,
        requiredBatch: 2026,
      },
    );

    expect(result.eligible).toBe(true);
    expect(result.reasons).toHaveLength(0);
  });

  it('returns the reasons why a student is not eligible', () => {
    const result = evaluateEligibility(
      {
        cgpa: 7.8,
        branch: 'ECE',
        backlogs: 2,
        batch: 2025,
      },
      {
        requiredCgpa: 8.5,
        requiredBranch: 'CSE',
        requiredBacklogs: 0,
        requiredBatch: 2026,
      },
    );

    expect(result.eligible).toBe(false);
    expect(result.reasons).toEqual(
      expect.arrayContaining([
        'Required CGPA: 8.5',
        'Your CGPA: 7.8',
        'Required Branch: CSE',
        'Your Branch: ECE',
      ]),
    );
  });
});
