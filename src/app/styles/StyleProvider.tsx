'use client';
/** @jsxImportSource @emotion/react */
import { Global, ThemeProvider } from '@emotion/react';
import globalStyle from './global';
import theme from './theme';
// import './tailwind.css';

export function StyleProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <Global styles={globalStyle} />
            {children}
        </ThemeProvider>
    );
}
