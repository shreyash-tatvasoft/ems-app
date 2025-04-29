import moment from "moment";
import { ITicket } from "./types";


export const formatDateTime = (date: string) => {
    return moment(date)
      .local()
      .format("ddd, DD MMM, YYYY | h:mm A");
  };

export const getTicketTypes = (array : ITicket[], ticketId : string) => {
    let ticketTypes = ""
    const findTicketType = array.find(ticket => ticket._id === ticketId)
    if(findTicketType) {
        ticketTypes = findTicketType.type
    }

    return ticketTypes
}