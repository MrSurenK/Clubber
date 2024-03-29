import * as React from "react";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import sketch from "../../assets/sketch.png";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import jwtDecode from "jwt-decode";

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
      </Link>
      {new Date().getFullYear()}
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

export default function Login(props) {
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetchData = useFetch();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const res = await fetchData("/auth/login", "POST", { email, password });

    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      const decoded = jwtDecode(res.data.access);
      userCtx.setIsStaff(decoded.isStaff);
      userCtx.setStaffId(decoded.staffId);
      userCtx.setStaffRank(decoded.staffRank);
      userCtx.setIsMember(decoded.isMember);
      userCtx.setMemberId(decoded.memberId);
      userCtx.setMemberRank(decoded.memberRank);
      userCtx.setUserId(decoded.id);

      // Check if user is a staff member or a customer
      if (decoded.isStaff) {
        // Navigate to StaffPortal if user is a staff member
        navigate("/user/staff/dashboard");
      } else if (decoded.isMember) {
        // Navigate to CustomerPortal if user is a customer
        navigate("/user/customer/dashboard");
      }
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                onClick={handleLogin}
              >
                Sign In
              </Button>

              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
