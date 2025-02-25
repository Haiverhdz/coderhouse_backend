import UsersService from "../services/users.service.js";

const usersService = new UsersService();

export const getUsers = async (req, res) => {
    try {
        const users = await usersService.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usersService.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const newUser = await usersService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await usersService.updateUser(id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await usersService.deleteUser(id);
        if (!deletedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
