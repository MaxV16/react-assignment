import { useQuery } from "@tanstack/react-query";
import { getMovie, getMovieCredits, getActorDetails, getActorMovieCredits } from '../api/tmdb-api';

export const useMovie = id => {
  return useQuery({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
  });
};

export const useMovieCredits = id => {
  return useQuery({
    queryKey: ["movieCredits", { id }],
    queryFn: getMovieCredits,
  });
};

export const useActorDetails = id => {
  return useQuery({
    queryKey: ["actorDetails", { id }],
    queryFn: getActorDetails,
  });
};

export const useActorMovieCredits = id => {
  return useQuery({
    queryKey: ["actorMovieCredits", { id }],
    queryFn: getActorMovieCredits,
  });
};


