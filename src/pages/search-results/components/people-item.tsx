import { TPeopleSearchItem } from '@api/movie-search/movie-search-request.type';
import { IMAGE_SIZE } from '@constants/image-size';
import { getImage } from '@utils/get-image';
import styled from 'styled-components';

interface TPeopleItemProps {
  data: TPeopleSearchItem;
}

//     adult: false;
//     gender: number;
//     id: number;
//     known_for_department: string;
//     name: string;
//     original_name: string;
//     popularity: number;
//     profile_path: string;
//     known_for: TMovieListsItem[];

const PeopleItem = ({ data }: TPeopleItemProps) => {
  return (
    <S.Container>
      {data.profile_path ? (
        <S.ProfileImage src={getImage(IMAGE_SIZE.profile_sizes.size02, data.profile_path)} alt="사람 프로필 이미지" />
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
    width: 230px;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 110px;
    cursor: pointer;
  `,

  ProfileImage: styled.img`
    border-radius: 40px;
    width: 70px;
    height: 110px;
  `,

  DummyImageWrapper: styled.div`
    border-radius: 40px;
    width: 70px;
    height: 110px;
    background-color: var(--indigo04);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0px 3px 13px rgba(0, 0, 0, 0.3);
  `,

  DummyImage: styled.img`
    opacity: 0.3;
    width: 40px;
    height: 31px;
  `,

  PeopleInfo: styled.div`
    width: 100px;

    & p:nth-child(1) {
      font-size: 16px;
      font-weight: 100;
    }
    & p:nth-child(2) {
      font-size: 12px;
      font-weight: 100;
      color: var(--gray01);
    }
  `,
};
