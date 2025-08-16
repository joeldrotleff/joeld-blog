import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            img: {
              marginTop: '2em',
              marginBottom: '2em',
              borderRadius: '0.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
            'img + em': {
              display: 'block',
              marginTop: '-1.5em',
              marginBottom: '2em',
              fontSize: '0.875em',
              textAlign: 'center',
              color: '#6b7280',
              fontStyle: 'italic',
            },
            figure: {
              marginTop: '2em',
              marginBottom: '2em',
            },
            figcaption: {
              marginTop: '0.875em',
              fontSize: '0.875em',
              color: '#6b7280',
              textAlign: 'center',
            },
          },
        },
        invert: {
          css: {
            img: {
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
            },
            'img + em': {
              color: '#9ca3af',
            },
            figcaption: {
              color: '#9ca3af',
            },
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
