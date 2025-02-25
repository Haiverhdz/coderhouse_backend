import usersModel from "../../models/users.models.js";

export default class Users {
    constructor() {}
    get = async () => {
        try {
            return await usersModel.find();
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            throw new Error("No se pudieron obtener los usuarios");
        }
    };
    getById = async (id) => {
        try {
            const user = await usersModel.findById(id);
            if (!user) throw new Error("Usuario no encontrado");
            return user;
        } catch (error) {
            console.error(`Error al obtener usuario con ID ${id}:`, error);
            throw new Error("No se pudo obtener el usuario");
        }
    };
    getByEmail = async (email) => {
        try {
            const user = await usersModel.findOne({ email });
            return user || null; 
        } catch (error) {
            console.error(`Error al obtener usuario con email ${email}:`, error);
            throw new Error("No se pudo obtener el usuario");
        }
    };      
    post = async (newUser) => {
        try {
            return await usersModel.create(newUser);
        } catch (error) {
            console.error("Error al crear usuario:", error);
            throw new Error("No se pudo crear el usuario");
        }
    };
    put = async (id, updatedUser) => {
        try {
            const user = await usersModel.findByIdAndUpdate(id, updatedUser, { new: true });
            if (!user) throw new Error("Usuario no encontrado");
            return user;
        } catch (error) {
            console.error(`Error al actualizar usuario con ID ${id}:`, error);
            throw new Error("No se pudo actualizar el usuario");
        }
    };
    delete = async (id) => {
        try {
            const user = await usersModel.findByIdAndDelete(id);
            if (!user) throw new Error("Usuario no encontrado");
            return user;
        } catch (error) {
            console.error(`Error al eliminar usuario con ID ${id}:`, error);
            throw new Error("No se pudo eliminar el usuario");
        }
    };
};

