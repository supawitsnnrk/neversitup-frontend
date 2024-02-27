"use client";
import { getCookie } from "@/utils";
import { useEffect, useState } from "react";

interface ITodo {
  _id: string;
  title: string;
  description: string;
}

interface IUseTodo {
  loading: boolean;
  todos: ITodo[];
  modal: boolean;
  todoModal: boolean;
  selectedTodo: ITodo | undefined;
  onDeleteTodo: () => void;
  onOpenModal: (payload: ITodo) => void;
  onCloseModal: () => void;
  onOpenTodoDetailModal: (payload: ITodo) => void;
  onCloseTodoDetailModal: () => void;
  onLogout: (document: Document) => void;
}

const useTodo = (): IUseTodo => {
  const [bearerToken, setBearerToken] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const [todoModal, setTodoModal] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | undefined>(
    undefined
  );

  useEffect(() => {
    const token = getCookie("token");
    setBearerToken(token);
    getTodos(token);
  }, []);

  const getTodos = async (bearerToken: string) => {
    setLoading(true);
    const response = await fetch(
      "https://candidate.neversitup.com/todo/todos",
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    if (response.status === 401 || response.statusText === "Unauthorization") {
      document.cookie = "";
    }
    if (!response.ok) {
      throw new Error("Error when fetching");
    }
    const todoList = await response.json();
    setTodos(todoList);
    setLoading(false);
  };

  const onDeleteTodo = async () => {
    const response = await fetch(
      "https://candidate.neversitup.com/todo/todos/" + selectedTodo?._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("error when deleting");
    }
    onCloseModal();
    getTodos(bearerToken);
  };

  const onOpenModal = (payload: ITodo) => {
    setSelectedTodo(payload);
    setModal(true);
  };

  const onCloseModal = () => {
    setModal(false);
    setSelectedTodo(undefined);
  };

  const onOpenTodoDetailModal = (payload: ITodo) => {
    setSelectedTodo(payload);
    setTodoModal(true);
  };

  const onCloseTodoDetailModal = () => {
    setTodoModal(false);
    setSelectedTodo(undefined);
  };

  const onLogout = (document: Document) => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "";
  };

  return {
    loading,
    todos,
    modal,
    todoModal,
    selectedTodo,
    onDeleteTodo,
    onOpenModal,
    onCloseModal,
    onOpenTodoDetailModal,
    onCloseTodoDetailModal,
    onLogout,
  };
};

export default useTodo;
