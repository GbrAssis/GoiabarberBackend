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

// Atualizar a função validarFormulario para incluir validação da foto
function validarFormulario() {
    // Código existente de validação...

    // Adicionar validação da foto (opcional)
    const avatarPreview = document.getElementById('avatar-preview');
    if (avatarPreview.src.includes('avatar-placeholder.png')) {
        mostrarErro('avatar-error', 'Por favor, selecione uma foto de perfil');
        return false;
    }

    // Resto do código de validação...
}