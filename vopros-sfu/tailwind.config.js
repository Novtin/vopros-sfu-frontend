/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'base-grey-01': 'var(--base-grey-01)',
        'base-grey-02': 'var(--base-grey-02)',
        'base-grey-03': 'var(--base-grey-03)',
        'base-grey-04': 'var(--base-grey-04)',
        'base-grey-05': 'var(--base-grey-05)',
        'base-grey-06': 'var(--base-grey-06)',
        'base-grey-07': 'var(--base-grey-07)',
        'base-grey-08': 'var(--base-grey-08)',
        'base-blue-01': 'var(--base-blue-01)',
        'base-blue-02': 'var(--base-blue-02)',
        'base-blue-03': 'var(--base-blue-03)',
        'base-orange-01': 'var(--base-orange-01)',
        'base-orange-02': 'var(--base-orange-02)',
        'base-orange-border': 'var(--base-orange-border)',
        'base-orange-hover': 'var(--base-orange-hover)',
        'base-orange-disabled': 'var(--base-orange-disabled)',
        'base-green-01': 'var(--base-green-01)',
        'base-green-02': 'var(--base-green-02)',
      },
      borderRadius: {
        button: '0.625rem',
      },
    },
  },
  plugins: [],
};
