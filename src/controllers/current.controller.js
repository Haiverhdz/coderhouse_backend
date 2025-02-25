import { generateToken } from "../utils/index.js";
import userModel from "../models/users.models.js";
import { createHash } from "../utils/index.js";

const login = async (req, res) => {
    try {
      const token = generateToken(req.user);
      res
        .cookie("authToken", token, { 
          signed: true,
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        })
        .redirect("/current");
    } catch (error) {
      res.status(500).send({ status: "error", message: "Error al ingresar" });
    }
};

const current = (req, res) => {
    try {
      res.status(200).json({
        status: "success",
        user: req.user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al procesar la solicitud",
      });
    }
};

const register = async (req, res) => {
   res.redirect("/login");
};

const failregister = (req, res) => {
    res.status(400).send({ status: "error", message: "Error al registrar el usuario" });
};
 
const failLogin = (req, res) => {
    res.status(400).send({ status: "error", message: "Error al ingresar" });
};  

const recupero = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) return res.status(400).send("Campos requeridos");
  
      const userFound = await userModel.findOne({ email });
      if (!userFound) return res.status(404).send("Usuario no encontrado");
  
      const hashPass = createHash(password);
      userFound.password = hashPass;
  
      await userFound.save();
      res.redirect("/login");
    } catch (error) {
      res.status(500).send({ status: "error", message: "Error al recuperar la contraseña" });
    }
};

const logout =  (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("authToken"); 
      res.redirect("/login");
    });
};  

const admin =  async (req, res) => {res.json({ message: "Producto creado correctamente" })};

const user =  async (req, res) => {res.json({ message: "Producto agregado al carrito" })};

export default {current, login, register, failregister, failLogin, recupero, logout, admin, user}; 