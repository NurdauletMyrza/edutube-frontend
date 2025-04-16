import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  cabinetCoursesPagePath,
  cabinetMyCoursesPagePath,
  cabinetProfilePagePath,
  homePagePath,
} from "@/shared/variables/pagePaths";
import {
  CastForEducationRounded,
  HomeRounded,
  LogoutRounded,
  ManageAccountsRounded,
  Person,
  SchoolRounded,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "@/config/providers/AuthProvider/AuthProvider";

const menuItems = [
  { text: "Home", icon: <HomeRounded />, path: homePagePath },
  {
    text: "Profile",
    icon: <Person />,
    path: cabinetProfilePagePath,
  },
  {
    text: "Courses",
    icon: <SchoolRounded />,
    path: cabinetCoursesPagePath,
  },
  {
    text: "My Courses",
    icon: <CastForEducationRounded />,
    path: cabinetMyCoursesPagePath,
  },
  {
    text: "Settings",
    icon: <ManageAccountsRounded />,
    path: "/settings",
  },
];

export const sidebarHiddenStateWidth = "55px";
export const sidebarExpandedStateWidth = "200px";

const Sidebar = () => {
  const { pathname, push } = useRouter();
  const [isHidden, setHidden] = useState(true);
  const { logoutUser } = useAuth();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: isHidden ? sidebarHiddenStateWidth : sidebarExpandedStateWidth,
        flexShrink: 0,
        transition: "width 0.3s",
        "& .MuiDrawer-paper": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
          width: isHidden ? sidebarHiddenStateWidth : sidebarExpandedStateWidth,
          boxSizing: "border-box",
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
      onMouseOver={() => setHidden(false)}
      onMouseOut={() => setHidden(true)}
    >
      <List>
        {menuItems.map((menuItem) => (
          <ListItem key={menuItem.text} disablePadding sx={{ maxWidth: 300 }}>
            <ListItemButton
              selected={pathname.startsWith(menuItem.path)}
              onClick={() => push(menuItem.path)}
              sx={{
                height: 50,
                gap: 0,
                transition: "padding 0.3s",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isHidden ? 0 : 2,
                  transition: "margin 0.3s",
                }}
              >
                {menuItem.icon}
              </ListItemIcon>
              <ListItemText
                primary={menuItem.text}
                sx={{
                  opacity: isHidden ? 0 : 1,
                  transition: "opacity 0.3s",
                  whiteSpace: "nowrap",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {isHidden ? (
        <IconButton onClick={logoutUser}>
          <LogoutRounded />
        </IconButton>
      ) : (
        <Button startIcon={<LogoutRounded />} onClick={logoutUser}>
          Logout
        </Button>
      )}
    </Drawer>
  );
};

export default Sidebar;
