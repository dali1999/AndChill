import { Suspense } from 'react';
import * as Page from '@pages/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Page.Root />}>
            <Route index element={<Page.Home />} />
            <Route path="movie-details/:movieId" element={<Page.MovieDetails />} />
            <Route path="people-details/:peopleId" element={<Page.PeopleDetails />} />
            <Route path="movie-collections/:collectionId" element={<Page.MovieCollection />} />
            <Route path="search-results/:searchQuery" element={<Page.SearchResults />} />
            <Route path="random-movie" element={<Page.RandomMovie />} />
            <Route path="discover" element={<Page.Discover />} />
            <Route path="community" element={<Page.Community />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
