import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretToken = "12345";

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = async (password, hash) => await bcrypt.compare(password, hash); 

export const generateToken = (user)=>{
    return jwt.sign({user},secretToken,{expiresIn:"1h"});
};

export const authToken =(req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader)return res.status(401).json({message: "No autenticado"});
    const token = authHeader.split("")[1];
    console.log(token);

    jwt.verify(token, secretToken, (error, credentials) =>{
        if (error) return res.status(403).json({message:"No autorizado"})
        req.user = credentials.user;
        next();
    });
};

export const verifyToken = (token) =>{
    try {
        return jwt.verify(token, secretToken);
    } catch (error) {
        return null;
    }
};
