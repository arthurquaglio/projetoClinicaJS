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
cadastrarMedico('Dr. Maria Almeida', 'maria.oftalmologia@clinica.com', 'senha123', 'Oftalmologia');
cadastrarMedico('Dr. João Silva', 'joao.cardiologia@clinica.com', 'senha123', 'Cardiologia');
cadastrarMedico('Dr. Pedro Santos', 'pedro.obstetricia@clinica.com', 'senha123', 'Obstetricia');
cadastrarMedico('Dr. Ana Costa', 'ana.dermatologia@clinica.com', 'senha123', 'Dermatologia');
cadastrarMedico('Dr. Lucas Oliveira', 'lucas.ortopedia@clinica.com', 'senha123', 'Ortopedia');
cadastrarMedico('Dr. Beatriz Souza', 'beatriz.pediatria@clinica.com', 'senha123', 'Pediatria');
cadastrarMedico('Dr. Felipe Andrade', 'felipe.endocrinologia@clinica.com', 'senha123', 'Endocrinologia');
cadastrarMedico('Dr. Clara Rodrigues', 'clara.ginecologia@clinica.com', 'senha123', 'Ginecologia');
cadastrarMedico('Dr. Bruno Ribeiro', 'bruno.neurologia@clinica.com', 'senha123', 'Neurologia');
cadastrarMedico('Dr. Julia Ferreira', 'julia.gastroenterologia@clinica.com', 'senha123', 'Gastroenterologia');
cadastrarMedico('Dr. Rafael Mendes', 'rafael.psiquiatria@clinica.com', 'senha123', 'Psiquiatria');
cadastrarMedico('Dr. Camila Lima', 'camila.reumatologia@clinica.com', 'senha123', 'Reumatologia');
cadastrarMedico('Dr. Gabriel Martins', 'gabriel.urologia@clinica.com', 'senha123', 'Urologia');
cadastrarMedico('Dr. Daniela Pereira', 'daniela.otorrino@clinica.com', 'senha123', 'Otorrinolaringologia');
cadastrarMedico('Dr. Henrique Barbosa', 'henrique.hematologia@clinica.com', 'senha123', 'Hematologia');
cadastrarMedico('Dr. Fernanda Carvalho', 'fernanda.nefrologia@clinica.com', 'senha123', 'Nefrologia');