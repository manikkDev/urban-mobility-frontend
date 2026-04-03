export const ISSUE_TYPES = [
  { value: 'broken_ramp', label: 'Broken Ramp' },
  { value: 'lift_not_working', label: 'Lift Not Working' },
  { value: 'no_seating', label: 'No Seating' },
  { value: 'unsafe_boarding', label: 'Unsafe Boarding' },
  { value: 'overcrowded_platform', label: 'Overcrowded Platform' },
  { value: 'large_platform_gap', label: 'Large Platform Gap' },
  { value: 'no_accessible_toilet', label: 'No Accessible Toilet' },
  { value: 'unclear_signage', label: 'Unclear Signage' },
  { value: 'no_assistance_available', label: 'No Assistance Available' },
  { value: 'other', label: 'Other' },
];

export const SEVERITY_LEVELS = [
  { value: 1, label: '1 - Very Minor' },
  { value: 2, label: '2 - Minor' },
  { value: 3, label: '3 - Moderate' },
  { value: 4, label: '4 - Major' },
  { value: 5, label: '5 - Critical' },
];

export const CROWDING_LEVELS = [
  { value: 1, label: '1 - Very Light' },
  { value: 2, label: '2 - Light' },
  { value: 3, label: '3 - Moderate' },
  { value: 4, label: '4 - Heavy' },
  { value: 5, label: '5 - Very Heavy' },
];

export const RISK_COLORS = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
};

export const RISK_LABELS = {
  low: 'Low Risk',
  medium: 'Medium Risk',
  high: 'High Risk',
};
