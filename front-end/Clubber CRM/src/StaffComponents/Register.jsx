import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import styles from "../LoginSignUp/styles.module.css";
import sketch from "../../assets/sketch.png";
import MenuItem from "@mui/material/MenuItem";
import useFetch from "../hooks/useFetch";

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

export default function SignUp() {
  const fetchData = useFetch();
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formIsStaff, setFormIsStaff] = useState(false);
  const [formStaffRank, setFormStaffRank] = useState("");
  const [formIsMember, setFormIsMember] = useState(false);
  const [formMemberRank, setFormMemberRank] = useState("");

  const [displayStaffRank, setDisplayStaffRank] = useState([]);
  const [displayMemberRank, setDisplayMemberRank] = useState([]);

  const getDisplayStaffRank = async () => {
    const res = await fetchData("/staffRank/get");

    if (res.ok) {
      setDisplayStaffRank(res.data);
    } else {
      console.log(res.data);
    }
  };

  const getDisplayMemberRank = async () => {
    const res = await fetchData("/memberRank/get");

    if (res.ok) {
      setDisplayMemberRank(res.data);
    } else {
      console.log(res.data);
    }
  };

  useEffect(() => {
    getDisplayStaffRank();
    getDisplayMemberRank();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={customTheme}>
      <div className={styles.container}>
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
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="formName"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    value={formName}
                    onChange={(e) => {
                      setFormName(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="formEmail"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formEmail}
                    onChange={(e) => {
                      setFormEmail(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="formPassword"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formPassword}
                    onChange={(e) => {
                      setFormPassword(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              {/* New drop-down inputs */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="formIsStaff"
                  label="Is Staff"
                  name="isStaff"
                  select
                  value={formIsStaff}
                  onChange={(e) => {
                    setFormIsStaff(e.target.value);
                  }}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="formStaffRank"
                  label="Staff Rank"
                  name="staffRank"
                  select
                  value={formStaffRank}
                  onChange={(e) => {
                    setFormStaffRank(e.target.value);
                  }}
                >
                  {displayStaffRank.map((rank) => (
                    <MenuItem key={rank.staffRank} value={rank.staffRank}>
                      {rank.staffRank}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="formIsMember"
                  label="Is Member"
                  name="isMember"
                  select
                  value={formIsMember}
                  onChange={(e) => {
                    setFormIsMember(e.target.value);
                  }}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="formMemberRank"
                  label="Member Rank"
                  name="formMemberRank"
                  select
                  value={formMemberRank}
                  onChange={(e) => setFormMemberRank(e.target.value)}
                >
                  {displayMemberRank.map((rank) => (
                    <MenuItem key={rank.memberRank} value={rank.memberRank}>
                      {rank.memberRank}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
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
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item xs={9}>
                  <RouterLink to="/">
                    <Typography variant="body2">
                      Already have an account? Sign in
                    </Typography>
                  </RouterLink>
                </Grid>
              </Grid>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4, ml: 12 }} />
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
