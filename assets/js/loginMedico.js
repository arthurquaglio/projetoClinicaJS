document.getElementById('formLogin').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Recuperar listas de usuários e médicos
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const medicos = JSON.parse(localStorage.getItem('medicos')) || [];

    // Verificar se o login é de um médico
    const isMedico = medicos.some(medico => medico.email === email && medico.senha === senha);

    if (isMedico) {
        const medicoLogado = medicos.find(medico => medico.email === email);
        localStorage.setItem('usuarioLogado', JSON.stringify({ ...medicoLogado, tipo: 'medico' }));
        alert('Login de médico bem-sucedido!');
        window.location.href = 'paginaMedico.html'; // Página específica para médicos
        return;
    }

    // Verificar se o login é de um cliente comum
    const isUsuario = usuarios.some(usuario => usuario.email === email && usuario.senha === senha);

    if (isUsuario) {
        const usuarioLogado = usuarios.find(usuario => usuario.email === email);
        localStorage.setItem('usuarioLogado', JSON.stringify({ ...usuarioLogado, tipo: 'cliente' }));
        alert('Login de cliente bem-sucedido!');
        window.location.href = 'paginaReservas.html'; // Página para clientes
    } else {
        alert('Email ou senha incorretos. Tente novamente.');
    }
});
