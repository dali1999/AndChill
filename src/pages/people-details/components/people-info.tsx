import { TPeopleDetailsFetchRes } from '@api/people/people-request.type';
import displayIcon from '@assets/icons/display.svg';
import { IMAGE_SIZE } from '@constants/image-size';
import { device } from '@styles/breakpoints';
import { getImage } from '@utils/get-image';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface TPeopleInfoProps {
  data: TPeopleDetailsFetchRes;
  lang: string;
}

const PeopleInfo = ({ data, lang }: TPeopleInfoProps) => {
  const { t } = useTranslation();
  const { biography, birthday, deathday, homepage, known_for_department, name, profile_path } = data;
  const profileImageURL = getImage(IMAGE_SIZE.profile_sizes.size03, profile_path);
  return (
    <S.Container>
      <S.ChildContainer>
        <S.ProfileImageWrapper>
          {profile_path ? (
            <S.ProfileImage src={profileImageURL} alt="프로필 이미지" />
          ) : (
            <S.DummyImageWraper>
              <S.DummyImage src={'/andchill-favicon.svg'} alt="기본 프로필 이미지" />
            </S.DummyImageWraper>
          )}
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
            {birthday && `${birthday} ~ `}
            {deathday}
          </S.VitalRecord>

          <S.BiographyWrapper>
            {!biography ? (
              <S.NoBiographyText>{t('people_details.no_biography', { lang })}</S.NoBiographyText>
            ) : (
              <p>{biography}</p>
            )}
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
    padding: 30px 0;
    background-color: var(--indigo02);
    @media ${device.mobile} {
      padding: 18px 0;
    }
  `,

  ChildContainer: styled.section`
    display: flex;
    margin: 0 5%;
    gap: 30px;
    width: 100%;
    max-width: 1000px;
    @media ${device.mobile} {
      flex-direction: column;
      margin: 0 4%;
      gap: 24px;
    }
  `,

  ProfileImageWrapper: styled.div`
    background-color: var(--indigo03);
    width: 140px;
    height: 210px;
    border-radius: 8px;
    position: relative;
    @media ${device.mobile} {
      background-color: transparent;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,

  ProfileImage: styled.img`
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
    border-radius: 6px;
    width: 140px;
  `,

  DummyImageWraper: styled.div`
    width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  DummyImage: styled.img`
    width: 60px;
    height: 46px;
    opacity: 0.1;
  `,

  HomepageLink: styled.a`
    position: absolute;
    border-radius: 40px;
    border: 2px solid var(--indigo05);
    background-color: var(--indigo07);
    padding: 7px;
    left: 10px;
    top: 10px;
    @media ${device.mobile} {
      left: auto;
      right: 0;
      top: 0px;
    }

    img {
      width: 16px;
      height: 16px;
      opacity: 0.8;
    }
    &:hover {
      background-color: var(--indigo06);
    }
    &:hover img {
      opacity: 0.6;
    }
  `,

  InfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,

  NameWrapper: styled.div`
    display: flex;
    align-items: end;
    gap: 10px;
  `,

  Name: styled.h1`
    font-size: 32px;
    @media ${device.mobile} {
      font-size: 28px;
    }
  `,

  Department: styled.p`
    color: var(--gray01);
    padding-bottom: 4px;
    font-size: 18px;
    @media ${device.mobile} {
      font-size: 15px;
    }
  `,

  VitalRecord: styled.p`
    font-size: 14px;
    color: var(--gray01);
    padding-top: 6px;
  `,

  BiographyWrapper: styled.div`
    margin-top: 15px;
    padding: 10px 16px;
    font-weight: 100;
    font-size: 15px;
    line-height: 22px;
    background-color: var(--indigo04);
    border-radius: 8px;
    width: 100%;
    text-align: justify;
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    @media ${device.mobile} {
      font-size: 13px;
      padding: 8px 12px;
      border-radius: 6px;
    }
  `,

  NoBiographyText: styled.p`
    color: var(--indigo08);
    font-weight: 700;
    width: 100%;
    text-align: center;
    padding: 20px 0;
  `,
};
