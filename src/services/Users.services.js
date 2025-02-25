import userServices from "../repositories/index.js";
import { createHash, isValidPassword } from "../utils/index.js";

export default class UsersService {
    async registerUser(userData) {
        const userExists = await userServices.getUserByEmail(userData.email);
        if (userExists) throw new Error("Usuario ya existe");
    
        return await userServices.createUser(userData); 
    }
    

    async getUserByEmail(email) {
        return await userServices.getUserByEmail(email);
    }

    async loginUser(email, password) {
        const user = await userServices.getUserByEmail(email);
        if (!user || !user.password) throw new Error("Usuario no encontrado o sin contraseña");
    
        const isValid = isValidPassword(password, user.password);
        if (!isValid) throw new Error("Contraseña incorrecta");
    
        return user;
    }

    async getCurrentUser(id) {
        return await userServices.getUserById(id);
    }

    async googleLogin(profile) {
        let user = await userServices.getUserByEmail(profile.emails[0]?.value);
        if (!user) {
            const newUser = {
                first_name: profile.name.givenName || "",
                last_name: profile.name.familyName || "",
                email: profile.emails[0]?.value || "",
                password: "", 
            };
            user = await userServices.createUser(newUser);
        }
        return user;
    }
}
