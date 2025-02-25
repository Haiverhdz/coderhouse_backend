import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";
import sessionRoutes from "./routes/session.routes.js";
import cartRoutes from "./routes/cart.router.js"
import viewRoutes from "./routes/views.routes.js";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import entorno from "./config/env.js";
import cors from "cors";

//settings
const app = express();
app.set("PORT", entorno.port || 3000);
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser(entorno.firma));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: entorno.mongodb_url,
      ttl:100
    }),
    secret: entorno.firma,
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

//routes
app.use("api/cart", cartRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/", viewRoutes);

//listeners
app.listen(app.get("PORT"), () => {
  console.log(`Server on port http://localhost:${app.get("PORT")}`);
});
