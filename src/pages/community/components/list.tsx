/* eslint-disable no-unused-vars */
import React, { SetStateAction, useState } from 'react';
import axios from '@api/forumAxios';
import { device } from '@styles/breakpoints';
import styled, { css } from 'styled-components';
import { TGuestBook } from '..';
import { formatContentWithLinks } from '../utils/format-content-with-links';
import { getFormattedTimeStamp } from '../utils/get-formatted-timestamp';

interface TListPops {
  data: TGuestBook;
  setUpdateUI: React.Dispatch<SetStateAction<boolean>>;
}

const List = ({ data, setUpdateUI }: TListPops) => {
  const { _id, name, content, createdAt, profileImage } = data;
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [contentInput, setContentInput] = useState('');
  const [updateId, setUpdateId] = useState<string | null>(null);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [deleteModeActive, setDeleteModeActive] = useState(false);

  const removeBook = () => {
    axios.delete(`/delete/${_id}`).then(() => {
      setUpdateUI((prev) => !prev);
      setPasswordCheck(false);
      setDeleteModeActive(false);
    });
  };

  const updateBook = () => {
    axios.put(`/update/${updateId}`, { content: contentInput, name: nameInput }).then(() => {
      setUpdateUI((prev) => !prev);
      setUpdateId(null);
      setPasswordCheck(false);
    });
  };

  const checkPassword = () => {
    axios
      .post(`/checkpassword/${updateId}`, { password: passwordInput })
      .then(() => {
        if (deleteModeActive) {
          removeBook();
        } else {
          setPasswordCheck(true);
        }
      })
      .catch(() => {
        alert('비밀번호가 일치하지 않습니다!');
        setPasswordCheck(false);
      });
  };

  const updateMode = (id: string, name: string) => {
    setUpdateId(id);
    setNameInput(name);
    setContentInput(content);
    setDeleteModeActive(false);
  };

  const initiateDelete = (id: string) => {
    setUpdateId(id);
    setDeleteModeActive(true);
    setPasswordCheck(false);
  };

  return (
    <S.Container>
      <S.Header>
        <S.NameWrapper>
          <S.ProfileImage src={profileImage} />
          <div>
            {updateId === _id && passwordCheck ? (
              <S.NameInput value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
            ) : (
              <S.Name>{name}</S.Name>
            )}
            <S.TimeStamp>{getFormattedTimeStamp(createdAt)}</S.TimeStamp>
          </div>
        </S.NameWrapper>

        <S.ButtonWrapper>
          {updateId === _id ? (
            passwordCheck ? (
              <>
                <button onClick={updateBook}>완료</button> / <button onClick={() => setUpdateId(null)}>취소</button>
              </>
            ) : (
              <S.PasswordCheckWrapper>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="비밀번호 입력"
                />
                <div>
                  <button onClick={checkPassword}>확인</button> /{' '}
                  <button onClick={() => setUpdateId(null)}>취소</button>
                </div>
              </S.PasswordCheckWrapper>
            )
          ) : (
            <>
              <button onClick={() => updateMode(_id, name)}>수정</button> /{' '}
              <button onClick={() => initiateDelete(_id)}>삭제</button>
            </>
          )}
        </S.ButtonWrapper>
      </S.Header>

      <S.Content>
        {updateId === _id && passwordCheck ? (
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
    position: relative;
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

  PasswordCheckWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    position: absolute;
    gap: 4px;
    top: 20px;
    right: 20px;
    input {
      ${Input}
      width: 130px;
      height: 24px;
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
