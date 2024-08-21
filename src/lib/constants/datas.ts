export const SUBSCRIPTION_CATEGORIES = ['Entertainment', 'Work', 'Home', 'Games', 'Education', 'Health', 'Others'];

export interface SubscriptionPriceRanges {
  [key: string]: number[];
}

export const SUBSCRIPTION_PRICE_RANGES: SubscriptionPriceRanges = {
  'Less than Rp.100.000': [0, 100],
  'Rp.100.000 - Rp.200.000': [100, 200],
  'Rp.200.000 - Rp.300.000': [200, 300],
  'Rp.300.000 - Rp.400.000': [300, 400],
  'Rp.400.000 - Rp.500.000': [400, 500],
  'Rp.500.000 and above': [500, Infinity]
};

export const SUBSCRIPTION_STATUS = ['Inactive', 'Upcoming', 'Active', 'Overdue'];

export const SUBSCRIPTION_CYCLES = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

export const AVAILABLE_ICONS: Record<string, string> = {
  'creative-cloud': 'Creative Cloud',
  disney: 'Disney+',
  dribbble: 'Dribbble',
  gmail: 'Gmail',
  'google-play': 'Google Play',
  jira: 'Jira',
  medium: 'Medium',
  'ms-365': 'Microsoft 365',
  netflix: 'Netflix',
  notion: 'Notion',
  playstation: 'Playstation',
  prime: 'Amazon Prime',
  spotify: 'Spotify',
  xbox: ' Xbox',
  youtube: 'YouTube',
  zoom: 'Zoom',
  'category-creative': 'Creative',
  'category-education': 'Education',
  'category-entertainment': 'Entertainment',
  'category-games': 'Games',
  'category-health': 'Health'
};
