import { useState } from 'react';
import { useMovieDiscoverResultsQuery } from '@hooks/react-query/use-query-discover';
import { useGenreListQuery } from '@hooks/react-query/use-query-genre';
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
  // 국가
  const [selectedRegionTemp, setSelectedRegionTemp] = useState(lang);
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

  const { data: genreListData, isFetching: isGenreListLoading } = useGenreListQuery(lang);
  const { data: discoveredMoiveData, isFetching: isDiscoveredMoiveLoading } = useMovieDiscoverResultsQuery(
    lang,
    selectedSort,
    selectedGenreId.join(','),
    1,
    getLanguageByCountry(selectedRegion, lang),
  );

  const handleSearch = () => {
    setSelectedRegion(selectedRegionTemp);
    setSelectedGenreId(selectedGenreIdTemp);
    setSelectedSort(selectedSortTemp);
  };

  return (
    <S.Container>
      {genreListData && (
        <S.SelectSectionWrapper>
          <RegionSelect
            lang={lang}
            selectedRegion={selectedRegionTemp}
            setSelectedRegion={setSelectedRegionTemp}
            setSelectedRegionName={setSelectedRegionName}
          />
          <GenreSelect
            data={genreListData}
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
      )}

      <S.DiscoverButton onClick={handleSearch}>
        <S.GenreSummary>{selectedRegionName && `${selectedRegionName}의`}</S.GenreSummary>
        &nbsp;
        <S.GenreSummary>{selectedGenreName.length === 0 ? '모든' : selectedGenreName.join(' • ')}</S.GenreSummary>
        &nbsp;장르의 영화들을&nbsp;
        <S.SortSummary>{selectedSortName}</S.SortSummary>&nbsp;으로 탐색
      </S.DiscoverButton>

      <S.DiscoveredListWrapper>
        {discoveredMoiveData && (
          <S.DiscoveredList>
            {discoveredMoiveData?.results.map((movie) => <MovieItem key={movie.id} data={movie} />)}
          </S.DiscoveredList>
        )}
      </S.DiscoveredListWrapper>
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
    padding: 70px 5%;
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
    gap: 40px 20px;
    flex-wrap: wrap;
    width: 100%;
  `,
};
