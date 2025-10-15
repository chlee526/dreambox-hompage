import { css } from '@emotion/react';

const globalStyle = css`
    @font-face {
        font-family: 'Pretendard';
        src: url('/assets/font/Pretendard-Regular.woff2') format('woff2'), url('/assets/font/Pretendard-Medium.woff2') format('woff2'), url('/assets/font/Pretendard-Bold.woff2') format('woff2'), url('/assets/font/Pretendard-ExtraBold.woff2') format('woff2'), url('/assets/font/Pretendard-Black.woff2') format('woff2');
        font-weight: 400, 500, 600, 700, 800, 900;
        font-style: normal;
    }
    @font-face {
        font-family: 'PaperLogy';
        src: url('/assets/font/paperlogy/Paperlogy-1Thin.ttf') format('ttf'), url('/assets/font/paperlogy/Paperlogy-2ExtraLight.ttf') format('ttf'), url('/assets/font/paperlogy/Paperlogy-3Light.ttf') format('ttf'), url('/assets/font/paperlogy/Paperlogy-4Reular.ttf') format('ttf'), url('/assets/font/paperlogy/Paperlogy-5Medium.ttf') format('ttf'), url('/assets/font/paperlogy/Paperlogy-6SemiBold.ttf') format('ttf'), url('/assets/font/paperlogy/Paperlogy-7Bold.ttf') format('ttf'), url('/assets/font/paperlogy/Paperlogy-8ExtraBold.ttf') format('ttf'),
            url('/assets/font/paperlogy/Paperlogy-9Black.ttf') format('ttf');
        font-weight: 100, 200, 300, 400, 500, 600, 700, 800, 900;
        font-style: normal;
    }
    * {
        box-sizing: border-box;
        font-size: 10px;
        /* font-family: 'Pretendard'; */
        font-family: 'PaperLogy';
    }

    html,
    body,
    div,
    span,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    a,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    form,
    label,
    table {
        margin: 0;
        padding: 0;
        border: 0;
    }

    body {
        background-color: '#FFFFFF';
        overflow-x: hidden;
        /* font-family: 'Pretendard'; */
        font-family: 'PaperLogy';
    }

    ol,
    ul {
        list-style: none;
    }

    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

export default globalStyle;
