import entorno from "../config/env.js"
import transport from "../config/mailing.config.js"

const emailService = async (req, res) => {
    try {
            const {email} = req.body;
            const result = await transport.sendMail({
            from: `Tu house <${entorno.mail_username}>`,
            to: email, 
            subject: "¡Te ganaste un premio!",
            html: `<div>
                <h1>Reclámalo el fin de semana</h1>
                <p>Hola ${email}, mira lo que te envié</p>
            </div>`,
            attachments: [
                {
                  filename: "contables.png",
                  path: "http://localhost:3000/images/contables.png",
                  cid: "img1",
                },
              ],
        });

        res.status(200).json({ message: "Mensaje enviado con éxito", result });
    } catch (error) {
        console.error("Error enviando correo:", error);
        res.status(500).json({ message: "Error enviando correo", error: error.message });
    }
};

export default emailService;