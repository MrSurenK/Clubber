import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepPurple } from "@mui/material/colors";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import ReceiptIcon from "@mui/icons-material/Receipt";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BookIcon from "@mui/icons-material/Book";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import styles from "./StaffLayout.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import sketch from "../../assets/sketch.png";
import Button from "@mui/material/Button";

const StaffHeader = () => {
  const drawerWidth = 240;

  const LayoutTheme = createTheme({
    typography: {
      fontFamily: "Exo,Roboto",
    },
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleDashboardButton = (route) => {
    navigate(route);
  };

  const handleAppBarButton = () => {
    navigate("/user/customer");
  };

  return (
    <ThemeProvider theme={LayoutTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            display: "flex",
            alignItems: "flex-end",
            width: `calc(100% -${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            bgcolor: "#000000",
          }}
        >
          <ToolBar>
            <img src="../../assets/Company_Name.png" alt="Company Logo" />

            <Typography variant="h5">Staff Portal</Typography>

            <Button
              onClick={handleAppBarButton}
              variant="contained"
              sx={{ height: "100%" }}
            >
              MyClubber
            </Button>

            {/* Right side */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>KS</Avatar>
              <Stack direction="column" alignItems="flex-end">
                <Typography variant="h6" marginRight={"auto"} paddingTop={2}>
                  Account Name
                </Typography>
                <Typography variant="h6" marginBottom={2}>
                  demoemail@gmail.com
                </Typography>
              </Stack>
            </Stack>
          </ToolBar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              bgcolor: "#000000",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <ToolBar>
            <img src={sketch} alt="logo" className={styles.logo} />
          </ToolBar>
          <List>
            {[
              {
                text: "Dashboard",
                icon: <DashboardIcon sx={{ color: "white" }} />,
                route: "dashboard",
              },
              {
                text: "Members",
                icon: <GroupIcon sx={{ color: "white" }} />,
                route: "members",
              },
              {
                text: "Revenue",
                icon: <ReceiptIcon sx={{ color: "white" }} />,
                route: "revenue",
              },
              {
                text: "Staff",
                icon: <EngineeringIcon sx={{ color: "white" }} />,
                route: "employee",
              },
              {
                text: "Reservation",
                icon: <BookIcon sx={{ color: "white" }} />,
                route: "reservations", //Will break, does not exist yet(Stetch goal)
              },
            ].map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => handleDashboardButton(item.route)}
                  sx={{
                    display: "flex",
                    gap: "20%",
                    alignItems: "center",
                    backgroundColor:
                      location.pathname === `/user/staff/${item.route}` //use location object from react-router-dom to set active button click styling
                        ? "grey"
                        : "initial", // Apply grey background for the active page
                    transition: "background-color 0.3s", // Smooth transition
                    "&:hover": {
                      backgroundColor: "grey",
                    },
                  }}
                >
                  {item.icon}
                  <ListItemText primary={item.text} sx={{ color: "white" }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
};

export default StaffHeader;