export const evaluateEligibility = (studentProfile, companyRequirement) => {
  const reasons = [];

  if (studentProfile.cgpa < companyRequirement.requiredCgpa) {
    reasons.push(`Required CGPA: ${companyRequirement.requiredCgpa}`);
    reasons.push(`Your CGPA: ${studentProfile.cgpa}`);
  }

  if (studentProfile.branch !== companyRequirement.requiredBranch) {
    reasons.push(`Required Branch: ${companyRequirement.requiredBranch}`);
    reasons.push(`Your Branch: ${studentProfile.branch}`);
  }

  if (studentProfile.backlogs > companyRequirement.requiredBacklogs) {
    reasons.push(`Required Backlogs: ${companyRequirement.requiredBacklogs}`);
    reasons.push(`Your Backlogs: ${studentProfile.backlogs}`);
  }

  if (studentProfile.batch !== companyRequirement.requiredBatch) {
    reasons.push(`Required Graduation Batch: ${companyRequirement.requiredBatch}`);
    reasons.push(`Your Graduation Batch: ${studentProfile.batch}`);
  }

  return { eligible: reasons.length === 0, reasons };
};
