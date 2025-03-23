import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6">Меню</Typography>
      </Box>
      <List>
        <ListItem component="a" href="/dashboard">
          <ListItemText primary="Главная" />
        </ListItem>
        <ListItem component="a" href="/profile">
          <ListItemText primary="Профиль" />
        </ListItem>
        <ListItem component="a" href="/settings">
          <ListItemText primary="Настройки" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
