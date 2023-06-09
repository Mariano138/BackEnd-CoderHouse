import { Router } from "express";
import UserService from "../dao/mongo/user.service.js";
import passport from "passport";

const userService = new UserService();

const usersRouter = Router();

usersRouter.post(
  "/",
  passport.authenticate("register", {
    failureRedirect: "/registerfail",
    failureMessage: true,
  }),
  async (req, res) => {
    res.redirect("/");
  }
);

usersRouter.post(
  "/auth",
  passport.authenticate("login", {
    failureRedirect: "/loginfail",
    failureMessage: true,
  }),
  async (req, res) => {
    if (!req.user) {
      return res
        .status(400)
        .send({ status: "error", error: "Credenciales invalidas" });
    }
    req.session.user = req.user;
    res.redirect("/products");
  }
);

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