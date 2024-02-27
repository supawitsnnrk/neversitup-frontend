"use client";

import React, { useEffect, useState } from "react";
import { getCookie } from "../../utils/index";

interface IUseUpdateTodo {
  todo: ITodo;
  onLoadTodo: (id: string) => void;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

interface IUpdateTodo {
  todoId: string;
}

interface ITodo {
  title: string;
  description: string;
}

const useUpdateTodo = ({ todoId }: IUpdateTodo): IUseUpdateTodo => {
  const [token, setToken] = useState<string>("");
  const [todo, setTodo] = useState<ITodo>({ title: "", description: "" });

  useEffect(() => {
    const getToken = getCookie("token");
    setToken(getToken);
  }, []);

  useEffect(() => {
    if (token !== "") {
      onLoadTodo(todoId);
    }
  }, [token]);

  const onLoadTodo = async (id: string): Promise<void> => {
    const response: Response = await fetch(
      "https://candidate.neversitup.com/todo/todos/" + id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 401 || response.statusText === "Unauthorization") {
      document.cookie = "";
    }
    if (!response.ok) {
      throw new Error("Error when fetching");
    }
    const item = await response.json();
    setTodo(item);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({
      ...todo,
      title: e.target.value,
    });
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodo({
      ...todo,
      description: e.target.value,
    });
  };

  return {
    todo,
    onLoadTodo,
    onChangeTitle,
    onChangeDescription,
  };
};

export { useUpdateTodo };
