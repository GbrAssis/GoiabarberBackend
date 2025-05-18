async function cadastrarUsuario() {
    // Coleta os dados dos campos
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    // Limpa mensagens de erro
    document.getElementById('nome-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('telefone-error').textContent = '';
    document.getElementById('senha-error').textContent = '';
    document.getElementById('confirmar-senha-error').textContent = '';

    // Validação simples
    let hasError = false;
    if (!nome) {
        document.getElementById('nome-error').textContent = 'Nome obrigatório';
        hasError = true;
    }
    if (!email) {
        document.getElementById('email-error').textContent = 'E-mail obrigatório';
        hasError = true;
    }
    if (!telefone) {
        document.getElementById('telefone-error').textContent = 'Telefone obrigatório';
        hasError = true;
    }
    if (!senha) {
        document.getElementById('senha-error').textContent = 'Senha obrigatória';
        hasError = true;
    }
    if (senha !== confirmarSenha) {
        document.getElementById('confirmar-senha-error').textContent = 'As senhas não coincidem';
        hasError = true;
    }
    if (hasError) return;

    // Monta o payload conforme esperado pelo backend
    const payload = {
        nome,
        email,
        telefone,
        senha,
        tipo: 'cliente' // ou 'user', ajuste conforme o backend espera
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
            return;
        }
        alert('Conta criada com sucesso!');
        window.location.href = './index.html';
    } catch (error) {
        alert('Erro ao criar conta: ' + error.message);
    }
} 