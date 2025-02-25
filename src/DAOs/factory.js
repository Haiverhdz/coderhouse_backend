import env from "../config/env.js";
import connectDB from "../database/db.js";

let Users;
switch (env.persistence) {
  case "MONGO":
    connectDB(env.mongodb_url);
    const { default: UsersMongo } = await import("./mongoDB/users.dao.js");
    Users = UsersMongo;
    break;
  case "MEMORY":
    const { default: UsersMemory } = await import("./memory/memory.dao.js");
    Users = UsersMemory;
    break;
}
export default Users