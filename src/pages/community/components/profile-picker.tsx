import React, { SetStateAction, useState } from 'react';
import { device } from '@styles/breakpoints';
import styled from 'styled-components';
import { BACKGROUNDS, CHARACTERS } from '../constants/profile';
import { dicebearURL } from '../utils/constant';

interface TProfilePickerProps {
  setProfile: React.Dispatch<SetStateAction<string>>;
  setPickerClicked: React.Dispatch<SetStateAction<boolean>>;
}

const ProfilePicker = ({ setProfile, setPickerClicked }: TProfilePickerProps) => {
  const [currentColor, setCurrentColor] = useState('b6e3f4');

  const makeImageSrc = (character: string, background: string) => {
    return `${dicebearURL}?seed=${character}&backgroundColor=${background}`;
  };

  const handleColorClick = (color: string) => {
    setCurrentColor(color);
  };

  const handleCharacterClick = (character: string, background: string) => {
    setProfile(`${dicebearURL}?seed=${character}&backgroundColor=${background}`);
  };
  return (
    <S.Container>
      <S.Header>
        <p>프로필 선택</p>
        <button onClick={() => setPickerClicked((prev) => !prev)}>✕</button>
      </S.Header>
      <S.ColorPicker>
        {BACKGROUNDS.map((color) => (
          <S.Color key={color} style={{ background: `#${color}` }} onClick={() => handleColorClick(color)}></S.Color>
        ))}
      </S.ColorPicker>
      <S.CharacterPicker>
        {CHARACTERS.map((character) => (
          <img
            key={character}
            src={makeImageSrc(character, currentColor)}
            onClick={() => handleCharacterClick(character, currentColor)}
          />
        ))}
      </S.CharacterPicker>
    </S.Container>
  );
};

export default ProfilePicker;

const S = {
  Container: styled.div`
    position: absolute;
    top: 80px;
    left: 4%;
    z-index: 200;
    width: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    background-color: var(--indigo05);
    border-radius: 10px;
    border: 1px solid var(--dark02);
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    @media ${device.mobile} {
      top: 100px;
      left: 2%;
    }
  `,

  Header: styled.div`
    color: var(--white);
    display: flex;
    margin-bottom: 8px;
    width: calc(100% - 6px);
    align-items: center;
    justify-content: space-between;
    button {
      font-size: 18px;
      font-weight: 900;
    }
  `,

  ColorPicker: styled.div`
    display: flex;
    gap: 4px;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--directory-hover);
    cursor: pointer;
  `,
  Color: styled.div`
    height: 32px;
    width: 32px;
    border-radius: 6px;
    border: 1px solid var(--directory-hover);
  `,
  CharacterPicker: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    justify-content: center;
    img {
      height: 40px;
      width: 40px;
      border-radius: 100%;
      cursor: pointer;
    }
  `,
};
