document.addEventListener('DOMContentLoaded', function() {
    const tokenMedico = JSON.parse(localStorage.getItem('tokenMedico'));

    const medicoLogado = JSON.parse(localStorage.getItem('medicoLogado'));

    if (!tokenMedico) {
        alert('Por favor, faça login para acessar a página de reservas.');
        location.href = 'login.html';
    }

    // Verificar se o usuário logado é médico
    const isMedico = medicoLogado.tipo === 'medico';

    if (isMedico) {
        // Médicos têm acesso a uma visão diferente para edição de reservas
        exibirReservasParaMedico();
    }

    function exibirReservasParaMedico() {
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        const reservasMedico = reservas.filter(reserva => reserva.medico === medicoLogado.nome);
        console.log(reservas)
        console.log(reservasMedico)
        const reservasContainer = document.getElementById('reservasMedico');
        reservasContainer.innerHTML = '';

        reservasMedico.forEach(reserva => {
            const index = reservas.findIndex(r =>
                r.nomePaciente === reserva.nomePaciente &&
                r.tipoConsulta === reserva.tipoConsulta &&
                r.horario === reserva.horario &&
                r.dataReserva === reserva.dataReserva &&
                r.medico === reserva.medico
            );

            const divReserva = document.createElement('div');
            divReserva.textContent = `Paciente: ${reserva.nomePaciente} - ${reserva.tipoConsulta} - ${reserva.horario} em ${reserva.dataReserva}`;

            //botões de edição e exclusão (CRUD)
            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', function (){
                editarReserva(reserva, index)
            });

            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.addEventListener('click', function() {
                excluirReserva(reserva);
            });

            divReserva.appendChild(btnEditar);
            divReserva.appendChild(btnExcluir);
            reservasContainer.appendChild(divReserva);
        });
    }

    function editarReserva(reservaParaEditar, index) {
        const novaData = prompt('Digite a nova data (YYYY-MM-DD):', reservaParaEditar.dataReserva);
        const novoHorario = prompt('Digite o novo horário (HH:MM):', reservaParaEditar.horario);

        if (novaData && novoHorario) {
            let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
            reservas[index].dataReserva = novaData;
            reservas[index].horario = novoHorario;

            localStorage.setItem('reservas', JSON.stringify(reservas));
            alert('Reserva editada com sucesso!');
            exibirReservasParaMedico();
        } else {
            alert('Edição cancelada. Por favor, insira valores válidos.');
        }
    }


    function excluirReserva(reservaParaExcluir) {
        let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas = reservas.filter(reserva =>
            reserva.nomePaciente !== reservaParaExcluir.nomePaciente ||
            reserva.tipoConsulta !== reservaParaExcluir.tipoConsulta ||
            reserva.horario !== reservaParaExcluir.horario ||
            reserva.dataReserva !== reservaParaExcluir.dataReserva
        );
        localStorage.setItem('reservas', JSON.stringify(reservas));
        alert('Reserva excluída com sucesso!');
        exibirReservasParaMedico();
    }
});
