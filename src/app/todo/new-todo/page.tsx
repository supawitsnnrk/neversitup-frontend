"use client";
import { Textarea } from "@mui/joy";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import createTodo from "./action";
import { useFormState } from "react-dom";
import useCreateTodo from "@/hooks/Todo/useCreateTodo";
import { useEffect } from "react";

const NewTodo = () => {
  const initState = {
    message: "",
    status: 0,
  };
  const [state, formAction] = useFormState(createTodo, initState);
  const { title, description, setTitle, setDescription } = useCreateTodo();
  useEffect(() => {
    if (state.status === 200) {
      window.location.href = "./";
    } else if (state.status === 401) {
      document.cookie = "";
      window.location.replace(
        window.location.protocol + "//" + window.location.hostname
      );
    }
  }, [state]);
  return (
    <Container component={"main"}>
      <Grid container>
        <Grid item md xs>
          <Box
            component={"form"}
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px 16px",
              gap: "24px",
              display: "flex",
              flexDirection: "column",
            }}
            action={formAction}
          >
            <Box
              component={"div"}
              sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Typography>Title</Typography>
              <TextField
                placeholder="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                value={title}
              />
            </Box>
            <Box
              component={"div"}
              sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Typography>Description</Typography>
              <Textarea
                placeholder="Description"
                required
                name="description"
                minRows={6}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </Box>
            {state.status === 400 ? (
              <Box component={"div"}>{state.message}</Box>
            ) : null}
            <Box component={"div"} textAlign="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginRight: "6px" }}
                disabled={!Boolean(title.length && description.length)}
              >
                Create
              </Button>
              <Link href="../todo">
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginLeft: "6px" }}
                >
                  Cancel
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewTodo;
