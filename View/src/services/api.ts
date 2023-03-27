import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:4466",
});

const signin = (email: string, password: string) =>
  api.post("/auth/signin", { email, password });

const signout = () => api.get("/auth/signout");

const signup = (email: string, password: string, secretKey: string) => {
  return api.post("/auth/signup", {
    email,
    password,
    secretKey,
  });
};

const session = () => api.get("/auth/session");

const getMenus = () => api.get("/menu");

const getMenu = (menuId: string) => api.get(`/menu/${menuId}`);

const createMenu = (title: string) => api.post("/menu", { title });

const updateMenu = (menuId: string, title: string) =>
  api.put(`/menu/${menuId}`, { title });

const deleteMenu = (menuId: string) => api.delete(`/menu/${menuId}`);

const createCategory = (menuId: string, title: string) =>
  api.post(`/menu/${menuId}/category`, { title });

const updateCategory = (menuId: string, categoryId: string, title: string) =>
  api.put(`/menu/${menuId}/category/${categoryId}`, { title });

const deleteCategory = (menuId: string, categoryId: string) =>
  api.delete(`/menu/${menuId}/category/${categoryId}`);

const createCategorizedItem = (
  menuId: string,
  categoryId: string,
  title: string,
  price: number,
  description: string
) =>
  api.post(`/menu/${menuId}/category/${categoryId}/item`, {
    title,
    price,
    description,
  });

const createUncategorizedItem = (
  menuId: string,
  title: string,
  price: number,
  description: string
) => api.post(`/menu/${menuId}/item`, { title, price, description });

const updateItem = (
  menuId: string,
  itemId: string,
  title: string,
  price: number,
  description: string
) => api.put(`/menu/${menuId}/item/${itemId}`, { title, price, description });

const deleteItem = (menuId: string, itemId: string) =>
  api.delete(`/menu/${menuId}/item/${itemId}`);

export {
  signin,
  signout,
  signup,
  session,
  getMenus,
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
  createCategory,
  updateCategory,
  deleteCategory,
  createCategorizedItem,
  createUncategorizedItem,
  updateItem,
  deleteItem,
};
