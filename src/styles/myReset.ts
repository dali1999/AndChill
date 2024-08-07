import { css } from 'styled-components';

const myReset = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: inherit;
    font-family:
      Pretendard,
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      Roboto,
      'Helvetica Neue',
      'Segoe UI',
      'Apple SD Gothic Neo',
      'Noto Sans KR',
      'Malgun Gothic',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      sans-serif;
  }

  html,
  body {
    overflow-x: hidden;
  }

  body {
    font-weight: 400;
    position: relative;
    background-color: #101322;
    color: white;
    height: 100%;
    padding: 0 5%;
  }

  ol,
  ul,
  li {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family:
      Pretendard,
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      Roboto,
      'Helvetica Neue',
      'Segoe UI',
      'Apple SD Gothic Neo',
      'Noto Sans KR',
      'Malgun Gothic',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      sans-serif;
    border: 0;
    background: none;
    cursor: pointer;
  }

  input {
    outline: 0;
    border: 0;
  }

  fieldset {
    border: 0;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

export default myReset;
