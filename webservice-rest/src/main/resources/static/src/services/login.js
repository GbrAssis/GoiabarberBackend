import { setCookie, getCookie, removeCookie } from './auth.js';

async function handleLogin() {
    console.log('handleLogin');
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('senha').value.trim();
    console.log(password);
    const errorMessage = document.getElementById('error-message');

    if (!email || !password) {
        errorMessage.textContent = 'Por favor, preencha todos os campos';
        errorMessage.style.display = 'block';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: password
            })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('userData', JSON.stringify(data));
            window.location.href = '/home.html';
        } else {
            errorMessage.textContent = 'Email ou senha inválidos';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        errorMessage.textContent = 'Erro ao realizar login. Tente novamente.';
        errorMessage.style.display = 'block';
        console.error('Erro:', error);
    }
}

export const logout = () => {
    removeCookie('userData');
    window.location.href = '/index.html';
};

export const initLogin = () => {
    globalThis.handleLogin = handleLogin;
    globalThis.logout = logout;
}; 

