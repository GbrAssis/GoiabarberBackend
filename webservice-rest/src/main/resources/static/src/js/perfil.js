import { getCookie } from '../services/auth.js';

// Get user data from cookies
const data = getCookie('userData');
console.log(data);
const userData = JSON.parse(data) || 'null';
console.log(userData)
// Redirect to login if no user data found
if (!userData) {
    window.location.href = '/index.html';
}

// Initialize profile data
function initializeProfile() {
    // Set profile information
    document.getElementById('profile-name').textContent = userData.nome;
    document.getElementById('display-nome').textContent = userData.nome;
    document.getElementById('display-email').textContent = userData.email;
    document.getElementById('display-telefone').textContent = userData.telefone;
    document.getElementById('display-nascimento').textContent = userData.nascimento;
    
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