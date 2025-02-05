import { config } from "dotenv";
import program from "./process.js";

const { mode } = program.opts();
config({ path: `./.env.${mode}` });
export default {
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
  secret_google: process.env.SECRET_GOOGLE,
  client_google: process.env.GOOGLE_CLIENT,
  jwt_secret: process.env.JWT_SECRET,
};