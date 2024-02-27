"use server";

import { cookies } from "next/headers";

const createTodo = async (prevStat: any, formData: FormData) => {
  const token = cookies().get("token");
  const title = formData.get("title");
  const description = formData.get("description");
  const response = await fetch("https://candidate.neversitup.com/todo/todos/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });
  if (response.status === 401 && response.statusText === "Unauthorized") {
    return { message: "Unauthorized", status: 401 };
  }
  if (!response.ok) {
    return { message: "create todo failed", status: 400 };
  }
  return {
    message: "success",
    status: 200,
  };
};

export default createTodo;
