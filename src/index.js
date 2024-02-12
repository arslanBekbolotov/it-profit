import './index.scss';

document.addEventListener('DOMContentLoaded', function () {
  if (location.pathname === '/form.html') {
    console.log('form');
  }

  if (location.pathname === '/') {
    if (!localStorage.getItem('feedback')) {
      location.href = '/form.html';
    }

    const modal = document.querySelector('.modal');
    const modalTrigger = document.querySelector('.modal-trigger');
    const modalClose = document.querySelector('.modal__close');

    modalTrigger.addEventListener('click', function () {
      modal.classList.add('modal--open');
      document.body.classList.add('modal-open');
    });

    modalClose.addEventListener('click', function () {
      modal.classList.remove('modal--open');
      document.body.classList.remove('modal-open');
    });
  }
});
