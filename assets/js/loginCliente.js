document.getElementById('form-login').addEventListener('submit', function(event) {
    event.preventDefault();

    // Coletar dados do formulário de login
    const email = document.getElementById('email-login').value;
    const senha = document.getElementById('senha-login').value;

    // Carregar usuários do localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar se as credenciais estão corretas
    const usuarioValido = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);
    console.log(usuarioValido);

    if (usuarioValido) {
        alert(`Bem-vindo, ${usuarioValido.nome}!`);
        window.location.href = '../projetoClinicaJS/index.html'; // Redirecionar para a página desejada
    } else {
        alert('Email ou senha incorretos.');
    }
});
