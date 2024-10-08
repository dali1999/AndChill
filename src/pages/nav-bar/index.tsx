import cardsIcon from '@assets/icons/cards-stack.svg';
import RegionSelectButton from '@pages/nav-bar/components/region-select-button';
import { NAV_MENU } from '@pages/nav-bar/constants/nav-menu-list';
import { device } from '@styles/breakpoints';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchQuerySubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value.trim();
    if (e.key === 'Enter') {
      if (!inputValue) return;
      navigate(`/search-results/${inputValue}`);
      (e.target as HTMLInputElement).value = '';
    }
  };

  return (
    <S.Container>
      <S.LogoImg src="/andchill-logo-130.png" alt="로고 이미지" onClick={() => navigate('/')} />
      <S.MenuWrapper>
        <S.MenuLists>
          {NAV_MENU.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <S.MenuItem key={menu.title} onClick={() => navigate(menu.path)} $isActive={isActive}>
                {t(`nav.${menu.title}`)}
              </S.MenuItem>
            );
          })}
          <S.MenuItem onClick={() => navigate('/random-movie')}>
            <img src={cardsIcon} alt="랜덤 카드 페이지 링크 아이콘" />
          </S.MenuItem>
        </S.MenuLists>
        <S.SearchBar type="text" onKeyUp={handleSearchQuerySubmit} placeholder={t('nav.search_placeholder')} />
        <RegionSelectButton />
      </S.MenuWrapper>
    </S.Container>
  );
};

export default NavBar;

const S = {
  Container: styled.nav`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    background-color: var(--indigo01);
    padding: 0 5%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 10px;

    @media ${device.mobile} {
      flex-direction: column;
      height: 100px;
      padding: 0;
    }
  `,

  LogoImg: styled.img`
    width: 130px;
    height: 50px;
    flex-shrink: 0;
    cursor: pointer;

    @media ${device.mobile} {
      width: 80px;
      height: 38px;
      margin: 7px 0 0;
    }
  `,

  MenuWrapper: styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    @media ${device.mobile} {
    }
  `,

  MenuLists: styled.ul`
    margin: 0 15px 0 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    flex-shrink: 0;
    @media ${device.mobile} {
      gap: 16px;
      font-size: 14px;
      margin: 0 16px 0 4%;
    }
  `,

  MenuItem: styled.li<{ $isActive?: boolean }>`
    cursor: pointer;
    color: ${({ $isActive }) => !$isActive && 'var(--gray01)'};
    font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};
    img {
      width: 30px;
      @media ${device.mobile} {
        width: 22px;
      }
    }
  `,

  SearchBar: styled.input`
    background-color: var(--indigo03);
    border-radius: 5px;
    padding: 14px 18px;
    margin: 0 10px;
    flex-grow: 1;
    font-size: 14px;
    font-weight: 100;
    @media ${device.mobile} {
      margin: 6px 3% 6px 0;
      padding: 12px 14px;
    }

    &::placeholder {
      color: var(--gray01);
      font-weight: 400;
    }
  `,
};
