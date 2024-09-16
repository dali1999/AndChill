import { useEffect, useRef, useState } from 'react';
import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import { useMovieDiscoverResultsInfiniteQuery } from '@hooks/react-query/use-query-discover';
import MovieItem from '@pages/home/components/movie-list/movie-item';
import MetaTag from '@pages/SEOMetaTag';
import { useRegionStore } from '@stores/region';
import { device } from '@styles/breakpoints';
import { getLanguageByCountry } from '@utils/get-region-language';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import GenreSelect from './components/genre-select';
import RegionSelect from './components/region-select';
import SortSelect from './components/sort-select';
import { SORT_INFO } from './constants/sort-info';

const Discover = () => {
  const { t } = useTranslation();
  const lang = useRegionStore((state) => state.language);

  // 국가
  const [selectedRegionTemp, setSelectedRegionTemp] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(selectedRegionTemp);
  // 장르
  const [selectedGenreIdTemp, setSelectedGenreIdTemp] = useState<number[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number[]>(selectedGenreIdTemp);
  // 정렬
  const [selectedSortTemp, setSelectedSortTemp] = useState(SORT_INFO[0].queryStr);
  const [selectedSort, setSelectedSort] = useState(selectedSortTemp);

  const {
    data: discoveredMovieData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    refetch,
  } = useMovieDiscoverResultsInfiniteQuery(
    lang,
    selectedSort,
    selectedGenreId.join(','),
    getLanguageByCountry(selectedRegion, lang),
  );

  // IntersectionObserver를 사용해 무한 스크롤 구현
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasNextPage, fetchNextPage]);

  const handleSearch = () => {
    setSelectedRegion(selectedRegionTemp);
    setSelectedGenreId(selectedGenreIdTemp);
    setSelectedSort(selectedSortTemp);
  };

  useEffect(() => {
    refetch();
    setSelectedRegionTemp('');
    setSelectedGenreIdTemp([]);
    setSelectedSortTemp(SORT_INFO[0].queryStr);
    setSelectedSort(SORT_INFO[0].queryStr);
  }, [lang]);

  return (
    <>
      <MetaTag
        title="Andchil - 영화 탐색"
        description="국가, 장르 별 영화들을 원하는 정렬 방식에 따라 탐색해 보세요."
      />
      <S.Container>
        <S.SelectSectionWrapper>
          <RegionSelect lang={lang} selectedRegion={selectedRegionTemp} setSelectedRegion={setSelectedRegionTemp} />
          <GenreSelect lang={lang} selectedGenreId={selectedGenreIdTemp} setSelectedGenreId={setSelectedGenreIdTemp} />
          <SortSelect selectedSort={selectedSortTemp} setSelectedSort={setSelectedSortTemp} />
        </S.SelectSectionWrapper>

        <S.DiscoverButton onClick={handleSearch}>{t('discover.button_text')}</S.DiscoverButton>

        {isLoading ? (
          <MovieListSkeleton height={360} />
        ) : discoveredMovieData?.pages[0].total_results === 0 ? (
          <MovieListSkeleton text={t('discover.nodata')} height={360} />
        ) : (
          <S.DiscoveredListWrapper>
            <S.DiscoveredList>
              {discoveredMovieData?.pages.flatMap((page) =>
                page.results.map((movie) => <MovieItem key={movie.id} data={movie} />),
              )}
            </S.DiscoveredList>
          </S.DiscoveredListWrapper>
        )}

        <div ref={loadMoreRef} />
        {isFetchingNextPage && <MovieListSkeleton height={160} />}
      </S.Container>
    </>
  );
};

export default Discover;

const S = {
  Container: styled.div`
    background-color: var(--dark09);
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media ${device.mobile} {
      margin-top: 100px;
    }
  `,

  SelectSectionWrapper: styled.div`
    background-color: var(--indigo02);
    padding: 20px 5%;
    display: flex;
    flex-direction: column;
    gap: 18px;
    @media ${device.mobile} {
      padding: 14px 4%;
      gap: 6px;
    }
  `,

  DiscoverButton: styled.button`
    background-color: var(--indigo04);
    align-items: center;
    justify-content: center;
    padding: 28px 5%;
    font-size: 20px;
    font-weight: 600;
    color: var(--gray02);
    transition: 0.1s ease-in;
    @media ${device.mobile} {
      font-size: 16px;
      padding: 24px 4%;
    }

    &:hover {
      background-color: var(--indigo03);
    }
  `,

  Title: styled.h2`
    margin: 60px 0 30px;
  `,

  DiscoveredListWrapper: styled.div`
    padding: 40px 5% 0;

    @media ${device.mobile} {
      padding: 30px 4%;
    }
  `,

  DiscoveredList: styled.ul`
    place-items: center;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 30px 20px;
    flex-wrap: wrap;
    width: 100%;
    @media ${device.mobile} {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 20px 10px;
    }
  `,

  PagenationButtonWrapper: styled.span<{ $page?: number }>`
    display: flex;
    justify-content: center;
    margin: 40px 0 60px;
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
