import { css } from '@emotion/react';
import theme from '@/app/styles/theme';

export const HeaderStyles = css`
    position: fixed;
    top: 2rem;
    left: 0;
    width: 100%;
    /* padding: 2rem 0; */
    z-index: 1000;

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 4rem;

        .logo-wrap {
            height: auto;

            > a {
                display: flex;
                align-items: center;

                img {
                    width: 14rem;
                }
            }
        }

        .nav-wrap {
            .nav-list {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1.6rem;

                .nav-item {
                    a {
                        display: inline-block;
                        padding: 1rem 2rem;
                        font-size: 2rem;
                        color: ${theme.color.primary};
                    }
                }
            }
        }
    }
`;
