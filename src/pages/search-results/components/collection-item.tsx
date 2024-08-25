import { TCollectionSearchItem } from '@api/movie-search/movie-search-request.type';
import { IMAGE_SIZE } from '@constants/image-size';
import { device } from '@styles/breakpoints';
import { getImage } from '@utils/get-image';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface TCollectionItemProps {
  data: TCollectionSearchItem;
}

const CollectionItem = ({ data }: TCollectionItemProps) => {
  const navigate = useNavigate();
  const profileImgURL = getImage(IMAGE_SIZE.profile_sizes.size02, data.poster_path);

  return (
    <S.Container onClick={() => navigate(`/movie-collections/${data.id}`)}>
      {data.poster_path ? (
        <S.CollectionImgageWrapper>
          <S.CollectionImage src={profileImgURL} alt="컬렉션 포스터 이미지" />
        </S.CollectionImgageWrapper>
      ) : (
        <S.DummyImgageWrapper>
          <S.DummyImage src={'/andchill-favicon.svg'} alt="기본 포스터 이미지" />
        </S.DummyImgageWrapper>
      )}
      <S.CollectionInfo>
        <S.Name>{data.name}</S.Name>
        <S.Overview>{data.overview}</S.Overview>
      </S.CollectionInfo>
    </S.Container>
  );
};

export default CollectionItem;
const S = {
  Container: styled.div`
    width: 350px;
    border-radius: 5px;
    display: flex;
    overflow: hidden;
    cursor: pointer;
    transition: 0.1s ease-in;
    background-color: var(--indigo02);
    &:hover {
      background-color: var(--indigo03);
    }
    @media ${device.mobile} {
      width: 100%;
    }
  `,

  CollectionImgageWrapper: styled.div`
    border-radius: 5px;
  `,

  CollectionImage: styled.img`
    width: 120px;
    height: 180px;
    border-radius: 5px;
    @media ${device.mobile} {
      width: 100px;
      height: calc(100px * 3 / 2);
    }
  `,

  DummyImgageWrapper: styled.div`
    width: 120px;
    height: 180px;
    border-radius: 5px;
    background-color: var(--indigo04);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0px 3px 13px rgba(0, 0, 0, 0.3);
    @media ${device.mobile} {
      width: 128px;
      height: calc(100px * 3 / 2);
    }
  `,

  DummyImage: styled.img`
    opacity: 0.3;
    width: 40px;
    height: 31px;
  `,

  CollectionInfo: styled.div`
    padding: 18px 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media ${device.mobile} {
      padding: 14px;
      margin-bottom: 20px;
    }
  `,

  Name: styled.p`
    font-size: 15px;
    margin-bottom: 12px;
  `,

  Overview: styled.p`
    font-size: 14px;
    font-weight: 100;
    color: var(--gray02);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};
