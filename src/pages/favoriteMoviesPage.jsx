import React, { useContext, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";


const FavoriteMoviesPage = () => {
  const {favorites: movieIds } = useContext(MoviesContext);
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [releaseYearFilter, setReleaseYearFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [ratingFilter, setRatingFilter] = useState("0");

  const favoriteMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      }
    })
  });
  
  const isPending = favoriteMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "releaseYear") setReleaseYearFilter(value);
    else if (type === "sort") setSortOption(value);
    else if (type === "rating") setRatingFilter(value);
    else console.log("Invalid type", type);
  };

  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      const nameMatch = nameFilter ? m.title && typeof m.title === 'string' && m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1 : true;
      const genreMatch = genreId > 0 ? m.genre_ids && m.genre_ids.includes(genreId) : true;
      const releaseYearMatch = releaseYearFilter ? m.release_date && m.release_date.substring(0, 4).includes(releaseYearFilter) : true;
      const ratingMatch = ratingFilter ? m.vote_average && m.vote_average >= Number(ratingFilter) : true;
      return m && nameMatch && genreMatch && releaseYearMatch && ratingMatch;
    })
    .filter((m) => m && (ratingFilter > 0 ? m.vote_average && m.vote_average >= ratingFilter : true))
    .sort((a, b) => {
      if (!sortOption) return 0;

      const [key, order] = sortOption.split('.');
      let valA = a[key];
      let valB = b[key];

      if (key === 'title') {
        valA = valA ? valA.toLowerCase() : '';
        valB = valB ? valB.toLowerCase() : '';
      }

      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={displayedMovies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
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

export default FavoriteMoviesPage;
