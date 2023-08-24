// import * as React from "react";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Link as RouterLink } from "react-router-dom";
// import styles from "./styles.module.css";
// import sketch from "../../assets/sketch.png";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Clubber.com
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// // TODO remove, this demo shouldn't need to reset the theme.

// const customTheme = createTheme({
//   typography: {
//     fontFamily: "Exo, Roboto",
//   },
//   palette: {
//     secondary: { main: "#FF5C00" },
//   },
// });

// export default function SignUp() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get("email"),
//       password: data.get("password"),
//     });
//   };

//   return (
//     <ThemeProvider theme={customTheme}>
//       <div className={styles.container}>
//         <Container component="main" maxWidth="xs">
//           <CssBaseline />
//           <Box
//             sx={{
//               height: "100vh",
//               marginTop: 0,
//               marginLeft: 0,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "flex-start",
//               fontFamily: "Exo",
//               justifyContent: "center",
//             }}
//           >
//             <img src={sketch} alt="logo" className={styles.logo} />
//             <Typography component="h1" variant="h5">
//               Sign up
//             </Typography>
//             <Box
//               component="form"
//               noValidate
//               onSubmit={handleSubmit}
//               sx={{ mt: 3 }}
//             >
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     autoComplete="given-name"
//                     name="firstName"
//                     required
//                     fullWidth
//                     id="firstName"
//                     label="First Name"
//                     autoFocus
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="lastName"
//                     label="Last Name"
//                     name="lastName"
//                     autoComplete="family-name"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="email"
//                     label="Email Address"
//                     name="email"
//                     autoComplete="email"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     id="password"
//                     autoComplete="new-password"
//                   />
//                 </Grid>
//               </Grid>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{
//                   mt: 3,
//                   mb: 2,
//                   bgcolor: customTheme.palette.secondary.main,
//                   "&:hover": { bgcolor: customTheme.palette.secondary.main },
//                 }}
//               >
//                 Sign Up
//               </Button>
//               <Grid container justifyContent="flex-end">
//                 <Grid item xs={9}>
//                   <RouterLink to="/">
//                     <Typography variant="body2">
//                       Already have an account? Sign in
//                     </Typography>
//                   </RouterLink>
//                 </Grid>
//               </Grid>
//             </Box>
//             <Copyright sx={{ mt: 8, mb: 4, ml: 12 }} />
//           </Box>
//         </Container>
//       </div>
//     </ThemeProvider>
//   );
// }
