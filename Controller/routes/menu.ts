import { Router } from "express";
import prisma from "../prisma/client";
import { User } from "../prisma/generated/prisma-client-js";

const menuRouter = Router();

// Get all menus
menuRouter.get("/", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let menus = await prisma.menu.findMany({
    include: { categories: { include: { items: true } } },
  });
  return res.status(200).json(menus);
});

// Get a single menu
menuRouter.get("/:menuId", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const menu = await prisma.menu.findUnique({
    where: { title: req.params.menuId },
    include: { categories: { include: { items: true } } },
  });
  return res.status(200).json(menu);
});

// Create a new menu
menuRouter.post("/", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const authenticatedUser = req.user as User;
  if (!authenticatedUser.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { title } = req.body;
  const existingMenuTitle = await prisma.menu.findUnique({
    where: { title: title },
  });
  if (existingMenuTitle) {
    return res.status(409).json({ message: "Menu title already in use." });
  }
  const newMenu = await prisma.menu.create({
    data: {
      title,
    },
    include: { categories: { include: { items: true } } },
  });
  return res.status(200).json(newMenu);
});

// Update a menu
menuRouter.put("/:menuId", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const authenticatedUser = req.user as User;
  if (!authenticatedUser.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { title } = req.body;
  const updatedMenu = await prisma.menu.update({
    where: { id: req.params.menuId },
    data: {
      title: title,
    },
    include: { categories: { include: { items: true } } },
  });
  return res.status(200).json(updatedMenu);
});

// Delete a menu
menuRouter.delete("/:menuId", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const authenticatedUser = req.user as User;
  if (!authenticatedUser.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const deletedMenu = await prisma.menu.delete({
    where: { id: req.params.menuId },
  });
  return res.status(200).json(deletedMenu);
});

// Create category for a menu
menuRouter.post("/:menuId/category", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const authenticatedUser = req.user as User;
  if (!authenticatedUser.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { title } = req.body;
  const newCategory = await prisma.category.create({
    data: {
      title,
      menu: {
        connect: {
          id: req.params.menuId,
        },
      },
    },
    include: { items: true },
  });
  return res.status(200).json(newCategory);
});

// Update category for a menu
menuRouter.put("/:menuId/category/:categoryId", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const authenticatedUser = req.user as User;
  if (!authenticatedUser.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { title } = req.body;
  const updatedCategory = await prisma.category.update({
    where: { id: req.params.categoryId },
    data: {
      title: title,
    },
    include: { items: true },
  });
  return res.status(200).json(updatedCategory);
});

// Delete category for a menu
menuRouter.delete("/:menuId/category/:categoryId", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const authenticatedUser = req.user as User;
  if (!authenticatedUser.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const deletedCategory = await prisma.category.delete({
    where: { id: req.params.categoryId },
  });
  return res.status(200).json(deletedCategory);
});

// Create uncategorized item for a menu
menuRouter.post("/:menuId/item", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const authenticatedUser = req.user as User;
  if (!authenticatedUser.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { title, price, description } = req.body;
  const uncategorized = await prisma.category.findFirst({
    where: {
      title: "Uncategorized",
    },
  });
  if (!uncategorized) {
    return res
      .status(404)
      .json({ message: "Uncategorized category not found" });
  }
  const newItem = await prisma.item.create({
    data: {
      title: title,
      price: price,
      description: description,
      category: {
        connect: {
          id: uncategorized.id,
        },
      },
    },
  });
  return res.status(200).json(newItem);
});

// Create categorized item
menuRouter.post("/:menuId/category/:categoryId/item", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const authenticatedUser = req.user as User;
  if (!authenticatedUser.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { title, price, description } = req.body;
  const newItem = await prisma.item.create({
    data: {
      title: title,
      price: price,
      description: description,
      category: {
        connect: {
          id: req.params.categoryId,
        },
      },
    },
  });
  return res.status(200).json(newItem);
});

// Update item
menuRouter.put("/:menuId/item/:itemId", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const authenticatedUser = req.user as User;
  if (!authenticatedUser.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { title, price, description, visible } = req.body;
  const updatedItem = await prisma.item.update({
    where: { id: req.params.itemId },
    data: {
      title: title,
      price: price,
      description: description,
      visible: visible,
    },
  });
  return res.status(200).json(updatedItem);
});

// Delete item
menuRouter.delete("/:menuId/item/:itemId", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const authenticatedUser = req.user as User;
  if (!authenticatedUser.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const deletedItem = await prisma.item.delete({
    where: { id: req.params.itemId },
  });
  return res.status(200).json(deletedItem);
});

export default menuRouter;
