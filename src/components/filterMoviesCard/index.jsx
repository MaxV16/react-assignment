import React, { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres, getMovies } from "../../api/tmdb-api";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'

const formControl =
{
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterMoviesCard({ titleFilter, genreFilter, releaseYearFilter, sortOption, ratingFilter, onUserInput }) {

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['genres'],
        queryFn: getGenres,
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    const genres = data.genres;
    if (genres[0].name !== "All") {
        genres.unshift({ id: "0", name: "All" });
    }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    onUserInput(type, value);
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };



  return (
    <Card
sx={{
  backgroundColor: "#424242",
  color: "#e0e0e0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "1px solid #616161",
  justifyContent: 'space-between',
  padding: '10px',
}}
            variant="outlined">
            <CardContent sx={{ flex: 2, color: '#e0e0e0' }}>
                <Typography variant="h5" component="h1" sx={{ display: 'flex', alignItems: 'center', color: '#e0e0e0' }}>
                    <SearchIcon fontSize="large" sx={{ color: '#e0e0e0' }} />
                    Filter the movies.
                </Typography>
                <TextField
                    sx={{ ...formControl, width: '90%', input: { color: '#e0e0e0' }, label: { color: '#e0e0e0' } }}
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                    value={titleFilter}
                    onChange={handleTextChange}
                />

                <TextField
                    sx={{ ...formControl, width: '90%' }}
                    id="filled-search"
                    label="Release Year"
                    type="search"
                    variant="filled"
                    value={releaseYearFilter}
                    onChange={(e) => handleChange(e, "releaseYear", e.target.value)}
                />

       <TextField
         sx={{ ...formControl, width: '90%' }}
         id="filled-search"
         label="Rating"
         type="search"
         variant="filled"
         value={ratingFilter}
         onChange={(e) => handleChange(e, "rating", e.target.value)}
       />

               <FormControl sx={{ ...formControl, width: '90%' }}>
                   <InputLabel id="sort-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-label"
                        id="sort-select"
                        label="Sort By"
                        defaultValue=""
                        value={sortOption}
                        onChange={(e) => handleChange(e, "sort", e.target.value)}
                    >
                        <MenuItem value="title.asc">Title (A-Z)</MenuItem>
                        <MenuItem value="title.desc">Title (Z-A)</MenuItem>
                        <MenuItem value="release_date.asc">Release Date (Asc)</MenuItem>
                        <MenuItem value="release_date.desc">Release Date (Desc)</MenuItem>
                        <MenuItem value="vote_average.asc">Rating (Ascending)</MenuItem>
                        <MenuItem value="vote_average.desc">Rating (Descending)</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ ...formControl, width: '90%', color: '#e0e0e0' }}>
                    <InputLabel id="genre-label" sx={{ color: '#e0e0e0' }}>Genre</InputLabel>
                    <Select
                        labelId="genre-label"
                        id="genre-select"
                        label="Genre"
                        defaultValue=""
                        value={genreFilter}
                        onChange={handleGenreChange}
                    >
                        {genres.map((genre) => {
                            return (
                                <MenuItem key={genre.id} value={genre.id} sx={{ color: '#e0e0e0' }}>
                                    {genre.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
      </CardContent>
      <CardMedia
        sx={{ height: 300, width: 300, flex: 1 }}
        image={img}
        title="Filter"
      />
    </Card>
  );
}
