import TicketModel from "../../ticket.model.js";
import { v4 as uuidv4 } from "uuid"; 

export default class TicketDAO {
    async createTicket(ticketData) {
        ticketData.code = uuidv4(); 
        return await TicketModel.create(ticketData);
    }

    async getTicketById(ticketId) {
        return await TicketModel.findById(ticketId);
    }
}
