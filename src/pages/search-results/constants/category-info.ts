import collectionIcon from '@assets/icons/search-results-button/button-collection.svg';
import movieIcon from '@assets/icons/search-results-button/button-movies.svg';
import peopleIcon from '@assets/icons/search-results-button/button-people.svg';
import collectionColorIcon from '@assets/icons/search-results-button/button-yellow-collection.svg';
import movieColorIcon from '@assets/icons/search-results-button/button-yellow-movies.svg';
import peopleColorIcon from '@assets/icons/search-results-button/button-yellow-people.svg';

export const CATEGORY_INFO: TCategoryInfo[] = [
  {
    title: 'movies',
    defaultIcon: movieIcon,
    selectedIcon: movieColorIcon,
  },
  {
    title: 'collections',
    defaultIcon: collectionIcon,
    selectedIcon: collectionColorIcon,
  },
  {
    title: 'people',
    defaultIcon: peopleIcon,
    selectedIcon: peopleColorIcon,
  },
];

interface TCategoryInfo {
  title: 'movies' | 'collections' | 'people';
  defaultIcon: string;
  selectedIcon: string;
}
