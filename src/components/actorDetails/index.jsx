import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const ActorDetails = ({ actor }) => {
  return (
    <>
      <Typography variant="h4" component="h2">
        {actor.name}
      </Typography>
      <Typography variant="subtitle1">
        {actor.birthday}
      </Typography>
      <Typography variant="body1">
        {actor.biography}
      </Typography>
      <Paper>
        <img
          src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
          alt={actor.name}
        />
      </Paper>
    </>
  );
};

export default ActorDetails;