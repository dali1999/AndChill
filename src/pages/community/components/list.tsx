/* eslint-disable no-unused-vars */
import React, { SetStateAction, useState } from 'react';
import { device } from '@styles/breakpoints';
import axios from 'axios';
import styled, { css } from 'styled-components';
import { TGuestBook } from '..';
import { formatContentWithLinks } from '../utils/format-content-with-links';

interface TListPops {
  data: TGuestBook;
  setUpdateUI: React.Dispatch<SetStateAction<boolean>>;
}

const List = ({ data, setUpdateUI }: TListPops) => {
  const { _id, name, content, createdAt, profileImage } = data;
  const [nameInput, setNameInput] = useState('');
  const [contentInput, setContentInput] = useState('');
  const [updateId, setUpdateId] = useState<string | null>(null);

  const removeTask = () => {
    axios.delete(`/delete/${_id}`).then(() => {
      setUpdateUI((prev) => !prev);
    });
  };

  const updateTask = () => {
    axios.put(`/update/${updateId}`, { content: contentInput, name: nameInput }).then(() => {
      setUpdateUI((prev) => !prev);
      setUpdateId(null);
    });
  };

  const updateMode = (id: string, name: string) => {
    setNameInput(name);
    setContentInput(content);
    setUpdateId(id);
  };

  return (
    <S.Container>
      <></>
      <S.Header>
        <S.NameWrapper>
          <S.ProfileImage src={profileImage} />
          <div>
            {updateId === _id ? (
              <S.NameInput value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
            ) : (
              <S.Name>{name}</S.Name>
            )}
            <S.TimeStamp>
              {new Date(createdAt)
                .toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })
                .replace(/(\d{4})\/(\d{1,2})\/(\d{1,2})/, '$1.$2.$3')
                .replace(',', ' ')
                .replace(/(\d{2}):(\d{2})/, ' $1:$2')}
            </S.TimeStamp>
          </div>
        </S.NameWrapper>

        <S.ButtonWrapper>
          {updateId === _id ? (
            <button onClick={updateTask}>완료</button>
          ) : (
            <>
              <button onClick={() => updateMode(_id, name)}>수정</button> / <button onClick={removeTask}>삭제</button>
            </>
          )}
        </S.ButtonWrapper>
      </S.Header>

      <S.Content>
        {updateId === _id ? (
          <S.ContentInput value={contentInput} onChange={(e) => setContentInput(e.target.value)} />
        ) : (
          formatContentWithLinks(data.content)
        )}
      </S.Content>
    </S.Container>
  );
};

export default List;

export const Input = css`
  border: 1px solid var(--indigo03);
  background-color: var(--indigo06);
  padding: 10px;
  color: var(--lightWhite);
  border-radius: 5px;
  &::placeholder {
    color: var(--gray01);
  }
`;

const S = {
  Container: styled.li`
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: fit-content;
    padding: 20px;
    background-color: var(--indigo04);
    border-radius: 5px;
    width: calc(100% / 3);
    @media ${device.tablet} {
      width: calc(100% / 2);
    }
    @media ${device.mobile} {
      width: calc(100%);
    }
    ::-webkit-scrollbar {
      display: none;
    }
  `,

  Header: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  ProfileImage: styled.img`
    width: 38px;
    border-radius: 50%;
  `,

  NameWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `,

  Name: styled.p`
    font-size: 16px;
  `,
  NameInput: styled.input`
    ${Input}
    height: 14px;
    width: 120px;
  `,
  TimeStamp: styled.p`
    font-size: 11px;
    color: var(--gray01);
  `,

  ButtonWrapper: styled.div`
    button {
      transition: ease-in;
      &:hover {
        color: var(--gray02);
      }
    }
  `,

  Content: styled.div`
    white-space: pre-wrap;
    line-height: 150%;
    height: fit-content;
    font-size: 14px;
    font-weight: 100;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,

  ContentInput: styled.textarea`
    ${Input}
    font-size: 14px;
    padding: 10px;
    height: 56px;
    width: 100%;
  `,
};
