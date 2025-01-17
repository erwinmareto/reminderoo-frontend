export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const SUBSCRIPTION_CATEGORIES = ['Entertainment', 'Work', 'Home', 'Games', 'Education', 'Health', 'Others'];

export interface SubscriptionPriceRanges {
  [key: string]: number[];
}

export const SUBSCRIPTION_PRICE_RANGES: SubscriptionPriceRanges = {
  'Less than Rp.100.000': [0, 100000],
  'Rp.100.000 - Rp.200.000': [100000, 200000],
  'Rp.200.000 - Rp.300.000': [200000, 300000],
  'Rp.300.000 - Rp.400.000': [300000, 400000],
  'Rp.400.000 - Rp.500.000': [400000, 500000],
  'Rp.500.000 and above': [500000, Infinity]
};

export const SUBSCRIPTION_STATUS = ['Inactive', 'Upcoming', 'Active', 'Overdue'];

export const SUBSCRIPTION_CYCLES = ['Daily', 'Weekly', 'Monthly', '3 Months', '6 Months', 'Yearly'];

export const CYCLE_DAYS: Record<string, number> = {
  daily: 1,
  weekly: 7,
  monthly: 30,
  '3 months': 90,
  '6 months': 180,
  yearly: 365
};

export const AVAILABLE_ICONS: Record<string, string> = {
  prime: 'Amazon Prime Video',
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
  spotify: 'Spotify',
  xbox: ' Xbox',
  youtube: 'YouTube',
  zoom: 'Zoom',
  'category-creative': 'Creative',
  'category-education': 'Education',
  'category-entertainment': 'Entertainment',
  'category-games': 'Games',
  'category-health': 'Health',
  'category-others': 'Others'
};

export const PAYMENT_METHODS = ['credit card', 'debit card', 'paypal', 'gopay', 'OVO', 'shopee pay', 'dana'];
