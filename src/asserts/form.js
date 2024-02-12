import IMask from 'imask';
import './form.scss';

const form = document.getElementById('feedback-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const apiUrl = 'http://localhost:9090/api/registration';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const phoneMask = new IMask(phoneInput, {
  mask: '+{7}(000)000-00-00',
});

const showError = (input, message) => {
  input.classList.add('error');
  const errorDiv = document.getElementById(input.id + 'Error');

  if (errorDiv) errorDiv.innerHTML = message;
};

const resetErrors = () => {
  const inputs = document.querySelectorAll('#name, #email, #phone, #message');

  inputs.forEach((input) => {
    showError(input, '');
  });
};

const validateForm = () => {
  resetErrors();

  if (!nameInput.value) {
    showError(nameInput, 'Имя обязательно поле');
  }

  if (!emailInput.value && emailRegex.test(emailInput.innerHTML)) {
    showError(emailInput, 'Почта обязательное поле');
  }

  if (!phoneMask.masked.isComplete) {
    showError(phoneInput, 'Номер телефона обязательное поле, возможно вы вели неверный номер');
  }

  if (!messageInput.value) {
    showError(messageInput, 'Сообщение обязательное поле');
  }
};

const formHasErrors = () => {
  const errorInputs = document.querySelectorAll('.error');
  return errorInputs.length > 0;
};

const showAlert = (status, message) => {
  const alertElement = document.createElement('div');
  alertElement.classList.add('custom-alert', `custom-alert--${status}`);
  alertElement.innerText = message;

  document.body.appendChild(alertElement);

  setTimeout(() => {
    document.body.removeChild(alertElement);
  }, 3000);
};

const sendFormData = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneMask.unmaskedValue,
        message: messageInput.value,
      }),
    });

    const data = await response.json();

    if (data.status) localStorage.setItem('status', JSON.stringify(data.status));
    showAlert(data.status, data.message);
    form.reset();
    setTimeout(() => {
      location.href = '/';
    }, 2200);
  } catch (error) {
    console.error('Что-то пошло не так');
  }
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  validateForm();

  if (!formHasErrors()) {
    await sendFormData();
  }
});
