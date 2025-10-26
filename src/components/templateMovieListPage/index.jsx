import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import AddToPlaylistIcon from "../cardIcons/addToPlaylist";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => m && m.title && m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1)
    .filter((m) => m && (genreId > 0 ? m.genre_ids && m.genre_ids.includes(genreId) : true));

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

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
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
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
