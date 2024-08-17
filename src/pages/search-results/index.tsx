import { useMovieSearchResultsQuery } from '@hooks/react-query/use-query-movie-search';
import { useRegionStore } from '@stores/region';
import { useParams } from 'react-router-dom';

const SearchResults = () => {
  const { searchQuery } = useParams() as { searchQuery: string };
  const lang = useRegionStore((state) => state.language);

  const { data: searchResultsData, isFetching: isSearchResultsLoading } = useMovieSearchResultsQuery(searchQuery, lang);
  console.log(searchResultsData);

  return <div>검색 결과 : {searchQuery}</div>;
};

export default SearchResults;
