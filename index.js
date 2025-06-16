import express from "express";
import posts from "./routes/posts.js";
import { PrismaClient } from "@prisma/client";

const app = express();
const client = new PrismaClient();

app.use(express.json());
app.use("/posts", posts);

app.get("/", (req, res) => {
  res.send("<h1> Welcome to MBPA API </h1>");
});

app.get("/users", async (req, res) => {
  try {
    const users = await client.users.findMany();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong! Try again Later!" });
  }
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await client.users.findUnique({
      where: { id: String(id) },
      include: { posts: true },
    });
    if (!user) {
      return res.status(404).json({ message: "User does not exist!" });
    }
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong! Try again Later!" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, username } = req.body;
    const newUser = await client.users.create({
      data: { firstName, lastName, emailAddress, username },
    });
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong! Try again Later!" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App is running on port 3000");
});
