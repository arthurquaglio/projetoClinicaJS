document.addEventListener('DOMContentLoaded', function() {
    const tokenUsuario = JSON.parse(localStorage.getItem('tokenUsuario'));

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!tokenUsuario) {
        alert('Por favor, faça login para acessar a página de reservas.');
        location.href = 'login.html';
    }

    // Verificar se o usuário logado é médico
    const isUsuario = usuarioLogado.tipo === 'cliente'; // O token armazena um campo 'tipo' (cliente ou médico)

    console.log(isUsuario);
    if (isUsuario) {
        exibirFormularioDeReserva();
    }

    const horariosLivres = {
        "Oftalmologia": ["09:00", "10:00", "11:00", "14:00"],
        "Cardiologia": ["09:00", "10:00", "11:00", "15:00", "16:00"],
        "Obstetricia": ["09:00", "10:00", "11:00", "15:00", "16:00"],
        "Dermatologia": ["09:00", "10:00", "11:00", "15:00", "16:00"],
        "Ortopedia": ["09:00", "10:00", "11:00", "15:00", "16:00"],
        // Outros tipos de consultas com horários
    };
    console.log(horariosLivres["Oftalmologia"]);

    function exibirFormularioDeReserva() {
        const selectConsulta = document.getElementById('tipoConsulta');
        const selectHorario = document.getElementById('horario');
        const formReserva = document.getElementById('formReserva');
        const minhasReservasList = document.getElementById('minhasReservas');
        const dataReservaInput = document.getElementById('dataReserva');

        selectConsulta.addEventListener('change', function() {
            console.log('Tipo selecionado:', selectConsulta.value);
            console.log('Horários disponíveis:', horariosLivres[selectConsulta.value]);
            const tipoSelecionado = selectConsulta.value;
            selectHorario.innerHTML = '';

            if (horariosLivres[tipoSelecionado]) {
                horariosLivres[tipoSelecionado].forEach(horario => {
                    const option = document.createElement('option');
                    option.value = horario;
                    option.textContent = horario;
                    selectHorario.appendChild(option);
                });
            }else {
                // Exibir mensagem se não houver horários disponíveis
                const option = document.createElement('option');
                option.textContent = 'Nenhum horário disponível';
                selectHorario.appendChild(option);
            }
            if (selectConsulta.value) {
                selectConsulta.dispatchEvent(new Event('change'));
            }
        });


        function isHorarioOcupado(tipoConsulta, horario, dataReserva) {
            let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
            return reservas.some(reserva =>
                reserva.tipoConsulta === tipoConsulta &&
                reserva.horario === horario &&
                reserva.dataReserva === dataReserva
            );
        }

        formReserva.addEventListener('submit', function(event) {
            event.preventDefault();

            const tipoConsulta = selectConsulta.value;
            const horario = selectHorario.value;
            const dataReserva = dataReservaInput.value;

            if (!dataReserva) {
                alert('Por favor, selecione uma data válida.');
                return;
            }

            if (isHorarioOcupado(tipoConsulta, horario, dataReserva)) {
                alert('Este horário já está reservado. Por favor, escolha outro.');
                return;
            }

            let medicos = JSON.parse(localStorage.getItem('medicos')) || [];
            let medicoSelecionado = medicos.find(medico => medico.especialidade === tipoConsulta);

            if (!medicoSelecionado) {
                alert('Nenhum médico disponível para este tipo de consulta.');
                return;
            }

            let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
            reservas.push({
                nomePaciente: tokenUsuario.email,
                tipoConsulta,
                horario,
                dataReserva,
                medico: medicoSelecionado.nome
            });

            localStorage.setItem('reservas', JSON.stringify(reservas));
            alert(`Reserva realizada com sucesso! Médico atribuído: ${medicoSelecionado.nome}`);
            listarMinhasReservas();
        });

        function listarMinhasReservas() {
            minhasReservasList.innerHTML = '';
            let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
            reservas = reservas.filter(reserva => reserva.nomePaciente === tokenUsuario.email);

            reservas.forEach(reserva => {
                const li = document.createElement('li');
                li.textContent = `${reserva.tipoConsulta} - ${reserva.horario} em ${reserva.dataReserva} (Médico: ${reserva.medico})`;
                minhasReservasList.appendChild(li);
            });
        }

        listarMinhasReservas();
    }
});
