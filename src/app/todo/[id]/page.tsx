"use client";
import {
  Container,
  Grid,
  Button,
  Link,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { Textarea } from "@mui/joy";
import { useUpdateTodo } from "@/hooks/Todo/useUpdateTodo";
import { useFormState } from "react-dom";
import submitForm from "./action";
import { useEffect } from "react";

export interface IUpdateTodo {
  params: {
    id: string;
  };
}

const Page = ({ params }: IUpdateTodo) => {
  const initState = {
    message: "",
    status: 0,
  };
  const [state, formAction] = useFormState(submitForm, initState);
  const { todo, onChangeTitle, onChangeDescription } = useUpdateTodo({
    todoId: params.id,
  });

  useEffect(() => {
    if (state.status === 200) {
      window.location.href = "./";
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
              component={"input"}
              type="hidden"
              name="id"
              value={params.id}
            ></Box>
            <Box
              component={"div"}
              sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Typography>Title</Typography>
              <TextField
                placeholder="title"
                name="title"
                value={todo?.title}
                onChange={onChangeTitle}
              />
            </Box>
            <Box
              component={"div"}
              sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Typography>Description</Typography>
              <Textarea
                placeholder="Description"
                name="description"
                onChange={onChangeDescription}
                value={todo?.description}
                minRows={6}
              />
            </Box>
            <Box component={"div"} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                sx={{ marginRight: "6px" }}
                type="submit"
              >
                Edit
              </Button>
              <Link href="../todo">
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginLeft: "6px" }}
                  type="button"
                >
                  Cancel
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
    // <Container component={"main"} maxWidth="lg">
    //   <Grid container sx={{ mt: 3 }}>
    //     <Grid
    //       item
    //       lg
    //       sx={{
    //         textAlign: "center",
    //         display: "flex",
    //         flexDirection: "column",
    //         gap: "10px",
    //       }}
    //     >
    //       <Box component={"form"} action={formAction}>
    //         <Box
    //           component={"input"}
    //           type="hidden"
    //           name="id"
    //           value={params.id}
    //         />
    //         <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
    //           <Grid item xs={1}>
    //             <Typography sx={{ textAlign: "left" }}>Title</Typography>
    //           </Grid>
    //           <TextField
    //             name="title"
    //             onChange={onChangeTitle}
    //             value={todo?.title}
    //           />
    //         </Box>
    //         <Box
    //           sx={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
    //         >
    //           <Grid item xs={1}>
    //             <Typography sx={{ textAlign: "left" }}>Description</Typography>
    //           </Grid>
    //           <Textarea
    //             name="description"
    //             minRows={5}
    //             value={todo?.description}
    //             onChange={onChangeDescription}
    //           />
    //         </Box>
    //         {state.status === 401 ? (
    //           <Typography color={"red"}>{state.message}</Typography>
    //         ) : null}
    //         <Button type="submit" variant="contained">
    //           Create Todo
    //         </Button>
    //       </Box>
    //     </Grid>
    //   </Grid>
    // </Container>
  );
};

export default Page;
