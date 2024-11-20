// Executa a função após o carregamento completo do documento HTML
document.addEventListener('DOMContentLoaded', function() {

    // Recupera o token do usuário armazenado no localStorage e converte-o de volta para um objeto JavaScript
    const tokenUsuario = JSON.parse(localStorage.getItem('tokenUsuario'));

    // Recupera o objeto do usuário logado e converte-o de volta para um objeto JavaScript
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    // Verifica se o token do usuário existe; caso contrário, redireciona para a página de login
    if (!tokenUsuario) {
        alert('Por favor, faça login para acessar a página de reservas.');
        location.href = 'login.html'; // Redireciona para a página de login
    }

    // Verifica se o usuário logado é do tipo 'cliente'
    const isUsuario = usuarioLogado.tipo === 'cliente'; // O campo 'tipo' pode ter valores como 'cliente' ou 'médico'

    console.log(isUsuario); // Imprime no console para depuração
    if (isUsuario) {
        exibirFormularioDeReserva(); // Se for um cliente, exibe o formulário de reserva
    }

    // Lista de horários disponíveis para diferentes tipos de consultas
    const horariosLivres = {
        "Oftalmologia": ["09:00", "10:00", "11:00", "14:00"],
        "Cardiologia": ["09:00", "10:00", "11:00", "15:00", "16:00"],
        "Obstetricia": ["09:00", "10:00", "11:00", "15:00", "16:00"],
        "Dermatologia": ["09:00", "10:00", "11:00", "15:00", "16:00"],
        "Ortopedia": ["09:00", "10:00", "11:00", "15:00", "16:00"],
        // Precisamos colocar mais especialidades e mais horários.
    };
    console.log(horariosLivres["Oftalmologia"]); // Exibe os horários de 'Oftalmologia' no console para verificação

    // Função que exibe o formulário de reserva e configura os eventos relacionados
    function exibirFormularioDeReserva() {
        const selectConsulta = document.getElementById('tipoConsulta'); // Elemento de seleção de tipo de consulta
        const selectHorario = document.getElementById('horario'); // Elemento de seleção de horário
        const formReserva = document.getElementById('formReserva'); // Formulário de reserva
        const minhasReservasList = document.getElementById('minhasReservas'); // Lista de reservas do usuário
        const dataReservaInput = document.getElementById('dataReserva'); // Campo de entrada da data da reserva

        // Evento que é acionado quando o tipo de consulta é alterado
        selectConsulta.addEventListener('change', function() {
            console.log('Tipo selecionado:', selectConsulta.value); // Imprime o tipo de consulta selecionado
            console.log('Horários disponíveis:', horariosLivres[selectConsulta.value]); // Imprime os horários disponíveis

            const tipoSelecionado = selectConsulta.value;
            selectHorario.innerHTML = ''; // Limpa as opções de horários anteriores

            // Preenche as opções de horário com base na seleção do tipo de consulta
            if (horariosLivres[tipoSelecionado]) {
                horariosLivres[tipoSelecionado].forEach(horario => {
                    const option = document.createElement('option');
                    option.value = horario;
                    option.textContent = horario;
                    selectHorario.appendChild(option); // Adiciona a opção ao elemento select
                });
            } else {
                // Adiciona uma mensagem se não houver horários disponíveis
                const option = document.createElement('option');
                option.textContent = 'Nenhum horário disponível';
                selectHorario.appendChild(option);
            }
        });

        // Função para verificar se um horário já está reservado
        function isHorarioOcupado(tipoConsulta, horario, dataReserva) {
            let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
            return reservas.some(reserva =>
                reserva.tipoConsulta === tipoConsulta &&
                reserva.horario === horario &&
                reserva.dataReserva === dataReserva
            );
        }

        // Evento de submissão do formulário de reserva
        formReserva.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita o envio padrão do formulário

            const tipoConsulta = selectConsulta.value;
            const horario = selectHorario.value;
            const dataReserva = dataReservaInput.value;

            // Valida se a data de reserva foi selecionada
            if (!dataReserva) {
                alert('Por favor, selecione uma data válida.');
                return;
            }

            // Verifica se o horário já está reservado
            if (isHorarioOcupado(tipoConsulta, horario, dataReserva)) {
                alert('Este horário já está reservado. Por favor, escolha outro.');
                return;
            }

            // Recupera os médicos armazenados no localStorage
            let medicos = JSON.parse(localStorage.getItem('medicos')) || [];
            // Seleciona um médico que corresponde à especialidade da consulta
            let medicoSelecionado = medicos.find(medico => medico.especialidade === tipoConsulta);

            if (!medicoSelecionado) {
                alert('Nenhum médico disponível para este tipo de consulta.');
                return;
            }

            // Recupera as reservas armazenadas no localStorage e adiciona a nova reserva
            let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
            reservas.push({
                nomePaciente: tokenUsuario.email, // Nome do paciente obtido do token
                tipoConsulta,
                horario,
                dataReserva,
                medico: medicoSelecionado.nome // Nome do médico atribuído
            });

            // Atualiza as reservas no localStorage
            localStorage.setItem('reservas', JSON.stringify(reservas));
            alert(`Reserva realizada com sucesso! Médico atribuído: ${medicoSelecionado.nome}`);
            listarMinhasReservas(); // Atualiza a lista de reservas
        });

        // Função para listar as reservas do usuário logado
        function listarMinhasReservas() {
            minhasReservasList.innerHTML = ''; // Limpa a lista de reservas anteriores
            let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
            // Filtra apenas as reservas do usuário atual
            reservas = reservas.filter(reserva => reserva.nomePaciente === tokenUsuario.email);

            // Adiciona cada reserva à lista exibida na página
            reservas.forEach(reserva => {
                const li = document.createElement('li');
                li.textContent = `${reserva.tipoConsulta} - ${reserva.horario} em ${reserva.dataReserva} (Médico: ${reserva.medico})`;
                minhasReservasList.appendChild(li);
            });
        }

        // Chama a função para exibir as reservas do usuário ao carregar a página
        listarMinhasReservas();
    }
});
