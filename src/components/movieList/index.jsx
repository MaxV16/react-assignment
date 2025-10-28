import React, { useState } from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

const MovieList = (props) => {
  const [page, setPage] = useState(1);
  const moviesPerPage = 6;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const displayedMovies = props.movies.slice(startIndex, endIndex);

  let movieCards = displayedMovies.map((m) => (
    <Grid item key={m.id} xs={12} sm={6} md={4} lg={3} xl={2} sx={{ padding: "20px" }}>
      <Movie key={m.id} movie={m} action={props.action} />
    </Grid>
  ));

  return (
    <>
      <Grid container>
        {movieCards}
      </Grid>
      <Pagination
        count={Math.ceil(props.movies.length / moviesPerPage)}
        page={page}
        onChange={handleChangePage}
        variant="outlined"
        color="primary"
        sx={{ display: "flex", justifyContent: "center", margin: "20px" }}
      />
    </>
  );
};

export default MovieList;
