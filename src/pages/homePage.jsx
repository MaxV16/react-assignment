import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';


const HomePage = (props) => {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [releaseYearFilter, setReleaseYearFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "releaseYear") setReleaseYearFilter(value);
    else if (type === "sort") setSortOption(value);
    else if (type === "rating") setRatingFilter(value);
    else setGenreFilter(value);
  };

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['discover'],
    queryFn: getMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => m && m.title && m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1)
    .filter((m) => m && (genreId > 0 ? m.genre_ids && m.genre_ids.includes(genreId) : true))
    .filter((m) => m && m.release_date && m.release_date.substring(0, 4).includes(releaseYearFilter));


  return (
    <PageTemplate
      title="Discover Movies"
      movies={displayedMovies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
      onUserInput={handleChange}
      nameFilter={nameFilter}
      genreFilter={genreFilter}
      releaseYearFilter={releaseYearFilter}
      sortOption={sortOption}
      ratingFilter={ratingFilter}
    />
  );
};

export default HomePage;
