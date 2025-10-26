import React, { useState, createContext, useEffect, useContext } from "react";

export const PlaylistContext = createContext(null);

const PlaylistContextProvider = (props) => {
  const [myPlaylist, setMyPlaylist] = useState([]);

  useEffect(() => {
    const playlist = localStorage.getItem("myPlaylist");
    if (playlist) {
      setMyPlaylist(JSON.parse(playlist));
    }
  }, []);

  const addToPlaylist = (movie) => {
    let newPlaylist = [];
    if (!myPlaylist.some((m) => m.id === movie.id)) {
      newPlaylist = [...myPlaylist, movie];
    } else {
      newPlaylist = [...myPlaylist];
    }
    setMyPlaylist(newPlaylist);
    localStorage.setItem("myPlaylist", JSON.stringify(newPlaylist));
  };

  const removeFromPlaylist = (movie) => {
    const newPlaylist = myPlaylist.filter((m) => m.id !== movie.id);
    setMyPlaylist(newPlaylist);
    localStorage.setItem("myPlaylist", JSON.stringify(newPlaylist));
  };

  return (
    <PlaylistContext.Provider
      value={{
        myPlaylist,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {props.children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContextProvider;