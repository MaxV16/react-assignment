import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";


const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Trending This Week", path: "/movies/trending/week" },
    { label: "Trending Today", path: "/movies/trending/today" },
    { label: "Popular Movies", path: "/movie/popular" },
    { label: "Top Rated Movies", path: "/movies/top_rated" },
    { label: "Now Playing Movies", path: "/movies/now_playing" },
    { label: "My Playlist", path: "/movies/playlist" },
  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: '#212121' }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, color: "#bbdefb" }}>
            TMDB Client
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerOpen}
                color="white"
              >
                <MenuIcon color="white"/>
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerClose}
              >
                <List>
                  {menuOptions.map((opt) => (
                    <ListItemButton key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                      <ListItemText primary={opt.label} />
                    </ListItemButton>
                  ))}
                  <Divider />
                </List>
              </Drawer>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  style={{ color: '#bbdefb', '&:hover': { backgroundColor: '#424242' } }}
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
