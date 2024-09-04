import styled from 'styled-components';
import SharedMovie from '../components/shared-movie';

export const formatContentWithLinks = (content: string) => {
  const baseUrl = 'https://andchill.netlify.app/movie-details/';
  const urlRegex = new RegExp(`(${baseUrl}[-A-Z0-9+&@#/%?=~_|!:,.;]*)`, 'gi');

  // Initialize arrays to hold text parts and movie components
  const parts: JSX.Element[] = [];
  const movies: JSX.Element[] = [];

  content.split(urlRegex).forEach((part, idx) => {
    if (part.match(urlRegex)) {
      const id = part.replace(baseUrl, '');
      movies.push(
        <S.Container key={idx}>
          <SharedMovie id={id} />
        </S.Container>,
      );
    } else if (part.trim()) {
      parts.unshift(<span key={idx}>{part}</span>);
    }
  });

  if (movies.length > 0) {
    parts.push(<S.MoviesWrapper key="movies-wrapper">{movies}</S.MoviesWrapper>);
  }

  return parts;
};

const S = {
  Container: styled.div`
    display: flex;
  `,
  MoviesWrapper: styled.div`
    display: flex;
    gap: 14px;
    margin-top: 10px;
    overflow-x: auto;
  `,
};
