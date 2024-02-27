"use client";
import {
  Container,
  Box,
  Grid,
  Button,
  Link,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Head from "next/head";
import useTodo from "@/hooks/Todo/useTodo";

const Page = () => {
  const {
    todos,
    loading,
    modal,
    todoModal,
    selectedTodo,
    onDeleteTodo,
    onOpenModal,
    onCloseModal,
    onOpenTodoDetailModal,
    onCloseTodoDetailModal,
    onLogout,
  } = useTodo();

  return (
    <Container component={"main"} maxWidth="lg" sx={{ height: "100vh" }}>
      <Dialog
        open={modal}
        onClose={() => onCloseModal()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete Todo ${selectedTodo?.title}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you need to delete ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onDeleteTodo()} autoFocus>
            Delete
          </Button>
          <Button onClick={onCloseModal}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={todoModal}
        onClose={onCloseTodoDetailModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{selectedTodo?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {selectedTodo?.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseTodoDetailModal}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Head>
        <title>TODO List</title>
      </Head>
      <Button
        sx={{ position: "absolute", right: "16px", top: "16px" }}
        variant="contained"
        color="error"
        onClick={() => onLogout(document)}
      >
        Logout
      </Button>
      <Grid container sx={{ maxHeight: "90%", overflow: "scroll" }}>
        <Grid item md xs>
          <Typography
            component={"h1"}
            sx={{
              mb: "16px",
              textAlign: "center",
              fontSize: "24px",
              fontWeight: 600,
            }}
          >
            Todo List
          </Typography>
          {loading ? (
            <Typography sx={{ textAlign: "center" }}>Loading...</Typography>
          ) : null}
          {todos &&
            todos.map((todo: any, i: number) => (
              <Box
                key={`todo-box-${i}`}
                sx={{
                  marginBottom: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  padding: "8px 12px",
                  borderRadius: "8px",
                }}
              >
                <Grid key={`container-${i}`} container>
                  <Grid
                    key={`grid-item-${i}`}
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <Typography component={"p"} key={`title-${i}`}>
                        Title: {todo.title}
                      </Typography>
                      <Typography component={"p"} key={`description-${i}`}>
                        Description: {todo.description}
                      </Typography>
                    </Box>
                    <Box
                      component={"div"}
                      sx={{ display: "flex", flexDirection: "row", gap: "5px" }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => onOpenTodoDetailModal(todo)}
                        color="info"
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => onOpenModal(todo)}
                        color="error"
                      >
                        Delete
                      </Button>
                      <Link href={`./todo/${todo._id}`}>
                        <Button variant="contained">Edit</Button>
                      </Link>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 3 }}>
        <Grid item md xs sx={{ textAlign: "center" }}>
          <Link href="./todo/new-todo">
            <Button type="submit" variant="contained">
              Create Todo
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Page;
