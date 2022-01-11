export default class DOM {
  constructor(element) {
    this.element = element;
  }

  static renderTickets(tickets) {
    const ticketBox = document.querySelector('.tickets');
    for (const ticket of tickets) {
      const newTicket = `<div class="ticket"><input type="checkbox" class="ticket__check" id="${ticket.id}"><span class="ticket__name">${ticket.name}</span><span class="ticket__date">${ticket.created}</span><input type="button" class="ticket__change ticket__button" value="&#9998"><input type="button" class="ticket__delete ticket__button" value="X">`;
      ticketBox.insertAdjacentHTML('beforeend', newTicket);
      if (ticket.status) {
        const lastTicketCheck = document.getElementById(ticket.id);
        lastTicketCheck.setAttribute('checked', true);
      }
    }
  }
}
