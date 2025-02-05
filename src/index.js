import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import  FileStore  from "session-file-store";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import sessionRoutes from "./routes/session.routes.js";
import viewRoutes from "./routes/views.routes.js";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import entorno from "./config/env.js";


//settings
const app = express();
app.set("PORT", entorno.port || 3000);
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

const firma = "12345";
const fileStorage = FileStore(session);
const secret = "12345";
const mongodbUri = 'mongodb+srv://haiverhercas:12345@haiverhdz.knujl.mongodb.net/?retryWrites=true&w=majority&appName=HaiverHdz';
const connectDB = async (uri)=>{
  try {
    await mongoose.connect(uri);
    console.log("conexion exitosa");
  } catch (error) {
    console.log("conexion NO exitosa", error);
  }
};
 
connectDB(mongodbUri);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser(firma));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongodbUri,
      ttl:100
    }),
    secret,
    resave: false,
    saveUninitialized: false,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/sessions", sessionRoutes);
app.use("/", viewRoutes);

// SESSIONS (no lo pide pero lo dejo aqui)
app.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Visitaste la pagina ${req.session.counter} veces`);
  } else {
    req.session.counter = 1;
    res.send("Bienvenido a la pagina");
  }
});

//listeners
app.listen(app.get("PORT"), () => {
  console.log(`Server on port http://localhost:${app.get("PORT")}`);
});
