import React, { useContext  } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { PlaylistContext } from "../../contexts/playlistContext";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';
import img from '../../images/film-poster-placeholder.png';

export default function MovieCard({ movie, action }) { 

  const { favorites, addToFavorites } = useContext(MoviesContext);
  const { myPlaylist, addToPlaylist } = useContext(PlaylistContext);

  const isFavorite = favorites.includes(movie.id);
  const isInPlaylist = myPlaylist.some((m) => m.id === movie.id);

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  const handleAddToPlaylist = (e) => {
    e.preventDefault();
    addToPlaylist(movie);
  };
 

  return (
    <Card sx={{ backgroundColor: '#424242', color: '#e0e0e0' }}>
      <CardHeader
        avatar={
          isFavorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p" style={{ color: '#e0e0e0' }}>
            {movie.title}{" "}
          </Typography>
        }
      />

      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p" style={{ color: '#e0e0e0' }}>
              <CalendarIcon fontSize="small" style={{ color: '#e0e0e0' }} />
              {new Date(movie.release_date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: '2-digit',
                })}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Rating name="movie-rating" value={movie.vote_average / 2} precision={0.1} readOnly />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      {action && action(movie)}
      <Link to={`/movies/${movie.id}`}>
        <Button variant="contained" size="medium" style={{ backgroundColor: '#616161', color: '#e0e0e0' }}>
          More Info ...
        </Button>
      </Link>
      
        
      </CardActions>

    </Card>
  );
}
