import NavBar from '@pages/nav-bar';
import GlobalStyle from '@styles/global';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Root = () => {
  return (
    <>
      <>
        <NavBar />
      </>

      <GlobalStyle />
      <S.Main>
        <Outlet />
      </S.Main>
    </>
  );
};

export default Root;

const S = {
  Container: styled.div``,
  Main: styled.main``,
};
