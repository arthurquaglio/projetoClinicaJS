document.addEventListener('DOMContentLoaded', function() {
    const tokenUsuario = JSON.parse(localStorage.getItem('tokenUsuario'));

    if (!tokenUsuario || tokenUsuario.tipoConsulta !== 'administrador') {
        alert('Acesso restrito a médicos.');
        window.location.href = 'login.html';
        return;
    }

    const listaReservas = document.getElementById('listaReservas');

    function listarTodasReservas() {
        listaReservas.innerHTML = '';
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

        reservas.forEach((reserva, index) => {
            const li = document.createElement('li');
            li.textContent = `${reserva.nomePaciente} - ${reserva.tipoConsulta} - ${reserva.horario} em ${reserva.dataReserva}`;

            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.onclick = () => editarReserva(index);

            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.onclick = () => excluirReserva(index);

            li.appendChild(btnEditar);
            li.appendChild(btnExcluir);
            listaReservas.appendChild(li);
        });
    }

    function editarReserva(index) {
        alert(`Implementar edição de reserva ${index}`);
    }

    function excluirReserva(index) {
        let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.splice(index, 1);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        alert('Reserva excluída.');
        listarTodasReservas();
    }

    listarTodasReservas();
});
