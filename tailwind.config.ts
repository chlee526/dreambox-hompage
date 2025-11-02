import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#5b1c1d',
                    dark: '#3b1112',
                },
                secondary: {
                    DEFAULT: '#e9e1d3',
                    dark: '#E0D9CC',
                },
                cream: '#f0eeeb',
            },
            fontFamily: {
                paperlogy: ['PaperLogy', 'sans-serif'],
                pretendard: ['Pretendard', 'sans-serif'],
            },
            fontSize: {
                xxs: '1.2rem',
                sm: '1.4rem',
                base: '1.6rem',
                md: '1.8rem',
                lg: '2.4rem',
                xl: '5rem',
            },
        },
    },
    plugins: [],
};
export default config;
