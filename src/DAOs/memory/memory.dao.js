export default class Users {
    constructor() {
        this.data = [];
    }

    get = () => {
        return this.data;
    }
    post = (user) => {
        if (!user.id) {
            throw new Error("El usuario debe tener un ID");
        }
        this.data.push(user);
        return user;
    }
    put = (id, updatedUser) => {
        try {
            const index = this.data.findIndex(user => user.id === id);
            if (index === -1) {
                throw new Error("Usuario no encontrado");
            }
            this.data[index] = { ...this.data[index], ...updatedUser };
            return this.data[index];
        } catch (error) {
            console.error("Error en put:", error.message);
            throw error;
        }
    }
    delete = (id) => {
        try {
            const index = this.data.findIndex(user => user.id === id);
            if (index === -1) {
                throw new Error("Usuario no encontrado");
            }
            return this.data.splice(index, 1)[0];
        } catch (error) {
            console.error("Error en delete:", error.message);
            throw error;
        }
    }
}
