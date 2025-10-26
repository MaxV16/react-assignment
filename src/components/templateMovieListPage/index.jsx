import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import AddToPlaylistIcon from "../cardIcons/addToPlaylist";

function MovieListPageTemplate({ movies, title, action, onUserInput, nameFilter, genreFilter, releaseYearFilter }) {
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      const nameMatch = nameFilter ? m.title && typeof m.title === 'string' && m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1 : true;
      const genreMatch = genreId > 0 ? m.genre_ids && m.genre_ids.includes(genreId) : true;
      const releaseYearMatch = releaseYearFilter ? m.release_date && m.release_date.substring(0, 4).includes(releaseYearFilter) : true;
      return m && nameMatch && genreMatch && releaseYearMatch;
    });

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid
          key="find"
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}}
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={onUserInput}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            releaseYearFilter={releaseYearFilter}
          />
        </Grid>
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
        ></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
