import { TCollectionSearchItem } from '@api/movie-search/movie-search-request.type';
import { IMAGE_SIZE } from '@constants/image-size';
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
          <S.CollectionImage src={profileImgURL} />
        </S.CollectionImgageWrapper>
      ) : (
        <S.DummyImgageWrapper>
          <S.DummyImage src={'/andchill-favicon.svg'} />
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
    gap: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: 0.1s ease-in;
    background-color: var(--indigo02);
    padding-right: 18px;
    &:hover {
      background-color: var(--indigo03);
    }
  `,

  CollectionImgageWrapper: styled.div`
    border-radius: 5px;
  `,

  CollectionImage: styled.img`
    width: 120px;
    height: 180px;
    border-radius: 5px;
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
  `,

  DummyImage: styled.img`
    opacity: 0.3;
    width: 40px;
    height: 31px;
  `,

  CollectionInfo: styled.div`
    padding: 20px 0;
    width: 196px;
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
