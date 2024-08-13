import githubLogo from '@assets/icons/github.svg';
import styled from 'styled-components';

const Footer = () => {
  return (
    <S.Container>
      <img src={githubLogo} alt="깃허브 로고" />
      <a href="https://github.com/dali1999/AndChill" target="_blank">
        GitHub Link
      </a>
    </S.Container>
  );
};

export default Footer;

const S = {
  Container: styled.div`
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

    img {
      width: 20px;
      height: 20px;
      color: white;
      margin-right: 10px;
    }
  `,
};
