import React, { useContext } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { MoviesContext } from "../contexts/movieContext";

const HomePage = (props) => {

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['discover'],
    queryFn: getMovies,
  })
  
  const { favorites: favoriteMovieIds } = useContext(MoviesContext);

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  
  const movies = data.results.map((m) => ({
    ...m,
    favorite: favoriteMovieIds.includes(m.id),
  }));

  return (
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
  );
};

export default HomePage;
