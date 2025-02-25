import TicketModel from "../models/ticket.model.js";

export default class TicketService {
    async createTicket(ticketData) {
        return await TicketModel.create(ticketData);
    }
}

