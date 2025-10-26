import React, { useContext, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { PlaylistContext } from "../contexts/playlistContext";
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist";

const PlaylistMoviesPage = () => {
  const { myPlaylist } = useContext(PlaylistContext);
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [releaseYearFilter, setReleaseYearFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "releaseYear") setReleaseYearFilter(value);
    else if (type === "sort") setSortOption(value);
  };

  const genreId = Number(genreFilter);

  let displayedMovies = myPlaylist
    .filter((m) => {
      const nameMatch = nameFilter ? m.title && typeof m.title === 'string' && m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1 : true;
      const genreMatch = genreId > 0 ? m.genre_ids && m.genre_ids.includes(genreId) : true;
      const releaseYearMatch = releaseYearFilter ? m.release_date && m.release_date.substring(0, 4).includes(releaseYearFilter) : true;
      return m && nameMatch && genreMatch && releaseYearMatch;
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
    <PageTemplate
      title="My Playlist"
      movies={displayedMovies}
      action={(movie) => {
        return <RemoveFromPlaylist movie={movie} />;
      }}
      onUserInput={handleChange}
      nameFilter={nameFilter}
      genreFilter={genreFilter}
      releaseYearFilter={releaseYearFilter}
      sortOption={sortOption}
    />
  );
};

export default PlaylistMoviesPage;