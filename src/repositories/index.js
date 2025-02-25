import Users from "../DAOs/factory.js"
import UsersRepository from "./users.repositories.js"

const userServices = new UsersRepository(new Users());

export default userServices;