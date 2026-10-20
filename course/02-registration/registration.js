const emailInput = document.getElementById('email');
const password1Input = document.getElementById('password1');
const password2Input = document.getElementById('password2');

const toggleBtn = document.getElementById('toggle-password');

const agreeCheckbox = document.getElementById('agree');
const emailError = document.getElementById('email-error');
const password1Error = document.getElementById('password1-error');
const password2Error = document.getElementById('password2-error');

const mismatchError = document.getElementById('mismatch');
const statusEl = document.getElementById('status');

const form = document.querySelector('form');

const submitBtn = document.getElementById('submit-btn');

toggleBtn.addEventListener('click', () => {
  if (password1Input.type === 'password') {
    password1Input.type = 'text';
    toggleBtn.textContent = 'Скрыть';
    toggleBtn.setAttribute('aria-pressed', 'true');
    toggleBtn.setAttribute('aria-label', 'Скрыть пароль');
  } else {
    password1Input.type = 'password';
    toggleBtn.textContent = 'Показать';
    toggleBtn.setAttribute('aria-pressed', 'false');
    toggleBtn.setAttribute('aria-label', 'Показать пароль');
  }
});
function comparePasswords() {
  if (
    password1Input.value !== password2Input.value &&
    password1Input.value !== '' &&
    password2Input.value !== ''
  ) {
    password2Input.setCustomValidity('Пароли не совпадают');
    mismatchError.textContent = 'Пароли не совпадают';
  } else {
    password2Input.setCustomValidity('');
    mismatchError.textContent = '';
  }
}
password1Input.addEventListener('input', comparePasswords);
password2Input.addEventListener('input', comparePasswords);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  console.log('Email', formData.get('email'));
  console.log('Согласие', formData.get('agree'));

  statusEl.textContent = 'Отправка ...';

  submitBtn.disabled = true;

  setTimeout(() => {
    const isError = Math.random() < 0.5; // 50% шанс ошибки

    if (isError) {
      statusEl.textContent = 'Ошибка: email уже занят';
    } else {
      statusEl.textContent = 'Аккаунт создан';
    }

    submitBtn.disabled = false;
  }, 2000);
});

emailInput.addEventListener('invalid', (event) => {
  event.preventDefault();

  emailError.textContent = emailInput.validationMessage;

  emailInput.setAttribute('aria-invalid', 'true');
});

password1Input.addEventListener('invalid', (event) => {
  event.preventDefault();

  password1Error.textContent = password1Input.validationMessage;

  password1Input.setAttribute('aria-invalid', 'true');
});

password2Input.addEventListener('invalid', (event) => {
  event.preventDefault();

  password2Error.textContent = password2Input.validationMessage;

  password2Input.setAttribute('aria-invalid', 'true');
});

emailInput.addEventListener('input', () => {
  emailError.textContent = '';
  emailInput.setAttribute('aria-invalid', 'false');
});

password1Input.addEventListener('input', () => {
  password1Error.textContent = '';
  password1Input.setAttribute('aria-invalid', 'false');
});
password2Input.addEventListener('input', () => {
  password2Error.textContent = '';
  password2Input.setAttribute('aria-invalid', 'false');
});
