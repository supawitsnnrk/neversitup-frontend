"use server";
import { cookies } from "next/headers";

const login = async (prevState: any, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  if (!Boolean(email) || !Boolean(password)) {
    return { message: "username or password are invalid.", status: 400 };
  }
  const response = await fetch(
    "https://candidate.neversitup.com/todo/users/auth",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    }
  );
  if (!response.ok) {
    return { message: "Login failed", status: 400 };
  }
  const loginResponse = await response.json();
  cookies().set("token", loginResponse.token, { maxAge: 60 * 60 * 2 });
  return {
    message: "Login Success",
    status: 200,
  };
};

export default login;
