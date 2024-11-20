// Adiciona um evento ao formulário de login que é acionado quando o formulário é enviado
document.getElementById('form-login').addEventListener('submit', function(event) {
    // Impede o comportamento padrão de envio do formulário para evitar recarregar a página
    event.preventDefault();

    // Coleta os dados inseridos pelo usuário nos campos de email e senha do formulário
    const email = document.getElementById('email-login').value;
    const senha = document.getElementById('senha-login').value;

    // Carrega os dados de usuários e médicos do localStorage e os transforma em objetos JavaScript
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const medicos = JSON.parse(localStorage.getItem('medicos')) || [];

    // Verifica se as credenciais fornecidas correspondem a um médico cadastrado
    const medicoValido = medicos.find(medico => medico.email === email && medico.senha === senha);

    if (medicoValido) {
        // Se um médico for encontrado, cria um objeto para armazenar as informações do médico logado no localStorage
        const medicoLogado = medicos.find(medico => medico.email === email);
        localStorage.setItem('medicoLogado', JSON.stringify({ ...medicoLogado, tipo: 'medico' }));

        // Gera um token de autenticação para o médico
        const token = gerarToken();
        const tokenMedico = {
            email: medicoValido.email,
            tipo: medicoLogado.tipo,
            token: token
        };
        // Armazena o token de autenticação no localStorage
        localStorage.setItem('tokenMedico', JSON.stringify(tokenMedico));

        // Exibe uma mensagem de sucesso e redireciona para a página específica de médicos
        alert(`Login de médico bem-sucedido!`);
        window.location.href = '../reservaMedico.html'; // Página exclusiva para médicos
        return; // Interrompe a execução da função após o login bem-sucedido do médico
    }

    // Verifica se as credenciais fornecidas correspondem a um usuário comum cadastrado
    const usuarioValido = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);
    console.log(usuarioValido); // Exibe o usuário encontrado no console para fins de depuração

    if (usuarioValido) {
        // Se um usuário for encontrado, cria um objeto para armazenar as informações do usuário logado no localStorage
        const usuarioLogado = usuarios.find(usuario => usuario.email === email);
        localStorage.setItem('usuarioLogado', JSON.stringify({ ...usuarioLogado, tipo: 'cliente' }));

        // Gera um token de autenticação para o usuário
        const token = gerarToken();
        const tokenUsuario = {
            email: usuarioValido.email,
            tipo: usuarioLogado.tipo,
            token: token
        };
        // Armazena o token de autenticação no localStorage
        localStorage.setItem('tokenUsuario', JSON.stringify(tokenUsuario));

        // Exibe uma mensagem de boas-vindas e redireciona para a página de reservas de usuários
        alert(`Bem-vindo, ${usuarioValido.nome}!`);
        window.location.href = '../reserva.html'; // Redireciona para a página de reservas
    } else {
        // Exibe uma mensagem de erro se o email ou senha estiverem incorretos
        alert('Email ou senha incorretos.');
    }

    // Função para gerar um token de autenticação exclusivo
    function gerarToken() {
        // Gera uma string aleatória com base em valores aleatórios e o timestamp atual
        return Math.random().toString(36).substr(2) + Date.now().toString(36);
    }
});
