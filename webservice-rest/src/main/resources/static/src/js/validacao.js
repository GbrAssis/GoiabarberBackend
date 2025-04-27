// Adicione no início do arquivo
document.addEventListener('DOMContentLoaded', function() {
    // Configurar preview da imagem
    document.getElementById('avatar-input').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('avatar-preview').src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
});

function mostrarErro(id, mensagem) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = mensagem;
        el.style.display = 'block';
    }
}

function limparErros() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
}

async function validarFormulario() {
    limparErros();
    let valido = true;

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    const avatarInput = document.getElementById('avatar-input');
    const avatarPreview = document.getElementById('avatar-preview');

    if (!nome) {
        mostrarErro('nome-error', 'Por favor, preencha o nome completo');
        valido = false;
    }
    if (!email) {
        mostrarErro('email-error', 'Por favor, preencha o e-mail');
        valido = false;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        mostrarErro('email-error', 'E-mail inválido');
        valido = false;
    }
    if (!telefone) {
        mostrarErro('telefone-error', 'Por favor, preencha o telefone');
        valido = false;
    }
    if (!senha) {
        mostrarErro('senha-error', 'Por favor, preencha a senha');
        valido = false;
    }
    if (!confirmarSenha) {
        mostrarErro('confirmar-senha-error', 'Por favor, confirme a senha');
        valido = false;
    } else if (senha !== confirmarSenha) {
        mostrarErro('confirmar-senha-error', 'As senhas não coincidem');
        valido = false;
    }
    if (avatarPreview.src.includes('avatar-placeholder.png')) {
        mostrarErro('avatar-error', 'Por favor, selecione uma foto de perfil');
        valido = false;
    }

    if (!valido) return false;

    // Enviar dados para o backend
    let avatarBase64 = '';
    if (avatarInput.files && avatarInput.files[0]) {
        avatarBase64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(avatarInput.files[0]);
        });
    }

    const payload = {
        nome,
        email,
        telefone,
        senha,
        tipo: 'cliente',
        avatar: avatarBase64
    };

    try {
        const response = await fetch('/login/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const errorText = await response.text();
            alert('Erro ao criar conta: ' + errorText);
            return false;
        }
        alert('Conta criada com sucesso!');
        window.location.href = './index.html';
    } catch (error) {
        alert('Erro ao criar conta: ' + error.message);
    }
    return false;
}

window.mostrarErro = mostrarErro;
window.validarFormulario = validarFormulario;