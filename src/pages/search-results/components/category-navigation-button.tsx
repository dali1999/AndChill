/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { CATEGORY_INFO } from '../constants/category-info';

interface TCategoryNavigationButtonProps {
  activeSection: 'movies' | 'collections' | 'people';
  setActiveSection: (activeSection: 'movies' | 'collections' | 'people') => void;
}

const CategoryNavigationButton = ({ activeSection, setActiveSection }: TCategoryNavigationButtonProps) => {
  return (
    <S.ButtonsWrapper $activate={activeSection}>
      {CATEGORY_INFO.map((category) => (
        <button onClick={() => setActiveSection(category.title)} className={category.title} key={category.title}>
          {activeSection === category.title ? <img src={category.selectedIcon} /> : <img src={category.defaultIcon} />}
        </button>
      ))}
    </S.ButtonsWrapper>
  );
};

export default CategoryNavigationButton;

const S = {
  ButtonsWrapper: styled.div<{ $activate: string }>`
    position: absolute;
    right: 5%;
    top: 122px;
    display: flex;
    gap: 10px;
    button {
      background-color: var(--indigo06);
      padding: 8px 14px;
      border-radius: 4px;
      cursor: pointer;
      transition: 0.05s ease-in;
      img {
        width: 20px;
      }

      &:hover {
        background-color: var(--indigo05);
      }

      ${({ $activate }) =>
        $activate === 'Movies' &&
        `
    &.Movies {
      background-color: var(--indigo03);
    }
  `}

      ${({ $activate }) =>
        $activate === 'Collections' &&
        `
    &.Collections {
      background-color: var(--indigo03);
    }
  `}

  ${({ $activate }) =>
        $activate === 'People' &&
        `
    &.People {
      background-color: var(--indigo03);
    }
  `}
    }
  `,
};
