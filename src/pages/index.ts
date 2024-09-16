import { lazy } from 'react';

const Root = lazy(() => import('@pages/Root'));
const Home = lazy(() => import('@pages/home'));
const MovieDetails = lazy(() => import('@pages/movie-details'));
const PeopleDetails = lazy(() => import('@pages/people-details'));
const MovieCollection = lazy(() => import('@pages/movie-collection'));
const SearchResults = lazy(() => import('@pages/search-results'));
const RandomMovie = lazy(() => import('@pages/random-movie'));
const Discover = lazy(() => import('@pages/discover'));
const Community = lazy(() => import('@pages/community'));

export { Root, Home, MovieDetails, SearchResults, MovieCollection, RandomMovie, PeopleDetails, Discover, Community };
