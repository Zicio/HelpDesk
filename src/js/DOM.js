export default class DOM {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    } else {
      this.element = element;
    }
  }

  static saveProduct(e) {
    const popUp = e.target.closest('.popup');
    popUp.remove();
    DOM.renderProducts();
  }

  static renderHint(invalid) {
    for (const field of invalid) {
      const parent = field.offsetParent;
      const hint = document.createElement('div');
      hint.classList.add('form__hint');
      hint.textContent = field.dataset.validityMessage;
      parent.appendChild(hint);
      const { top, left } = field.getBoundingClientRect();
      hint.style.top = `${window.scrollY + top + field.offsetHeight / 2 - hint.offsetHeight}px`;
      hint.style.left = `${window.scrollX + left + field.offsetWidth}px`;
      hint.style.fontSize = '17px';
      hint.style.color = 'red';
    }
  }

  static resetForm(e) {
    const popUp = document.querySelector('.popup');
    if (e.target.classList.contains('form__reset')) {
      e.preventDefault();
      popUp.remove();
    }
  }

  static completeForm(e) {
    const inputsOfForm = document.querySelector('.form').elements;
    const productName = e.target.closest('.list__product').querySelector('.product__name').textContent;
    const product = JSON.parse(localStorage.getItem(productName));
    for (let i = 0; i < inputsOfForm.length; i++) {
      inputsOfForm[i].value = product[i].value;
    }
  }

  static deleteProduct(e) {
    if (e.target.classList.contains('delete-button')) {
      const productName = e.target.closest('.list__product').querySelector('.product__name').textContent;
      e.target.closest('.list__product').remove();
      localStorage.removeItem(productName);
    }
  }

  static renderPopUp() {
    const popUpEl = '<div class=popup><form action="" class="form" id="form"><div class="form__group"><label class="form__label" for="=name">Название</label><input type="text" class="form__name input" id="name" data-validity-message="Введите корректное значение" required=""></div><div class="form__group"><label class="form__label" for="price">Стоимость</label><input type="number" class="form__price input" id="price" min="1" data-validity-message="Введите корректное значение" min="1" required=""></div></form><div class="form__button-container"><button type="button" class="form__save form__button">Сохранить</button><button type="button" class="form__reset form__button">Отмена</button></div></div>';
    document.querySelector('.list').insertAdjacentHTML('beforeend', popUpEl);
  }

  static renderProduct(productData) {
    const newRowTable = document.querySelector('.list__table > tbody');
    const ProductName = productData[0].value;
    const ProductPrice = productData[1].value;
    const newProduct = `<tr class="list__product"><th class="product__name">${ProductName}</th><th class="product__price">${+ProductPrice}</th><th><button type="button" class="change-button">&#9998</button><button type="button" class="delete-button">&#10006</button></th></tr>`;
    newRowTable.insertAdjacentHTML('beforeend', newProduct);
  }

  static renderProducts() {
    const products = document.getElementsByClassName('list__product');
    for (const product of [...products]) {
      product.remove();
    }
    const keys = Object.keys(localStorage);
    const newRowTable = document.querySelector('.list__table > tbody');
    for (const key of keys) {
      const ProductName = JSON.parse(localStorage.getItem(key))[0].value;
      const ProductPrice = JSON.parse(localStorage.getItem(key))[1].value;
      const newProduct = `<tr class="list__product"><th class="product__name">${ProductName}</th><th class="product__price">${ProductPrice}</th><th><button type="button" class="change-button">&#9998</button><button type="button" class="delete-button">&#10006</button></th></tr>`;
      newRowTable.insertAdjacentHTML('beforeend', newProduct);
    }
  }
}
