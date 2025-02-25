import UserDTO from "../DAOs/DTOs/users.dto.js";

export default class UsersRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getUsers() {
        return await this.dao.get();
    }

    async getUserByEmail(email) {
        return await this.dao.getByEmail(email);
    }

    async getUserById(id) {
        return await this.dao.getById(id);
    }

    async createUser(user) {
        const userToInsert = new UserDTO(user);
        return await this.dao.post(userToInsert);
    }
}
