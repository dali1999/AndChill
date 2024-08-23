import { useState } from 'react';
import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import { useMovieDiscoverResultsQuery } from '@hooks/react-query/use-query-discover';
import MovieItem from '@pages/home/components/movie-list/movie-item';
import { useRegionStore } from '@stores/region';
import { getLanguageByCountry } from '@utils/get-region-language';
import styled from 'styled-components';
import GenreSelect from './components/genre-select';
import RegionSelect from './components/region-select';
import SortSelect from './components/sort-select';
import { SORT_INFO } from './constants/sort-info';

const Discover = () => {
  const lang = useRegionStore((state) => state.language);
  const [page, setPage] = useState(1);

  // 국가
  const [selectedRegionTemp, setSelectedRegionTemp] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(selectedRegionTemp);
  const [selectedRegionName, setSelectedRegionName] = useState('');

  // 장르
  const [selectedGenreIdTemp, setSelectedGenreIdTemp] = useState<number[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number[]>(selectedGenreIdTemp);
  const [selectedGenreName, setSelectedGenreName] = useState<string[]>([]);

  // 정렬
  const [selectedSortTemp, setSelectedSortTemp] = useState(SORT_INFO[0].queryStr);
  const [selectedSort, setSelectedSort] = useState(selectedSortTemp);
  const [selectedSortName, setSelectedSortName] = useState(SORT_INFO[0].title);

  const { data: discoveredMoiveData, isFetching: isDiscoveredMoiveLoading } = useMovieDiscoverResultsQuery(
    lang,
    selectedSort,
    selectedGenreId.join(','),
    page,
    getLanguageByCountry(selectedRegion, lang),
  );

  const handleSearch = () => {
    setSelectedRegion(selectedRegionTemp);
    setSelectedGenreId(selectedGenreIdTemp);
    setSelectedSort(selectedSortTemp);
  };

  const handleClickPrev = () => {
    window.scrollTo(0, 0);
    if (page > 1) setPage(page - 1);
  };
  const handleClickNext = () => {
    window.scrollTo(0, 0);
    setPage(page + 1);
  };

  return (
    <S.Container>
      <S.SelectSectionWrapper>
        <RegionSelect
          lang={lang}
          selectedRegion={selectedRegionTemp}
          setSelectedRegion={setSelectedRegionTemp}
          setSelectedRegionName={setSelectedRegionName}
        />
        <GenreSelect
          lang={lang}
          selectedGenreId={selectedGenreIdTemp}
          setSelectedGenreId={setSelectedGenreIdTemp}
          selectedGenreName={selectedGenreName}
          setSelectedGenreName={setSelectedGenreName}
        />
        <SortSelect
          selectedSort={selectedSortTemp}
          setSelectedSort={setSelectedSortTemp}
          setSelectedSortName={setSelectedSortName}
        />
      </S.SelectSectionWrapper>

      <S.DiscoverButton onClick={handleSearch}>
        <S.GenreSummary>{selectedRegionName && `${selectedRegionName}의`}</S.GenreSummary>
        &nbsp;
        <S.GenreSummary>{selectedGenreName.length === 0 ? '모든' : selectedGenreName.join(' • ')}</S.GenreSummary>
        &nbsp;장르의 영화들을&nbsp;
        <S.SortSummary>{selectedSortName}</S.SortSummary>&nbsp;으로 탐색
      </S.DiscoverButton>

      {isDiscoveredMoiveLoading ? (
        <MovieListSkeleton height={360} />
      ) : discoveredMoiveData?.total_results === 0 ? (
        <MovieListSkeleton text={'탐색 결과가 없습니다'} height={360} />
      ) : (
        <S.DiscoveredListWrapper>
          {discoveredMoiveData && (
            <S.DiscoveredList>
              {discoveredMoiveData?.results.map((movie) => <MovieItem key={movie.id} data={movie} />)}
            </S.DiscoveredList>
          )}
        </S.DiscoveredListWrapper>
      )}

      <S.PagenationButtonWrapper $page={page}>
        <button onClick={handleClickPrev} disabled={page === 1 && true}>
          이전
        </button>
        <button onClick={handleClickNext}>다음</button>
      </S.PagenationButtonWrapper>
    </S.Container>
  );
};

export default Discover;

const S = {
  Container: styled.div`
    background-color: var(--dark09);
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,

  SelectSectionWrapper: styled.div`
    background-color: var(--indigo02);
    padding: 20px 5%;
    display: flex;
    flex-direction: column;
    gap: 18px;
  `,

  DiscoveredListWrapper: styled.div`
    padding: 40px 5%;
  `,

  DiscoverButton: styled.button`
    background-color: var(--indigo04);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 5% 26px;
    font-size: 16px;
    color: var(--gray02);
    transition: 0.1s ease-in;
    span {
      padding-bottom: 3px;
      font-size: 20px;
      color: var(--yellow02);
      font-weight: 900;
    }
    &:hover {
      background-color: var(--indigo03);
    }
  `,

  GenreSummary: styled.span``,

  SortSummary: styled.span``,

  Title: styled.h2`
    margin: 60px 0 30px;
  `,

  DiscoveredList: styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 30px 20px;
    flex-wrap: wrap;
    width: 100%;
  `,

  PagenationButtonWrapper: styled.span<{ $page?: number }>`
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
    gap: 20px;

    button {
      background-color: var(--indigo04);
      border-radius: 4px;
      padding: 8px 14px;
      font-weight: 700;
      font-size: 16px;
      cursor: pointe;
    }

    & button:first-child {
      cursor: ${({ $page }) => ($page === 1 ? 'default' : 'pointer')};
      opacity: ${({ $page }) => $page === 1 && 0.4};
    }
  `,
};
