// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', function() {
    // Recupera o token de autenticação do médico armazenado no localStorage e o converte de volta para um objeto JavaScript
    const tokenMedico = JSON.parse(localStorage.getItem('tokenMedico'));

    // Recupera as informações do médico logado armazenadas no localStorage
    const medicoLogado = JSON.parse(localStorage.getItem('medicoLogado'));

    // Verifica se o token de autenticação não está presente (usuário não logado)
    if (!tokenMedico) {
        alert('Por favor, faça login para acessar a página de reservas.'); // Exibe um alerta informando que o login é necessário
        location.href = 'login.html'; // Redireciona o usuário para a página de login
    }

    // Verifica se o usuário logado é um médico
    const isMedico = medicoLogado.tipo === 'medico';

    // Se o usuário for um médico, exibe a visão específica de reservas para ele
    if (isMedico) {
        exibirReservasParaMedico();
    }

    // Função para exibir as reservas atribuídas ao médico logado
    function exibirReservasParaMedico() {
        // Recupera a lista de reservas do localStorage ou inicializa como uma lista vazia
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        // Filtra as reservas que correspondem ao médico logado
        const reservasMedico = reservas.filter(reserva => reserva.medico === medicoLogado.nome);


        // Obtém o elemento do DOM onde as reservas serão exibidas
        const reservasContainer = document.getElementById('reservasMedico');
        reservasContainer.innerHTML = ''; // Limpa o conteúdo atual do contêiner

        // Itera sobre cada reserva do médico para criar elementos de exibição
        reservasMedico.forEach(reserva => {
            // Encontra o índice da reserva na lista geral de reservas para uso em edição
            const index = reservas.findIndex(r =>
                r.nomePaciente === reserva.nomePaciente &&
                r.tipoConsulta === reserva.tipoConsulta &&
                r.horario === reserva.horario &&
                r.dataReserva === reserva.dataReserva &&
                r.medico === reserva.medico
            );

            // Cria um elemento de div para exibir os detalhes da reserva
            const divReserva = document.createElement('div');
            divReserva.className = 'reservas';
            divReserva.textContent = `Paciente: ${reserva.nomePaciente} - ${reserva.tipoConsulta} - ${reserva.horario} em ${reserva.dataReserva}`;

            // Cria um botão de edição e define seu evento de clique
            const btnEditar = document.createElement('button');
            btnEditar.className = 'buttonsMedico';
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', function() {
                editarReserva(reserva, index);
            });

            // Cria um botão de exclusão e define seu evento de clique
            const btnExcluir = document.createElement('button');
            btnExcluir.className = 'buttonsMedico';
            btnExcluir.textContent = 'Excluir';
            btnExcluir.addEventListener('click', function() {
                excluirReserva(reserva);
            });

            // Adiciona os botões de edição e exclusão à div da reserva
            divReserva.appendChild(btnEditar);
            divReserva.appendChild(btnExcluir);
            // Adiciona a div ao contêiner de reservas
            reservasContainer.appendChild(divReserva);
        });
    }

    // Função para editar uma reserva específica
    function editarReserva(reservaParaEditar, index) {
        // Solicita ao usuário uma nova data e horário para a reserva, com valores padrões
        const novaData = prompt('Digite a nova data (YYYY-MM-DD):', reservaParaEditar.dataReserva);
        const novoHorario = prompt('Digite o novo horário (HH:MM):', reservaParaEditar.horario);

        // Verifica se as novas informações são válidas
        if (novaData && novoHorario) {
            // Recupera a lista de reservas do localStorage
            let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
            // Atualiza a data e o horário da reserva no índice específico
            reservas[index].dataReserva = novaData;
            reservas[index].horario = novoHorario;

            // Salva as reservas atualizadas no localStorage
            localStorage.setItem('reservas', JSON.stringify(reservas));
            alert('Reserva editada com sucesso!'); // Informa o sucesso da edição
            exibirReservasParaMedico(); // Atualiza a exibição das reservas
        } else {
            alert('Edição cancelada. Por favor, insira valores válidos.'); // Alerta de cancelamento se valores não forem válidos
        }
    }

    // Função para excluir uma reserva específica
    function excluirReserva(reservaParaExcluir) {
        // Recupera a lista de reservas do localStorage
        let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        // Filtra a lista removendo a reserva especificada
        reservas = reservas.filter(reserva =>
            reserva.nomePaciente !== reservaParaExcluir.nomePaciente ||
            reserva.tipoConsulta !== reservaParaExcluir.tipoConsulta ||
            reserva.horario !== reservaParaExcluir.horario ||
            reserva.dataReserva !== reservaParaExcluir.dataReserva
        );
        // Salva a lista de reservas atualizada no localStorage
        localStorage.setItem('reservas', JSON.stringify(reservas));
        alert('Reserva excluída com sucesso!'); // Informa o sucesso da exclusão
        exibirReservasParaMedico(); // Atualiza a exibição das reservas
    }
});
