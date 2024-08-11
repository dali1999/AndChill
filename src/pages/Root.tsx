import Footer from '@pages/footer';
import NavBar from '@pages/nav-bar';
import GlobalStyle from '@styles/global';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Root = () => {
  return (
    <>
      <GlobalStyle />
      <NavBar />
      <S.Main>
        <Outlet />
      </S.Main>
      <Footer />
    </>
  );
};

export default Root;

const S = {
  Container: styled.div``,
  
  Main: styled.main`
    margin-bottom: 330px;
  `,
};
