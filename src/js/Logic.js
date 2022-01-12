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
    DOM.showTickets(tickets);
  }

  listenerOfAddTicket() {
    this.element.addEventListener('click', (e) => this.eventHandler(e));
  }

  async eventHandler(e) {
    if (e.target.classList.contains('desk__add-button')) {
      DOM.showPopup('Добавить тикет');
      return;
    }
    if (e.target.classList.contains('cancel-button')) {
      DOM.showPopup();
      return;
    }
    if (e.target.classList.contains('ticket__change')) {
      const ticket = e.target.closest('.ticket');
      const id = ticket.querySelector('.ticket__check').getAttribute('id');
      const response = await this.request.getTicket(id);
      DOM.showPopup('Изменить тикет', response);
      return;
    }
    // if ((e.target.classList.contains('ticket__delete')) {
    //   DOM.renderPopupDelete();
    // }
  }
}
