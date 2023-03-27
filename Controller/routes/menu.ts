import { Router } from "express";
import prisma from "../prisma/client";
import { Category } from "../prisma/generated/prisma-client-js";

const menuRouter = Router();

// Get all menus
menuRouter.get("/", async (req, res) => {
  const menus = await prisma.menu.findMany({
    include: { categories: true, items: true },
  });

  return res.status(200).json(menus);
});

// Get a single menu
menuRouter.get("/:menuId", async (req, res) => {
  const menu = await prisma.menu.findUnique({
    where: { title: req.params.menuId },
  });

  return res.status(200).json(menu);
});

// Create a new menu
menuRouter.post("/", async (req, res) => {
  const { title } = req.body;
  const newMenu = await prisma.menu.create({
    data: {
      title,
    },
  });
  return res.status(200).json(newMenu);
});

// Update a menu
menuRouter.put("/:menuId", async (req, res) => {
  console.log(req.params.menuId);
  const { title } = req.body;
  const updatedMenu = await prisma.menu.update({
    where: { id: req.params.menuId },
    data: {
      title: title,
    },
  });
  return res.status(200).json(updatedMenu);
});

// Delete a menu
menuRouter.delete("/:menuId", async (req, res) => {
  const deletedMenu = await prisma.menu.delete({
    where: { id: req.params.menuId },
  });
  return res.status(200).json(deletedMenu);
});

// Create category for a menu
menuRouter.post("/:menuId/category", async (req, res) => {
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
  });
  return res.status(200).json(newCategory);
});

// Update category for a menu
menuRouter.put("/:menuId/category/:categoryId", async (req, res) => {
  const { title } = req.body;
  const updatedCategory = await prisma.category.update({
    where: { id: req.params.categoryId },
    data: {
      title: title,
    },
  });
  return res.status(200).json(updatedCategory);
});

// Delete category for a menu
menuRouter.delete("/:menuId/category/:categoryId", async (req, res) => {
  const deletedCategory = await prisma.category.delete({
    where: { id: req.params.categoryId },
  });
  return res.status(200).json(deletedCategory);
});

export default menuRouter;
