import DOM from './DOM';

export default class Logic {
  constructor(element) {
    this.element = element;
    this.url = 'https://zicio-heroku.herokuapp.com/';

    this.start();
  }

  async start() {
    const url = `${this.url}?method=allTickets`;
    const response = await fetch(url);
    if (response.ok) {
      const tickets = await response.json();
      console.log(tickets);
      DOM.renderTickets(tickets);
    }
  }

  async second() {
    const url = `${this.url}?method=ticketById&id=1`;
    const response = await fetch(url);
    if (response.ok) {
      const ticket = await response.json();
      console.log(ticket);
    }
  }
}
