import { useState } from "react";

const useCreateTodo = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return { title, description, setTitle, setDescription };
};

export default useCreateTodo;
