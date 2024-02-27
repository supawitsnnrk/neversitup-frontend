import { getCookie } from "@/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IUseLogin {
  username: string;
  password: string;
  setUsername: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
}

const useLogin = (): IUseLogin => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      window.location.href = "./todo";
    }
    setUsername("");
    setPassword("");
    console.log("set State");
  }, []);

  return {
    username,
    password,
    setUsername,
    setPassword,
  };
};

export default useLogin;
