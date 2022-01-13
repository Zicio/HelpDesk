import DOM from './DOM';

export default class Request {
  constructor() {
    this.url = 'https://zicio-heroku.herokuapp.com/';
  }

  async getTickets() {
    const url = `${this.url}?method=allTickets`;
    const response = await fetch(url);
    let tickets;
    if (response.ok) {
      tickets = await response.json();
      console.log(tickets);
    }
    return tickets;
  }

  async getTicket(id) {
    const url = `${this.url}?method=ticketById&id=${id}`;
    const response = await fetch(url);
    let ticket;
    if (response.ok) {
      ticket = await response.json();
      console.log(ticket);
    }
    return ticket[0];
  }

  async postTicket(form) {
    const url = `${this.url}?method=createTicket`;
    const response = await fetch(url, {
      method: 'POST',
      body: new FormData(form),
    });
    return response;
  }

  async deleteTicket(id) {
    const url = `${this.url}?method=deleteTicket&id=${id}`;
    const response = await fetch(url);
    return response;
  }

  async changeTicket(form, id) {
    const url = `${this.url}?method=changeTicket&id=${id}`;
    const response = await fetch(url, {
      method: 'POST',
      body: new FormData(form),
    });
    return response;
  }
}
