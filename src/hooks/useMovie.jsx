import { useEffect, useState } from "react";
import {getMovie, getMovieCredits, getActorDetails, getActorMovieCredits} from '../api/tmdb-api'

export const useMovie = id => {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    getMovie({ queryKey: ["movie", { id }] }).then(movie => {
      setMovie(movie);
    });
  }, [id]);
  return [movie, setMovie];
};

export const useMovieCredits = id => {
  const [credits, setCredits] = useState(null);
  useEffect(() => {
    getMovieCredits({ queryKey: ["movieCredits", { id }] }).then(credits => {
      setCredits(credits);
    });
  }, [id]);
  return [credits, setCredits];
};

export const useActorDetails = id => {
  const [actor, setActor] = useState(null);
  useEffect(() => {
    getActorDetails({ queryKey: ["actorDetails", { id }] }).then(actor => {
      setActor(actor);
    });
  }, [id]);
  return [actor, setActor];
};

export const useActorMovieCredits = id => {
  const [movieCredits, setMovieCredits] = useState(null);
  useEffect(() => {
    getActorMovieCredits({ queryKey: ["actorMovieCredits", { id }] }).then(movieCredits => {
      setMovieCredits(movieCredits);
    });
  }, [id]);
  return [movieCredits, setMovieCredits];
};


