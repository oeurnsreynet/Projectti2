import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Box,
  ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useLocation } from "react-router-dom";

const drawerWidth = 240;
const collapsedWidth = 70;
interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const location = useLocation();
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Slideshow", icon: <SlideshowIcon />, path: "/slideshow" },
    { text: "Category", icon: <CategoryIcon />, path: "/category" },
    { text: "Product", icon: <Inventory2Icon />, path: "/product" },
    { text: "Customer", icon: <PeopleIcon />, path: "/customer" },
    { text: "Invoice", icon: <ReceiptIcon />, path: "/invoice" },
    { text: "About", icon: <ReceiptIcon />, path: "/about" },
    { text: "Blog", icon: <ReceiptIcon />, path: "/blog" },
    {text: "Contact", icon: <ReceiptIcon />, path: "/contact"},
    { text: "Logo", icon: <ReceiptIcon />, path: "/logo" },
    // { text: "Settings", icon: <ReceiptIcon />, path: "/settings" },
    // { text: "Logout", icon: <ReceiptIcon />, path: "/logout" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: collapsed ? collapsedWidth : drawerWidth,
          boxSizing: "border-box",
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-end",
          p: 1,
        }}
      >
        <IconButton onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  justifyContent: collapsed ? "center" : "flex-start",
                  px: 2.5,
                  backgroundColor: isActive ? "#9FB3DF" : "inherit",
                  color: isActive ? "#fff" : "inherit",
                  "&:hover": {
                    backgroundColor: isActive ? "#9FB3DF" : "action.hover",
                  },
                  borderRadius: 2, // optional: smooth border
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: collapsed ? 0 : 2,
                    justifyContent: "center",
                    color: isActive ? "#fff" : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

export default Sidebar;
