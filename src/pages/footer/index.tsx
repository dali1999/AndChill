import styled from 'styled-components';

const Footer = () => {
  return <S.Container></S.Container>;
};

export default Footer;

const S = {
  Container: styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 300px;
    /* background-color: black; */
    border-top: 1px solid var(--dark03);
  `,
};