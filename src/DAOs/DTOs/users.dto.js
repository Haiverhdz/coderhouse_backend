export default class UserDTO {
    constructor(user) {
        this.first_name = user.first_name || user.nombre;
        this.last_name = user.last_name || user.apellido;
        this.email = user.email || user.correo;
        this.age = user.age || user.edad;
        this.role = user.role || user.rol || "user";
        this.phone = user.phone ? user.phone.split("+").join("") : "";
    }
};
