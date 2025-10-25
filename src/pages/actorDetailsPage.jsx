import React from "react";
import { useParams } from "react-router-dom";
import { useActorDetails, useActorMovieCredits } from "../hooks/useMovie";
import Spinner from '../components/spinner';
import ActorDetails from "../components/actorDetails";
import MovieList from "../components/movieList";

const ActorDetailsPage = () => {
  const { id } = useParams();
  const [actor] = useActorDetails(id);
  const [movieCredits] = useActorMovieCredits(id);

  if (!actor || !movieCredits) {
    return <Spinner />;
  }

  return (
    <>
      <ActorDetails actor={actor} />
      <MovieList movies={movieCredits.cast} title="Movies Acted In" />
    </>
  );
};

export default ActorDetailsPage;