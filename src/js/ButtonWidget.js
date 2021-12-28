export default class ButtonWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup() {
    return `
    <div class="submit-box">
    <div class="popovers"><h2 class="popovers__title">Popover title</h2><p class="popovers__text">And here's some amazing content. It's very engaging. Right?</p></div>
    <button type="submit" class="submit">Click to toggle popover</button>
    </div>
    `;
  }

  static get submitSelector() {
    return '.submit';
  }

  static get popoversSelector() {
    return '.popovers';
  }

  bindToDOM() {
    this.parentEl.innerHTML = this.constructor.markup;
    const submit = this.parentEl.querySelector(this.constructor.submitSelector);
    submit.addEventListener('click', (e) => this.onSubmit(e));
  }

  onSubmit(e) {
    e.preventDefault();
    if (e.target.classList.contains('submit')) {
      const popovers = document.querySelector(this.constructor.popoversSelector);
      popovers.classList.toggle('active');
      const top = -(popovers.offsetTop + 1.1 * popovers.offsetHeight);
      popovers.style.top = `${top}px`;
    }
  }
}
