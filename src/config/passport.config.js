import passport from "passport";
import local from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import userModel from "../models/users.models.js";
import { createHash, isValidPassword } from "../utils/index.js";
import jwt from "passport-jwt";
import entorno from "./env.js";

console.log(entorno)

const JWT_SECRET = entorno.jwt_secret;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const googleClientId = entorno.client_google;
const googleClientSecret = entorno.secret_google;
const LocalStrategy = local.Strategy;

const initializePassport = () => {
 const cookieExtractor = (req) => {
    if (req && req.cookies) {
      return req.cookies["jwt"];
    }
    return null;
  };

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age, role } = req.body;
        try {
          const userFound = await userModel.findOne({ email: username });
          if (userFound) {
            console.log("Usuario ya existe");
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
            role,
          };

          const user = await userModel.create(newUser);
          return done(null, user);
        } catch (error) {
          return done(`error al crear el usuario ${error}`, false);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      async (req, username, password, done) => {
        try {
          const userExist = await userModel.findOne({ email: username });
          if (!userExist) return done(null, false);

          const isValid = isValidPassword(password, userExist.password);
          if (!isValid) {
            return done(null, false);
          }

          delete userExist._doc.password;
          return done(null, userExist);
        } catch (error) {
          return done(error.message);
        }
      }
    )
  );

  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_SECRET, 
      },
      async (jwt_payload, done) => {
        try {
          const user = await userModel.findById(jwt_payload.id).lean();
          if (!user) {
            return done(null, false, { message: "Usuario no encontrado" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      async (request, accesToken, refreshToken, profile, done) => {
        try {
          const userFound = await userModel.findOne({
            email: profile.emails[0]?.value,
          });
          if (userFound) {
            return done(null, userFound);
          }

          const newUser = {
            first_name: profile.name.givenName || "",
            last_name: profile.name.familyName || "",
            email: profile.emails[0]?.value || "",
            password: "",
          };

          const user = await userModel.create(newUser);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;