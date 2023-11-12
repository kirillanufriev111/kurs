const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const confirmCheckbox = document.getElementById('confirmCheckbox');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (usernameValue === '') {
        setError(username, 'Введите имя пользователя');
    } else {
        setSuccess(username);
    }
    if (!confirmCheckbox.checked) {
        setError(confirmCheckbox, 'Вы обязаны подтвердить, что хотите зарегистрироваться');
    } else {
        setSuccess(confirmCheckbox);
    }

    if (emailValue === '') {
        setError(email, 'Введите ваш email');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Укажите действительный email');
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError(password, 'Введите пароль');
    } else if (!/[0-9@:-]/.test(passwordValue)) {
        setError(password, 'Пароль должен содержать хотя-бы 1 не буквенный символ')
    } else if (passwordValue.length < 8) {
        setError(password, 'Пароль должен содержать не менее 8 символов.')
    } else if (passwordValue.length > 30) {
        setError(password, 'Пароль должен содержать не больше 30 символов.')
    } else {
        setSuccess(password);
    }

    if (emailValue.length > 100) {
        setError(email, 'Email должен содержать не больше 100 символов')
    }


    if (password2Value === '') {
        setError(password2, 'Подтвердите свой пароль');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Пароли не совпадают");
    } else {
        setSuccess(password2);
    }
    if (usernameValue.length > 150) {
        setError(username, 'Фио должен содержать не больше 150 символов')
    }
    if (usernameValue !== '' && emailValue !== '' && passwordValue !== '' && password2Value !== '' && confirmCheckbox.checked) {
        localStorage.setItem('username', usernameValue);
        localStorage.setItem('email', emailValue);
        localStorage.setItem('password', passwordValue);

        form.style.display = 'none';
        const successMessage = document.createElement('h1');
        successMessage.innerText = 'Вы успешно создали аккаунт';
        document.body.appendChild(successMessage);
    }

};