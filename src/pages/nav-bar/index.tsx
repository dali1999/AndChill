import RegionSelectButton from '@pages/nav-bar/components/region-select-button';
import { NAV_MENU } from '@pages/nav-bar/constants/nav-menu-list';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.LogoImg src="/andchill-logo-300.png" alt="로고 이미지" onClick={() => navigate('/')} />
      <S.MenuLists>
        {NAV_MENU.map((menu) => {
          return (
            <S.MenuItem key={menu.title} onClick={() => navigate(menu.page)}>
              {menu.title}
            </S.MenuItem>
          );
        })}
      </S.MenuLists>
      <S.SearchBar type="text" placeholder="영화 또는 TV 프로그램 검색" />
      <RegionSelectButton />
    </S.Container>
  );
};

export default NavBar;

const S = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90px;
    background-color: var(--indigo01);
    padding: 0 5%;
  `,

  MenuLists: styled.ul`
    margin: 0 10px 0 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 120px;
    flex-shrink: 0;
  `,

  MenuItem: styled.li`
    cursor: pointer;
  `,

  LogoImg: styled.img`
    width: 130px;
    height: 50px;
    flex-shrink: 0;
    cursor: pointer;
  `,

  SearchBar: styled.input`
    background-color: var(--dark01);
    border-radius: 5px;
    padding: 10px;
    width: 250px;
    margin: 0 10px;
    flex-grow: 1;
  `,
};
