import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link, useLocation } from "react-router-dom";
import { Stack } from "@mui/material";

export default function NavBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black", padding: "5px" }}
      >
        <Toolbar>
          <IconButton color="inherit" sx={{ fontSize: "inherit" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/3145/3145755.png"
              alt="Icon"
              style={{ height: "2em", width: "auto", marginRight: 10 }}
            />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bolder" }}
          >
            BOOKHUB
          </Typography>
          <Stack gap={3} direction={"row"}>
          <Link style={{ fontWeight: "bolder", textDecoration: "none",  color: currentPath === "/" ? "orange" : "inherit"  }} to={"/"}>
              Home
            </Link>
            <Link to={"/bookmarks"} style={{ fontWeight: "bolder", textDecoration: "none" , color: currentPath === "/bookmarks" ? "orange" : "inherit" }}>
              Bookmark
            </Link>
            
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
