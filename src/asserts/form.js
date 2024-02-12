import IMask from 'imask';

const form = document.getElementById('feedback-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
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
    input.classList.remove('error');
    const errorDiv = document.getElementById(input.id + 'Error');

    if (errorDiv) errorDiv.innerHTML = '';
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

const sendFormData = async (message) => {
  try {
    const response = await fetch('http://localhost:9090/api/registration', {
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

    alert(data);
  } catch (error) {
    alert('Error sending form data:' + error);
  }
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  validateForm();

  if (!formHasErrors()) {
    await sendFormData();
  }
});
