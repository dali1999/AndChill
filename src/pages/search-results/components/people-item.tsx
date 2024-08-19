import { TPeopleSearchItem } from '@api/movie-search/movie-search-request.type';
import { IMAGE_SIZE } from '@constants/image-size';
import { getImage } from '@utils/get-image';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface TPeopleItemProps {
  data: TPeopleSearchItem;
}

const PeopleItem = ({ data }: TPeopleItemProps) => {
  const navigate = useNavigate();
  return (
    <S.Container onClick={() => navigate(`/people-details/${data.id}`)}>
      {data.profile_path ? (
        <S.ProfileImageWrapper>
          <S.ProfileImage src={getImage(IMAGE_SIZE.profile_sizes.size02, data.profile_path)} alt="사람 프로필 이미지" />
        </S.ProfileImageWrapper>
      ) : (
        <S.DummyImageWrapper>
          <S.DummyImage src="/andchill-favicon.svg" alt="사람 기본 프로필 이미지" />
        </S.DummyImageWrapper>
      )}
      <S.PeopleInfo>
        <p>{data.name}</p>
        <p>{data.known_for_department}</p>
      </S.PeopleInfo>
    </S.Container>
  );
};

export default PeopleItem;

const S = {
  Container: styled.li`
    border-radius: 34px 16px 16px 34px;
    width: 230px;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 110px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  `,

  ProfileImageWrapper: styled.div`
    border-radius: 40px;
    overflow: hidden;
  `,

  ProfileImage: styled.img`
    width: 70px;
    height: 110px;
    transition: transform 0.2s ease-in;
  `,

  DummyImageWrapper: styled.div`
    border-radius: 40px;
    width: 70px;
    height: 110px;
    background-color: var(--indigo04);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0px 3px 16px rgba(0, 0, 0, 0.5);
    overflow: hidden;
  `,

  DummyImage: styled.img`
    transition: transform 0.2s ease-in;
    opacity: 0.3;
    width: 40px;
    height: 31px;
  `,

  PeopleInfo: styled.div`
    width: 140px;
    & p:nth-child(1) {
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 4px;
    }
    & p:nth-child(2) {
      font-size: 14px;
      font-weight: 100;
      color: var(--gray01);
    }
  `,
};
