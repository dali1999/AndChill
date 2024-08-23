import collectionIcon from '@assets/icons/search-results-button/button-collection.svg';
import movieIcon from '@assets/icons/search-results-button/button-movies.svg';
import peopleIcon from '@assets/icons/search-results-button/button-people.svg';
import collectionColorIcon from '@assets/icons/search-results-button/button-yellow-collection.svg';
import movieColorIcon from '@assets/icons/search-results-button/button-yellow-movies.svg';
import peopleColorIcon from '@assets/icons/search-results-button/button-yellow-people.svg';

export const CATEGORY_INFO: TCategoryInfo[] = [
  {
    title: 'Movies',
    defaultIcon: movieIcon,
    selectedIcon: movieColorIcon,
  },
  {
    title: 'Collections',
    defaultIcon: collectionIcon,
    selectedIcon: collectionColorIcon,
  },
  {
    title: 'People',
    defaultIcon: peopleIcon,
    selectedIcon: peopleColorIcon,
  },
];

interface TCategoryInfo {
  title: 'Movies' | 'Collections' | 'People';
  defaultIcon: string;
  selectedIcon: string;
}
