import Request from './Request';
import DOM from './DOM';

export default class Logic {
  constructor(element) {
    this.element = element;
    this.request = new Request();

    this.start();
    this.listener();
  }

  async start() {
    const tickets = await this.request.getTickets();
    DOM.showTickets(tickets);
  }

  listener() {
    this.element.addEventListener('click', (e) => this.eventHandler(e));
  }

  eventHandler(e) {
    if (e.target.classList.contains('desk__add-button')) {
      DOM.showPopup('Добавить тикет');
    }
    if (e.target.classList.contains('cancel-button')) {
      DOM.showPopup();
    }
    if (e.target.classList.contains('ticket__change')) {
      this.change(e);
    }
    if (e.target.classList.contains('ticket__delete')) {
      DOM.showPopup('Удалить тикет');
    }
    if (e.target.classList.contains('ticket')) {
      this.expand(e);
    }
    if (e.target.classList.contains('ok-button')) {
      e.preventDefault();
      this.sendTicket(e);
    }
  }

  async change(e) {
    const response = await this.requestTicket(e);
    DOM.showPopup('Изменить тикет', response);
  }

  async expand(e) {
    const description = e.target.querySelector('.ticket__description');
    if (description) {
      description.remove();
      return;
    }
    const response = await this.requestTicket(e);
    DOM.showDescription(e, response);
  }

  async requestTicket(e) {
    const ticket = e.target.closest('.ticket');
    const id = ticket.querySelector('.ticket__check').getAttribute('id');
    const response = await this.request.getTicket(id);
    return response;
  }

  async sendTicket(e) {
    const popup = e.target.closest('.popup');
    const form = popup.querySelector('.popup__form');
    const response = await this.request.postTicket(form);
    console.log(response);
  }
}
