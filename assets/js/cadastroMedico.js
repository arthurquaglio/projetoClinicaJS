function cadastrarMedico(nome, email, senha, especialidade) {
    const medicos = JSON.parse(localStorage.getItem('medicos')) || [];
    const novoMedico = { nome, email, senha, especialidade };
    medicos.push(novoMedico);
    localStorage.setItem('medicos', JSON.stringify(medicos));
    console.log(`Médico ${nome} cadastrado com sucesso!`);
}

// Exemplo de cadastro manual de médicos
cadastrarMedico('Dr. João Silva', 'joao@clinica.com', 'senha123', 'Cardiologia');
cadastrarMedico('Dra. Maria Oliveira', 'maria@clinica.com', 'senha123', 'Dermatologia');
