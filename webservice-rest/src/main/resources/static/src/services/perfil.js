// Initialize profile data
function initializeProfile() {
    // Set profile information
    const payload = getTokenPayload();
    document.getElementById('profile-name').textContent = payload.nome;
    document.getElementById('display-nome').textContent = payload.nome;
    document.getElementById('display-email').textContent = payload.sub;
    document.getElementById('display-telefone').textContent = payload.telefone;
    document.getElementById('display-nascimento').textContent = payload.nascimento;
    
    // Set avatar
    const avatarPreview = document.getElementById('avatar-preview');
    avatarPreview.src = userData.avatar;
    
    // Set form values for edit mode
    document.getElementById('edit-nome').value = userData.nome;
    document.getElementById('edit-email').value = userData.email;
    document.getElementById('edit-telefone').value = userData.telefone;
    document.getElementById('edit-nascimento').value = userData.nascimento;
}

// Toggle edit mode
window.toggleEditMode = () => {
    const viewMode = document.getElementById('view-mode');
    const editMode = document.getElementById('edit-mode');
    
    if (viewMode.style.display !== 'none') {
        viewMode.style.display = 'none';
        editMode.style.display = 'block';
    } else {
        viewMode.style.display = 'block';
        editMode.style.display = 'none';
    }
};

// Save changes
window.salvarAlteracoes = () => {
    // Get updated values
    const updatedData = {
        ...userData,
        nome: document.getElementById('edit-nome').value,
        email: document.getElementById('edit-email').value,
        telefone: document.getElementById('edit-telefone').value,
        nascimento: document.getElementById('edit-nascimento').value
    };

    // Update cookie with new data
    document.cookie = `userData=${JSON.stringify(updatedData)};path=/;max-age=${7 * 24 * 60 * 60}`; // 7 days

    // Update display
    document.getElementById('profile-name').textContent = updatedData.nome;
    document.getElementById('display-nome').textContent = updatedData.nome;
    document.getElementById('display-email').textContent = updatedData.email;
    document.getElementById('display-telefone').textContent = updatedData.telefone;
    document.getElementById('display-nascimento').textContent = updatedData.nascimento;

    // Switch back to view mode
    toggleEditMode();
};

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
    const token = localStorage.getItem('token');
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
console.log(payload);
// payload.nome, payload.email, payload.tipo, etc. 