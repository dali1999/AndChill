import { TPeopleDetailsFetchRes } from '@api/people/people-request.type';
import displayIcon from '@assets/icons/display.svg';
import { IMAGE_SIZE } from '@constants/image-size';
import { getImage } from '@utils/get-image';
import styled from 'styled-components';

interface TPeopleInfoProps {
  data: TPeopleDetailsFetchRes;
}

const PeopleInfo = ({ data }: TPeopleInfoProps) => {
  const { id, biography, birthday, deathday, homepage, known_for_department, name, profile_path } = data;
  const profileImageURL = getImage(IMAGE_SIZE.profile_sizes.size03, profile_path);

  return (
    <S.Container>
      <S.ChildContainer>
        <S.ProfileImageWrapper>
          <S.ProfileImage src={profileImageURL} alt="프로필 이미지" />
          {homepage && (
            <S.HomepageLink href={homepage} target="_blank">
              <img src={displayIcon} alt="홈페이지 이동 아이콘" />
            </S.HomepageLink>
          )}
        </S.ProfileImageWrapper>
        <S.InfoWrapper>
          <S.NameWrapper>
            <S.Name>{name}</S.Name>
            <S.Department>{known_for_department}</S.Department>
          </S.NameWrapper>
          <S.VitalRecord>
            {birthday} ~ {deathday}
          </S.VitalRecord>

          <S.BiographyWrapper>
            {!biography ? <S.NoBiographyText>개요가 없습니다</S.NoBiographyText> : <p>{biography}</p>}
          </S.BiographyWrapper>
        </S.InfoWrapper>
      </S.ChildContainer>
    </S.Container>
  );
};

export default PeopleInfo;

const S = {
  Container: styled.section`
    display: flex;
    justify-content: center;
  `,

  ChildContainer: styled.section`
    display: flex;
    gap: 30px;
    width: 100%;
    max-width: 800px;
  `,

  ProfileImageWrapper: styled.div`
    background-color: var(--indigo02);
    width: 140px;
    height: 210px;
    border-radius: 8px;
    position: relative;
  `,

  ProfileImage: styled.img`
    border-radius: 6px;
    width: 140px;
  `,

  HomepageLink: styled.a`
    position: absolute;
    border-radius: 40px;
    border: 2px solid var(--indigo04);
    background-color: var(--indigo06);
    padding: 6px;
    left: 10px;
    top: 10px;
    img {
      width: 17px;
      height: 17px;
    }
    &:hover {
      background-color: var(--indigo04);
    }
    &:hover img {
      opacity: 0.8;
    }
  `,

  InfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,

  NameWrapper: styled.div`
    display: flex;
    align-items: end;
    gap: 10px;
  `,

  Name: styled.h1`
    font-size: 32px;
  `,

  Department: styled.p`
    color: var(--gray01);
    padding-bottom: 4px;
    font-size: 18px;
  `,

  VitalRecord: styled.p`
    font-size: 14px;
    color: var(--gray01);
    padding-top: 6px;
  `,

  BiographyWrapper: styled.div`
    padding-top: 16px;
    font-weight: 100;
    font-size: 15px;
    line-height: 22px;
  `,

  NoBiographyText: styled.p`
    color: var(--gray01);
  `,
};
