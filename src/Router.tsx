import { Suspense } from 'react';
import * as Page from '@pages/index';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

const LoadingFallback = () => <S.Container>Loading...</S.Container>;

const Router = () => {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Suspense fallback={<LoadingFallback />}>
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
      </HelmetProvider>
    </BrowserRouter>
  );
};

export default Router;

const S = {
  Container: styled.div`
    box-sizing: border-box;
    background-color: #07080f;
    padding: 0;
    margin: 0;
    height: 100vh;
  `,
};
