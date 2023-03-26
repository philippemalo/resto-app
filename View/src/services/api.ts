import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:4466",
});

const signin = (email: string, password: string) =>
  api.post("/auth/signin", { email, password });

const signout = () => api.get("/auth/signout");

const signup = (email: string, password: string) => {
  return api.post("/auth/signup", {
    email,
    password,
  });
};

const session = () => api.get("/auth/session");

export { signin, signout, signup, session };
