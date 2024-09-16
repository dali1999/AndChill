import PretendardBold from '@assets/fonts/Pretendard-Bold.subset.woff';
import PretendardExtraBold from '@assets/fonts/Pretendard-ExtraBold.subset.woff';
import PretendardLight from '@assets/fonts/Pretendard-Light.subset.woff';
import PretendardRegular from '@assets/fonts/Pretendard-Regular.subset.woff';
import colors from '@styles/colors';
import myReset from '@styles/myReset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    ${myReset}
    ${colors}
    @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardLight}) format('woff');
    font-weight: 300;
    font-display: swap;
    }
    @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardRegular}) format('woff');
    font-weight: 400;
    font-display: swap;
    }
    @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardBold}) format('woff');
    font-weight: 700;
    font-display: swap;
    }
    @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardExtraBold}) format('woff');
    font-weight: 900;
    font-display: swap;
    }
`;

export default GlobalStyle;
