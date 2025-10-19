import React from "react";
import { getTrendingToday } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

const TrendingTodayPage = (props) => {

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['trendingToday'],
    queryFn: getTrendingToday,
  })

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const movies = data.results;

  return (
      <PageTemplate
        title="Trending Today"
        movies={movies}
        action={(movie) => null}
      />
  );
};

export default TrendingTodayPage;