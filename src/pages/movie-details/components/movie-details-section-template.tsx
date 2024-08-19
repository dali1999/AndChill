import styled from 'styled-components';

interface TMovieDetailsSectionTemplateProps {
  title: string;
  children: JSX.Element;
}
const MovieDetailsSectionTemplate = ({ title, children }: TMovieDetailsSectionTemplateProps) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      {children}
    </S.Container>
  );
};

export default MovieDetailsSectionTemplate;
const S = {
  Container: styled.div`
    padding: 0 0 50px;
  `,
  Title: styled.h2`
    font-size: 22px;
    margin-bottom: 20px;
  `,
};
