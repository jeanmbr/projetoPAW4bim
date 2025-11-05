document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let isValid = true;
    
    // Validação de campos vazios
    if (!email) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }
    
    if (!password) {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }
    
    if (isValid) {
        // Aqui você fará a chamada para o backend
        console.log('Tentativa de login:', { email, password });
        // Simulando login bem-sucedido
        window.location.href = 'index.html';
    }
});