import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const client = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const posts = await client.posts.findMany({
      where: { isDeleted: false },
      include: { user: true },
    });
    res.json(posts);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong! Try again Later!" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const post = await client.posts.create({
      data: { title, content, userId },
    });
    res.status(201).json(post);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong! Try again Later!" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await client.posts.update({
      where: { id: String(req.params.id) },
      data: { title, content },
    });
    res.json(post);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong! Try again Later!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await client.posts.update({
      where: { id: String(req.params.id) },
      data: { isDeleted: true },
    });
    res.json(post);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong! Try again Later!" });
  }
});

export default router;
