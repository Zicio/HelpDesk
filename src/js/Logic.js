import DOM from './DOM';

export default class Logic {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    } else {
      this.element = element;
      Logic.startRender();
      this.listenerOfAdd();
      this.listenerOfSave();
      this.listenerOfReset();
      this.listenerOfСhange();
      this.listenerOfDelete();
    }
  }

  static startRender() {
    if (localStorage) {
      DOM.renderProducts();
    }
  }

  listenerOfAdd() {
    this.element.addEventListener('click', (e) => Logic.add(e));
  }

  static add(e) {
    if (e.target.classList.contains('list__add-submit')) {
      e.preventDefault();
      DOM.renderPopUp();
    }
  }

  listenerOfSave() {
    this.element.addEventListener('click', (e) => Logic.saveProduct(e));
  }

  static saveProduct(e) {
    if (e.target.classList.contains('form__save')) {
      const form = e.target.closest('.popup').querySelector('.form');
      const invalid = [...form.elements].filter((o) => !o.validity.valid);
      try {
        Logic.checkInValidity(invalid);
      } catch (err) {
        const newProductData = [...form.elements].map(({ id, value }) => ({ id, value }));
        Logic.saveData(newProductData);
        DOM.saveProduct(e);
      }
    }
  }

  static checkInValidity(invalid) {
    if (!invalid.length) {
      throw new Error('проверка не нужна');
    }
    DOM.renderHint(invalid);
  }

  static saveData(data) {
    localStorage.setItem(`${data[0].value}`, JSON.stringify(data));
  }

  listenerOfReset() {
    this.element.addEventListener('click', (e) => DOM.resetForm(e));
  }

  listenerOfСhange() {
    this.element.addEventListener('click', (e) => Logic.changeProduct(e));
  }

  static changeProduct(e) {
    if (e.target.classList.contains('change-button')) {
      DOM.renderPopUp();
      DOM.completeForm(e);
    }
  }

  listenerOfDelete() {
    this.element.addEventListener('click', (e) => DOM.deleteProduct(e));
  }
}
