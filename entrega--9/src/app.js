
import express from "express";
import handlerbars from "express-handlebars";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import incializePassport from "./config/passport.config.js"
import { productsRouter } from "../src/routes/products.router.js";
import { cartsRouter } from "../src/routes/carts.router.js";
import { realTimeProducts } from "../src/routes/realtimeproducts.router.js";
import { chatRouter } from "../src/routes/chat.router.js";
import { viewsRouter } from "../src/routes/views.router.js";
import { usersRouter } from "./routes/user.routes.js";
import { sessionsRouter } from "./routes/sessions.router.js";
import { initSocket } from "./socket.js";



// app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secret"));

// Set handlebars
app.engine("handlebars", handlerbars.engine());
app.set("views", "views/");
app.set("view engine", "handlebars");

// Directorio publico para files statics
app.use(express.static("public"));

// Session
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://agueromariano138:HDlwtTSMZwQoO4Vi@backendcoderhouse.aipky1f.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: {
        useNewUrlParser: true,
      },
      ttl: 2000,
    }),
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// conecto a mi DB de Atlas
mongoose.connect(
  "mongodb+srv://agueromariano138:HDlwtTSMZwQoO4Vi@backendcoderhouse.aipky1f.mongodb.net/?retryWrites=true&w=majority"
);

//Passport
incializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/realtimeproducts", realTimeProducts);
app.use("/chat", chatRouter);
app.use("/", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);

// Arranco mi webServer en el port 8080
const webServer = app.listen(8080, () => {
  console.log("Listen on 8080");
});

// Inicialización de socket.io
const io = initSocket(webServer);

export { io };