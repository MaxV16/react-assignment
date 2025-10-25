import React from "react";
import { useParams } from "react-router-dom";
import { useActorDetails, useActorMovieCredits } from "../hooks/useMovie";
import Spinner from '../components/spinner';
import ActorDetails from "../components/actorDetails";
import MovieList from "../components/movieList";

const ActorDetailsPage = () => {
  const { id } = useParams();
  const { data: actor, isLoading: actorLoading, isError: actorError, error: actorDetailsError } = useActorDetails(id);
  const { data: movieCredits, isLoading: movieCreditsLoading, isError: movieCreditsError, error: movieCreditsDetailsError } = useActorMovieCredits(id);

  if (actorLoading || movieCreditsLoading) {
    return <Spinner />;
  }

  if (actorError) {
    return <h1>{actorDetailsError.message}</h1>;
  }

  if (movieCreditsError) {
    return <h1>{movieCreditsDetailsError.message}</h1>;
  }

  return (
    <>
      <ActorDetails actor={actor} />
      <MovieList movies={movieCredits.cast} title="Movies Acted In" />
    </>
  );
};

export default ActorDetailsPage;