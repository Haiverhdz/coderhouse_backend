import passport from "passport";
import local from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import UsersService from "../services/Users.services.js";
import { createHash, isValidPassword } from "../utils/index.js";
import jwt from "passport-jwt";
import entorno from "./env.js";

const usersService = new UsersService();

const JWT_SECRET = entorno.jwt_secret;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const googleClientId = entorno.client_google;
const googleClientSecret = entorno.secret_google;
const LocalStrategy = local.Strategy;

const initializePassport = () => {
    const cookieExtractor = (req) => req?.cookies?.jwt || null;

    passport.use(
        "register",
        new LocalStrategy(
            { passReqToCallback: true, usernameField: "email" },
            async (req, username, password, done) => {
                try {
                    const { first_name, last_name, email, age, role } = req.body;
                    const userFound = await usersService.getUserByEmail(username);

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

                    const user = await usersService.registerUser(newUser);
                    return done(null, user);
                } catch (error) {
                    return done(`Error al crear el usuario: ${error}`, false);
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
                    const userExist = await usersService.loginUser(username, password);
                    return done(null, userExist);
                } catch (error) {
                    return done(null, false, { message: error.message });
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
                    const user = await usersService.getCurrentUser(jwt_payload.id);
                    if (!user) return done(null, false, { message: "Usuario no encontrado" });

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
            async (request, accessToken, refreshToken, profile, done) => {
                try {
                    const user = await usersService.googleLogin(profile);
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
        try {
            const user = await usersService.getCurrentUser(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};

export default initializePassport;
