import React, { useState } from "react";
import { getTrendingToday } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

const TrendingTodayPage = (props) => {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [releaseYearFilter, setReleaseYearFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

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

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "releaseYear") setReleaseYearFilter(value);
    else if (type === "sort") setSortOption(value);
    else if (type === "rating") setRatingFilter(value);
  };

  return (
      <PageTemplate
        title="Trending Today"
        movies={movies}
        action={(movie) => null}
        onUserInput={handleChange}
        nameFilter={nameFilter}
        genreFilter={genreFilter}
        releaseYearFilter={releaseYearFilter}
        sortOption={sortOption}
        ratingFilter={ratingFilter}
      />
  );
};

export default TrendingTodayPage;