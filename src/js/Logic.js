export default class Logic {
  constructor(element) {
    this.element = element;
    this.url = 'https://zicio-heroku.herokuapp.com/?method=';

    this.start();
  }

  async start() {
    const url = `${this.url}allTickets`;
    const response = await fetch(url);
    console.log(response);
  }
}
