import { AppBar, Toolbar, Typography } from "@mui/material";

interface NavbarProps {
  collapsed: boolean;
}

const drawerWidth = 240;
const collapsedWidth = 70;

function Navbar({ collapsed }: NavbarProps) {
  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        width: `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)`,
        ml: `${collapsed ? collapsedWidth : drawerWidth}px`,
        backgroundColor: "#ffffff", // <- Change color here
        color: "#333333", // <- Text color
        transition: "width 0.3s, margin 0.3s",
        height: 64, // <- control height here too
        justifyContent: "center",
      }}
    >
      <Toolbar sx={{ minHeight: "64px !important" }}>
        <Typography variant="h6" noWrap component="div">
          Admin Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
