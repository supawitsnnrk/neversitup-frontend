"use client";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import login from "./action";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import useLogin from "@/hooks/Login/useLogin";
import Head from "next/head";

export default function Home() {
  const initState = {
    message: "",
    status: 0,
  };
  const { username, password, setUsername, setPassword } = useLogin();
  const [state, formAction] = useFormState(login, initState);

  useEffect(() => {
    if (state.status === 200) {
      state.status = 0;
      state.message = "";
      window.location.href = "./todo";
    }
  }, [state]);

  return (
    <Container component={"main"} maxWidth="xs">
      <Head>
        <meta>hello</meta>
      </Head>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" action={formAction} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            error={state.status === 400}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            error={state.status === 400}
          />
          {state?.message !== "" && state?.status !== 200 ? (
            <Typography component={"p"} color={"red"}>
              {state?.message}
            </Typography>
          ) : state?.status === 200 ? (
            <Typography component={"p"} color={"green"}>
              {state?.message}
            </Typography>
          ) : null}
          <Button
            type="submit"
            // onClick={() => console.log({ username, password })}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!Boolean(username) || !Boolean(password)}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
