import React, { useContext } from "react";
import { PlaylistContext } from "../../contexts/playlistContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToPlaylistIcon = ({ movie }) => {
  const context = useContext(PlaylistContext);

  const handleAddToPlaylist = (e) => {
    e.preventDefault();
    context.addToPlaylist(movie);
  };

  return (
    <IconButton
      aria-label="add to playlist"
      onClick={handleAddToPlaylist}
    >
      <PlaylistAddIcon color="primary" />
    </IconButton>
  );
};

export default AddToPlaylistIcon;