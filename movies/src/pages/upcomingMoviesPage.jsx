import React, { useContext } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import AddToMustWatchIcon from '../components/cardIcons/addToMustWatch';
import { useQuery } from '@tanstack/react-query';
import { MoviesContext } from "../contexts/movieContext";

const UpcomingMoviesPage = (props) => {
  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['upcoming'],
    queryFn: getUpcomingMovies,
  })

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={data ? data.results : []}
      action={(movie) => {
        return <AddToMustWatchIcon movie={movie} key={movie.id}/>;
      }}
      page={"upcoming"}
    />
  );
};

export default UpcomingMoviesPage;