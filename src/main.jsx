import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import "./App.css";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import MoviesContextProvider from "./contexts/moviesContext";
import PlaylistContextProvider from "./contexts/playlistContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import TrendingWeekPage from "./pages/trendingWeekPage";
import TrendingTodayPage from "./pages/trendingTodayPage.jsx";
import PopularMoviesPage from "./pages/popularMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMovies";
import TopRatedMoviesPage from "./pages/topRatedMovies";
import ActorDetailsPage from "./pages/actorDetailsPage";
import PlaylistMoviesPage from "./pages/playlistMoviesPage";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <PlaylistContextProvider>
            <Routes>
              <Route path="/movie/popular" element={<PopularMoviesPage />} />
              <Route path="/movies/top_rated" element={<TopRatedMoviesPage />} />
              <Route path="/movies/trending/today" element={<TrendingTodayPage />} />
              <Route path="/movies/trending/week" element={<TrendingWeekPage />} />
              <Route path="/movies/now_playing" element={<NowPlayingMoviesPage />} />
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/movies/playlist" element={<PlaylistMoviesPage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/actors/:id" element={<ActorDetailsPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </PlaylistContextProvider>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);
