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

const StaffHeader = () => {
  const drawerWidth = 240;

  const LayoutTheme = createTheme({
    typography: {
      fontFamily: "Exo,Roboto",
    },
  });

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
          <ToolBar sx={{ disaply: "flex", flexDirection: "column" }}>
            <Stack direction="row" spacing={2} alignItems={"center"}>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>KS</Avatar>

              <Typography variant="h6" wrap component="div">
                Account Name
              </Typography>
            </Stack>

            <Typography
              variant="h8"
              wrap
              component="div"
              alignSelf={"flex-end"}
              marginTop={-1}
              paddingLeft={10}
            >
              demoemail@gmail.com
            </Typography>
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
          <ToolBar />
        </Drawer>
      </Box>
    </ThemeProvider>
  );
};

export default StaffHeader;
