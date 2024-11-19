document.getElementById('form-login').addEventListener('submit', function(event) {
    event.preventDefault();

    // Coletar dados do formulário de login
    const email = document.getElementById('email-login').value;
    const senha = document.getElementById('senha-login').value;

    // Carregar usuários do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const medicos = JSON.parse(localStorage.getItem('medicos')) || [];


    // Verificar se o login é de um médico
    const medicoValido = medicos.find(medico => medico.email === email && medico.senha === senha);

    if (medicoValido) {
        const medicoLogado = medicos.find(medico => medico.email === email);
        localStorage.setItem('medicoLogado', JSON.stringify({ ...medicoLogado, tipo: 'medico' }));
        const token = gerarToken();
        const tokenMedico = {
            email: medicoValido.email,
            tipo: medicoLogado.tipo,
            token: token
        };
        localStorage.setItem('tokenMedico', JSON.stringify(tokenMedico));
        alert(`Login de médico bem-sucedido!`);
        window.location.href = '../projetoClinicaJS/reservaMedico.html'; // Página específica para médicos
        return;
    }


    // Verificar se as credenciais estão corretas
    const usuarioValido = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);
    console.log(usuarioValido);

    if (usuarioValido) {
        const usuarioLogado = usuarios.find(usuario => usuario.email === email);
        localStorage.setItem('usuarioLogado', JSON.stringify({ ...usuarioLogado, tipo: 'cliente' }));
        const token = gerarToken();
        const tokenUsuario = {
            email: usuarioValido.email,
            tipo: usuarioLogado.tipo,
            token: token
        };
        localStorage.setItem('tokenUsuario', JSON.stringify(tokenUsuario));
        alert(`Bem-vindo, ${usuarioValido.nome}!`);
        window.location.href = '../projetoClinicaJS/reserva.html'; // Redirecionar para a página desejada
    } else {
        alert('Email ou senha incorretos.');
    }

    function gerarToken() {
        return Math.random().toString(36).substr(2) + Date.now().toString(36);
    }
});
