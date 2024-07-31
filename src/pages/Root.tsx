import NavBar from '@pages/nav-bar';
import GlobalStyle from '@styles/global';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Root = () => {
  const location = useLocation();

  const nonSubSectionArray = ['/'];
  const isSubSection = nonSubSectionArray.includes(location.pathname);

  return (
    <>
      {isSubSection && (
        <>
          <NavBar />
        </>
      )}
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
