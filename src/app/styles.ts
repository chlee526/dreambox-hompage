import { css } from '@emotion/react';
import theme from './styles/theme';

export const MainBannerStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 3.2rem;
    padding: 20rem 8rem 10rem;
    background-image: url('/assets/image/banner.png');
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    width: 100%;
    height: 100vh;

    .word-wrap {
        display: flex;
        flex-direction: column;
        color: #e9e1d3;

        p {
            &.text-xlg {
                margin-bottom: 4rem;
                font-size: 50px;
                font-weight: 700;
                line-height: 1.3;
                letter-spacing: 0.2rem;
            }
            &.text-lg {
                font-size: 32px;
                font-weight: 500;
                line-height: 1.4;
            }
        }
    }

    .cta-wrap {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.6rem;

        > button {
            padding: 10px 20px;
            border-radius: 999px;
            border: 0.2rem solid ${theme.color.secondary};
            background-color: transparent;
            color: ${theme.color.secondary};
            transition: all 0.2s ease-in;

            span {
                font-size: 2.4rem;
                font-weight: 600;
            }

            &:hover {
                background-color: ${theme.color.secondary};
                color: ${theme.color.primary};
                border-color: ${theme.color.primary};
            }
        }
    }
`;

export const AboutSectionStyles = css`
    padding: 10rem;

    h2 {
        font-size: 3.8rem;
        font-weight: 500;
        line-height: 1.3;
        color: ${theme.color.primary};
        text-align: center;
        margin-bottom: 1.6rem;
    }

    p {
        color: ${theme.color.gray_600};
        font-size: 2rem;
        font-weight: 400;
        line-height: 1.3;
        text-align: center;
        margin-bottom: 1.6rem;
    }

    .card-wrap {
        display: flex;
        gap: 1.6rem;
        margin-top: 6rem;

        > .card {
            width: calc(100% / 3);
        }
    }
`;
