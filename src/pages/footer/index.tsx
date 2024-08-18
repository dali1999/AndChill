import githubLogo from '@assets/icons/github.svg';
import styled from 'styled-components';

const Footer = () => {
  return (
    <S.Container>
      <S.LinkWrapper>
        <a
          href="https://velog.io/@dali1999/series/And-Chill-%EA%B0%9C%EC%9D%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B0%9C%EB%B0%9C-%EC%9D%BC%EC%A7%80"
          target="_blank"
        >
          Blog
        </a>
        <S.GitHubLink href="https://github.com/dali1999/AndChill" target="_blank">
          <img src={githubLogo} alt="깃허브 로고" />
          GitHub
        </S.GitHubLink>
      </S.LinkWrapper>

      <S.FooterContent>
        <span>
          email:{' '}
          <S.EmailLink target="_blank" href="mailto:gnagstar@gmail.com">
            gnagstar@gmail.com
          </S.EmailLink>
        </span>
        <span>Copyright 2024. dali1999. All Right Reserved.</span>
      </S.FooterContent>
    </S.Container>
  );
};

export default Footer;

const S = {
  Container: styled.footer`
    z-index: 100;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 260px;
    border-top: 1px solid var(--dark03);
    background-color: var(--indigo01);
    padding: 0 5%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    font-weight: 100;
    font-size: 15px;
    color: var(--gray02);

    a {
      transition: opacity 0.1s ease-in;
      &:hover {
        opacity: 0.8;
      }
    }
  `,

  LinkWrapper: styled.div`
    margin-bottom: 20px;
    display: flex;
    font-size: 17px;
    a:first-child {
      &::after {
        content: '';
        border: 1px solid #898989;
        margin: 0 30px;
        border-radius: 1px;
      }
    }
  `,

  GitHubLink: styled.a`
    display: flex;
    align-items: center;
    img {
      width: 18px;
      height: 18px;
      margin-right: 6px;
      opacity: 0.6;
    }
  `,

  FooterContent: styled.p`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,

  EmailLink: styled.a`
    margin-left: 6px;
  `,
};
