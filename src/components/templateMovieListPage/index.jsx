import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import AddToPlaylistIcon from "../cardIcons/addToPlaylist";

function MovieListPageTemplate({ movies, title, action, onUserInput, nameFilter, genreFilter, releaseYearFilter, sortOption, ratingFilter }) {
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      const nameMatch = nameFilter ? m.title && typeof m.title === 'string' && m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1 : true;
      const genreMatch = genreId > 0 ? m.genre_ids && m.genre_ids.includes(genreId) : true;
      const releaseYearMatch = releaseYearFilter ? m.release_date && m.release_date.substring(0, 4).includes(releaseYearFilter) : true;
      const ratingMatch = ratingFilter ? m.vote_average && m.vote_average >= Number(ratingFilter) : true;
      return m && nameMatch && genreMatch && releaseYearMatch && ratingMatch;
    })
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
    <Grid container style={{ backgroundColor: '#303030', color: '#e0e0e0' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px", padding: "20px", flexDirection: 'column' }}>
        <Grid
          item
          xs={12}
          key="find"
          sx={{ padding: "10px" }}
        >
          <FilterCard
            onUserInput={onUserInput}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            releaseYearFilter={releaseYearFilter}
            sortOption={sortOption}
            ratingFilter={ratingFilter}
          />
        </Grid>
        <Grid item xs={12}>
          <MovieList
            action={(movie) => {
              return (
                <>
                  {action(movie)}
                  <AddToPlaylistIcon movie={movie} />
                </>
              );
            }}
            movies={displayedMovies}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
