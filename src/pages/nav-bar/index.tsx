import logoImg from '@assets/images/logo.webp';
import { useRegionStore } from '@stores/region';
import styled from 'styled-components';
import RegionSelectButton from './components/language-select-button';
import { NAV_MENU } from './utils/nav-menu-list';

const NavBar = () => {
  const { setRegion } = useRegionStore((state) => ({
    region: state.region,
    setRegion: state.setRegion,
  }));

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
      <RegionSelectButton setRegion={setRegion} />
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
};
