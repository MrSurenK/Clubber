import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./styles.module.css";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import sketch from "../../assets/sketch.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Clubber.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const customTheme = createTheme({
  typography: {
    fontFamily: "Exo, Roboto",
  },
  palette: {
    secondary: { main: "#FF5C00" },
  },
});

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const navigate = useNavigate();

  const handleSimulatedSignIn = () => {
    navigate("/user/staff");
  };

  return (
    <div className={styles.container}>
      <ThemeProvider theme={customTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              height: "100vh",
              marginTop: 0,
              marginLeft: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              fontFamily: "Exo",
              justifyContent: "center",
            }}
          >
            <img src={sketch} alt="logo" className={styles.logo} />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit} //Submission will be cancelled during dev stage to create other pages
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: customTheme.palette.secondary.main,
                  "&:hover": { bgcolor: customTheme.palette.secondary.main },
                }}
                onClick={handleSimulatedSignIn}
              >
                Sign In
              </Button>

              <Grid container justifyContent={"center"}>
                <Grid item s={6}>
                  <RouterLink to="/register">
                    <Typography variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Typography>
                  </RouterLink>
                </Grid>
              </Grid>

              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
