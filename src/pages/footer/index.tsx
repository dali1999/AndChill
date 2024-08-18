import githubLogo from '@assets/icons/github.svg';
import styled from 'styled-components';

const Footer = () => {
  return (
    <S.Container>
      <S.GitHubLink href="https://github.com/dali1999/AndChill" target="_blank">
        <img src={githubLogo} alt="깃허브 로고" />
        <p>GitHub Link</p>
      </S.GitHubLink>
      <a target="_blank" href="mailto:gnagstar@gmail.com">
        제목과 수신자 미리 기재
      </a>
    </S.Container>
  );
};

export default Footer;

const S = {
  Container: styled.div`
    z-index: 100;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 300px;
    border-top: 1px solid var(--dark03);
    background-color: var(--indigo01);

    display: flex;
    justify-content: center;
    align-items: center;
  `,

  GitHubLink: styled.a`
    display: flex;
    border: 1px solid red;
    img {
      width: 20px;
      height: 20px;
      color: white;
      margin-right: 10px;
    }
  `,
};
