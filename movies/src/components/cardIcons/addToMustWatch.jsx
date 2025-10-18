import React from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";

import { useContext } from "react";
import { MoviesContext } from "../../contexts/movieContext";

const AddToMustWatchIcon = ({ movie }) => {
  const { addToMustWatch } = useContext(MoviesContext);

  const handleAddToMustWatch = () => {
    addToMustWatch(movie);
  };

  return (
    <IconButton aria-label="add to must watch" onClick={handleAddToMustWatch}>
      <PlaylistAddIcon color="primary" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;