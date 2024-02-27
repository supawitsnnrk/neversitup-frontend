"use server";

import { cookies } from "next/headers";

const submitForm = async (prevState: any, formData: FormData) => {
  const title = formData.get("title");
  const description = formData.get("description");
  const id = formData.get("id");
  const token = cookies().get("token");

  const response = await fetch(
    "https://candidate.neversitup.com/todo/todos/" + id,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    }
  );

  if (!response.ok) {
    return {
      message: "Update failed",
      status: "401",
    };
  }

  return {
    message: "Success",
    status: 200,
  };
};

export default submitForm;
