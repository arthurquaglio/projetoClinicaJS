// Seleciona o elemento do formulário pelo ID 'form-cadastro'
const form = document.querySelector('#form-cadastro');

// Adiciona um evento de escuta para o evento 'submit' do formulário
form.addEventListener('submit', function(event) {
    // Evita que o formulário seja enviado da maneira tradicional (recarregando a página)
    event.preventDefault();

    // Coleta os valores dos campos de entrada do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Verifica se todos os campos estão preenchidos; caso contrário, exibe um alerta e interrompe a execução
    if (!nome || !email || !senha) {
        alert('Por favor, preencha todos os campos!');
        return; // Retorna para impedir a continuação do código
    }

    // Tenta carregar os dados de usuários existentes do localStorage; se não houver dados, inicializa um array vazio
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se o email informado já está cadastrado
    const emailExistente = usuarios.find(usuario => usuario.email === email);
    if (emailExistente) {
        // Exibe um alerta caso o email já exista e interrompe a execução
        alert('Este email já está cadastrado!');
        return; // Retorna para impedir a continuação do código
    }

    // Adiciona um novo objeto de usuário (contendo nome, email e senha) ao array de usuários
    usuarios.push({ nome, email, senha });

    // Converte o array atualizado em uma string JSON e armazena-o de volta no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Exibe um alerta informando que o cadastro foi realizado com sucesso
    alert('Cadastro realizado com sucesso!');

    // Reseta o formulário para limpar os campos
    document.getElementById('form-cadastro').reset();
});
