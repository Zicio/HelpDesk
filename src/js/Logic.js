import Request from './Request';
import DOM from './DOM';

export default class Logic {
  constructor(element) {
    this.element = element;
    this.request = new Request();

    this.start();
    this.listenerOfAddTicket();
  }

  async start() {
    const tickets = await this.request.getTickets();
    DOM.renderTickets(tickets);
  }

  listenerOfAddTicket() {
    this.element.addEventListener('click', (e) => this.eventHandler(e));
  }

  async eventHandler(e) {
    if (e.target.classList.contains('desk__add-button')) {
      DOM.renderPopupAdd();
      return;
    }
    if (e.target.classList.contains('cancel-button')) {
      DOM.hidePopupAdd();
      return;
    }
    if (e.target.classList.contains('ticket__change')) {
      const ticket = e.target.closest('.ticket');
      const id = ticket.querySelector('.ticket__check').getAttribute('id');
      const response = await this.request.getTicket(id);
      DOM.renderPopupChange(response);
    }
  }
}
