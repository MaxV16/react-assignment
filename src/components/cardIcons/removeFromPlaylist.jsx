import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { PlaylistContext } from "../../contexts/playlistContext";

const RemoveFromPlaylistIcon = ({ movie }) => {
  const context = useContext(PlaylistContext);

  const handleRemoveFromPlaylist = (e) => {
    e.preventDefault();
    context.removeFromPlaylist(movie);
  };

  return (
    <IconButton
      aria-label="remove from playlist"
      onClick={handleRemoveFromPlaylist}
    >
      <PlaylistRemoveIcon color="primary" />
    </IconButton>
  );
};

export default RemoveFromPlaylistIcon;