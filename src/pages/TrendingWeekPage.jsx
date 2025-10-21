import React from "react";
import { getTrendingWeek } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

const TrendingWeekPage = (props) => {

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['trendingWeek'],
    queryFn: getTrendingWeek,
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
        title="Trending This Week"
        movies={movies}
        action={(movie) => null}
      />
  );
};

export default TrendingWeekPage;