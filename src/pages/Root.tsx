import ScrollToTop from '@components/scroll-to-top';
import Footer from '@pages/footer';
import NavBar from '@pages/nav-bar';
import GlobalStyle from '@styles/global';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Root = () => {
  return (
    <S.Container>
      <ScrollToTop />
      <GlobalStyle />
      <NavBar />
      <S.Main>
        <Outlet />
      </S.Main>
      <Footer />
    </S.Container>
  );
};

export default Root;

const S = {
  Container: styled.div`
    margin-top: 70px;
  `,

  Main: styled.main`
    margin-bottom: 330px;
  `,
};
