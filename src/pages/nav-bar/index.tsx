import logoImg from '@assets/logo.webp';
import styled from 'styled-components';
import { NAV_MENU } from './utils/nav-menu-list';

const NavBar = () => {
  return (
    <S.Container>
      <S.LogoImg src={logoImg} alt="로고 이미지" />
      <S.MenuLists>
        {NAV_MENU.map((menu) => {
          return (
            <S.MenuItem key={menu.title}>
              <a href={menu.page}>{menu.title}</a>
            </S.MenuItem>
          );
        })}
      </S.MenuLists>
      <S.SearchBar type="text" placeholder="영화 또는 TV 프로그램 검색" />
      <S.CountrySelectButton>국가</S.CountrySelectButton>
    </S.Container>
  );
};

export default NavBar;

const S = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10%;
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

  MenuItem: styled.li``,

  LogoImg: styled.img`
    width: 130px;
    flex-shrink: 0;
  `,

  SearchBar: styled.input`
    background-color: var(--dark01);
    border-radius: 5px;
    padding: 10px;
    width: 250px;
    margin: 0 10px;
    flex-grow: 1;
  `,

  CountrySelectButton: styled.button`
    background-color: var(--dark02);
    border-radius: 5px;
    padding: 7px 10px;
    flex-shrink: 0;
  `,
};
