function cadastrarMedico(nome, email, senha, especialidade) {
    // Busca no localStorage uma lista de médicos já cadastrados e a converte de JSON para um array de objetos.
    // Se não houver médicos cadastrados, inicializa com um array vazio.
    const medicos = JSON.parse(localStorage.getItem('medicos')) || [];

    // Cria um novo objeto médico com as informações fornecidas.
    const novoMedico = { nome, email, senha, especialidade };

    // Adiciona o novo médico à lista de médicos existente.
    medicos.push(novoMedico);

    // Converte a lista atualizada de médicos de volta para uma string JSON e a salva no localStorage.
    localStorage.setItem('medicos', JSON.stringify(medicos));

    // Exibe uma mensagem no console para confirmar que o médico foi cadastrado com sucesso.
    console.log(`Médico ${nome} cadastrado com sucesso!`);
}

// Chamadas da função para cadastrar médicos manualmente.
cadastrarMedico('Dr. João Silva', 'joao@clinica.com', 'senha123', 'Cardiologia');
cadastrarMedico('Dra. Maria Oliveira', 'maria@clinica.com', 'senha123', 'Dermatologia');
// Precisa Cadastrar mais medicossss um para cada especialidade.