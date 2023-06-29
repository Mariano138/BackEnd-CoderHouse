import { Router } from "express";
import UserService from "../dao/mongo/user.service.js";

const userService = new UserService();

const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

usersRouter.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getByEmail(email);

    if (!user) throw new Error("Invalid data");
    if (user.password !== password) throw new Error("Invalid data");

    req.session.user = user;

    res.redirect("/products");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

usersRouter.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

usersRouter.put("/:mail", async (req, res) => {
  try {
    const updateRole = await userService.updateRole(req.params.mail, req.body);
    res.status(201).send(updateRole);
  } catch (err) {
    res.status(500).send({ err });
  }
});

export { usersRouter };