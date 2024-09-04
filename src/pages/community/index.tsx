import { useEffect, useState } from 'react';
import axios from '@api/forumAxios';
import { MasonryGrid } from '@egjs/react-grid';
import usePageWidth from '@hooks/use-page-width';
import { device, size } from '@styles/breakpoints';
import styled, { css } from 'styled-components';
import List from './components/list';
import ProfilePicker from './components/profile-picker';
import { dicebearURL } from './utils/constant';

export interface TGuestBook {
  _id: string;
  content: string;
  name: string;
  profileImage: string;
  createdAt: string;
}

const Community = () => {
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [contents, setContents] = useState<TGuestBook[]>([]);
  const [profile, setProfile] = useState(`${dicebearURL}?seed=Trigger&backgroundColor=b6e3f4`);
  const [updateUI, setUpdateUI] = useState(false);
  const [pickerClicked, setPickerClicked] = useState(false);
  const pageWidth = usePageWidth();
  const masonryColumn = pageWidth <= size.mobile ? 1 : pageWidth <= size.tablet ? 2 : 3;

  useEffect(() => {
    axios.get('/get').then((res) => {
      setContents(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    axios.post('/save', { content: input, name: name, profileImage: profile }).then(() => {
      setUpdateUI((prev) => !prev);
      setInput('');
      setName('');
    });
  };

  return (
    <S.Container>
      {pickerClicked && <ProfilePicker setProfile={setProfile} setPickerClicked={setPickerClicked} />}
      <S.Form>
        <S.FormHeader>
          <S.ProfileImage src={profile} onClick={() => setPickerClicked((prev) => !prev)} />
          <S.NameInput type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="닉네임" />
          {/* <S.PasswordInput type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="비밀번호" /> */}
        </S.FormHeader>
        <S.Description>🎞 영화 상세정보 링크를 복사해 영화를 공유해 보세요 🎞</S.Description>
        <S.TextInputWrapper>
          <S.TextInput value={input} onChange={(e) => setInput(e.target.value)} placeholder="내용을 입력해 주세요" />
          <S.SubmitButton onClick={addTask} disabled={!input || !name}>
            완료
          </S.SubmitButton>
        </S.TextInputWrapper>
      </S.Form>

      <S.MasonryWrapper>
        <S.StyledMasonry gap={14} column={masonryColumn}>
          {contents.map((content) => (
            <List key={content._id} data={content} setUpdateUI={setUpdateUI} />
          ))}
        </S.StyledMasonry>
      </S.MasonryWrapper>
    </S.Container>
  );
};

export default Community;

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
  Container: styled.div`
    position: relative;
    background-color: var(--indigo03);
    display: flex;
    flex-direction: column;
    gap: 36px;
    padding-bottom: 154px;
    @media ${device.mobile} {
      padding-bottom: 180px;
    }
  `,

  Form: styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 70px;
    right: 0;
    padding: 20px 5%;
    background-color: var(--indigo04);
    gap: 8px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    z-index: 190;
    @media ${device.mobile} {
      padding: 14px 3%;
      top: 100px;
    }
  `,

  FormHeader: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `,

  ProfileImage: styled.img`
    cursor: pointer;
    width: 50px;
    border-radius: 50%;
    margin-right: 6px;
  `,

  NameInput: styled.input`
    ${Input}
    width: 150px;
    height: 40px;
  `,

  PasswordInput: styled.input`
    ${Input}
    height: 40px;
    width: 150px;
  `,

  Description: styled.p`
    font-size: 14px;
    color: var(--gray02);
  `,

  TextInputWrapper: styled.div`
    display: flex;
    gap: 10px;
    height: 60px;
  `,

  TextInput: styled.textarea`
    ${Input}
    width: 100%;
    outline: none;
  `,

  SubmitButton: styled.button`
    background-color: var(--indigo07);
    border: 1px solid var(--indigo03);
    padding: 10px;
    color: var(--gray03);
    font-weight: 600;
    font-size: 15px;
    border-radius: 5px;
    width: 60px;
  `,

  GuestBookList: styled.ul`
    background-color: var(--indigo07);
    display: grid;
    grid-template-columns: repeat(2, 50%);
    gap: 10px;
    padding: 10px;
    border-radius: 5px;
    padding: 220px 5% 60px;
  `,

  MasonryWrapper: styled.div`
    padding: 50px 5%;
    background-color: var(--indigo07);
    height: fit-content;
    position: relative;
    top: 160px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    @media ${device.mobile} {
      top: 190px;
      padding: 30px 3%;
    }
  `,

  StyledMasonry: styled(MasonryGrid)``,
};
