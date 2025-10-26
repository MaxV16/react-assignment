import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { PlaylistContext } from "../contexts/playlistContext";
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist";

const PlaylistMoviesPage = () => {
  const { myPlaylist } = useContext(PlaylistContext);

  return (
    <PageTemplate
      title="My Playlist"
      movies={myPlaylist}
      action={(movie) => {
        return <RemoveFromPlaylist movie={movie} />;
      }}
    />
  );
};

export default PlaylistMoviesPage;