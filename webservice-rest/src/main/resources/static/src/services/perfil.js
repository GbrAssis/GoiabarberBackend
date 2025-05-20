function initializeProfile() {

    const payload = getTokenPayload();
    console.log("payload", payload);
    document.getElementById('profile-name').textContent = payload.nome;
    document.getElementById('display-nome').textContent = payload.nome;
    document.getElementById('display-email').textContent = payload.sub;
    document.getElementById('display-telefone').textContent = payload.telefone;
    document.getElementById('display-nascimento').textContent = payload.nascimento;
    
    const avatarPreview = document.getElementById('avatar-preview');
    avatarPreview.src = userData.avatar;
    
    document.getElementById('edit-nome').value = userData.nome;
    document.getElementById('edit-email').value = userData.email;
    document.getElementById('edit-telefone').value = userData.telefone;
    document.getElementById('edit-nascimento').value = userData.nascimento;
}

window.toggleEditMode = () => {
    const viewMode = document.getElementById('view-mode');
    const editMode = document.getElementById('edit-mode');
    
    if (viewMode.style.display !== 'none') {
        // Preenche os campos de edição com os valores atuais
        document.getElementById('edit-nome').value = document.getElementById('display-nome').textContent;
        document.getElementById('edit-email').value = document.getElementById('display-email').textContent;
        document.getElementById('edit-telefone').value = document.getElementById('display-telefone').textContent;
        document.getElementById('edit-nascimento').value = document.getElementById('display-nascimento').textContent;
        
        viewMode.style.display = 'none';
        editMode.style.display = 'block';
    } else {
        viewMode.style.display = 'block';
        editMode.style.display = 'none';
    }
};

async function atualizarPerfil(updatedData) {
    const payload = getTokenPayload();
    if (!payload || !payload.id) {
        alert('Não foi possível identificar o usuário.');
        return;
    }
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`/login/users/${payload.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: JSON.stringify(updatedData)
        });
        if (!response.ok) {
            const errorText = await response.text();
            alert('Erro ao atualizar perfil: ' + errorText);
            return;
        }
        const user = await response.json();
        // Atualiza o cookie/localStorage se necessário
        document.cookie = `userData=${JSON.stringify(user)};path=/;max-age=${7 * 24 * 60 * 60}`;
        alert('Perfil atualizado com sucesso!');
    } catch (error) {
        alert('Erro ao atualizar perfil: ' + error.message);
    }
}

// Salvar alterações e enviar para o backend
window.salvarAlteracoes = () => {
    // Validações básicas
    const nome = document.getElementById('edit-nome').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const telefone = document.getElementById('edit-telefone').value.trim().replace(/\D/g, ''); // Remove tudo que não for número
    const nascimento = document.getElementById('edit-nascimento').value;

    // Validações
    if (!nome) {
        alert('Por favor, preencha o nome completo.');
        return;
    }

    if (!email) {
        alert('Por favor, preencha o e-mail.');
        return;
    }

    if (!email.includes('@')) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    if (!telefone) {
        alert('Por favor, preencha o telefone.');
        return;
    }

    if (telefone.length !== 11) {
        alert('O telefone deve conter exatamente 11 números (DDD + número).');
        return;
    }

    if (!nascimento) {
        alert('Por favor, preencha a data de nascimento.');
        return;
    }

    // Atualiza os dados no frontend
    document.getElementById('profile-name').textContent = nome;
    document.getElementById('display-nome').textContent = nome;
    document.getElementById('display-email').textContent = email;
    document.getElementById('display-telefone').textContent = telefone;
    document.getElementById('display-nascimento').textContent = nascimento;

    // Atualiza o userData
    window.userData = {
        ...window.userData,
        nome: nome,
        email: email,
        telefone: telefone,
        nascimento: nascimento
    };

    // Volta para o modo de visualização
    toggleEditMode();
    alert('Perfil atualizado com sucesso!');
};

// Adiciona validação em tempo real para o campo de telefone
document.getElementById('edit-telefone').addEventListener('input', function(e) {
    // Remove tudo que não for número
    let value = e.target.value.replace(/\D/g, '');
    
    // Limita a 11 números
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    
    // Atualiza o valor do campo
    e.target.value = value;
});

// Handle avatar change
document.getElementById('avatar-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const avatarPreview = document.getElementById('avatar-preview');
            avatarPreview.src = e.target.result;
            
            // Update userData with new avatar
            const updatedData = {
                ...userData,
                avatar: e.target.result
            };
            
            // Update cookie with new avatar
            document.cookie = `userData=${JSON.stringify(updatedData)};path=/;max-age=${7 * 24 * 60 * 60}`;
        };
        reader.readAsDataURL(file);
    }
});

// Initialize profile when page loads
document.addEventListener('DOMContentLoaded', initializeProfile);

function getTokenPayload() {
    const token = localStorage.getItem('userData');
    console.log(token);
    if (!token) return null;

    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return null;

    // Decodifica Base64Url para Base64
    let base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    // Adiciona padding se necessário
    while (base64.length % 4) {
        base64 += '=';
    }

    try {
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

// Exemplo de uso:
const payload = getTokenPayload();
