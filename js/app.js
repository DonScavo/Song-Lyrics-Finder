import * as UI from './interfaz.js';
import { API } from './api.js';
console.log(UI);



UI.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener datos del formulario
    const artista = document.querySelector('#artista').value;
    const cancion = document.querySelector('#cancion').value;

    // Si el usuario deja los campos vacios, mostrar error
    if (artista === '' || cancion === '') {
        UI.divMensajes.innerHTML = 'Error... Todos los campos son obligatorios';
        UI.divMensajes.classList.add('error');

        setTimeout(() => {
            UI.divMensajes.innerHTML = '';
            UI.divMensajes.classList.remove('error');
        }, 2000);

    } else {
        // Realizar consulta a la api
        const api = new API(artista, cancion);
        api.consultarAPI()
            .then(data => {
                if (data.respuesta.lyrics) {
                    // La canción existe
                    const letra = data.respuesta.lyrics;
                    UI.divResultado.textContent = letra;
                } else {
                    UI.divMensajes.innerHTML = 'la canción no existe, prueba con otra busqueda';
                    UI.divMensajes.classList.add('error');

                    setTimeout(() => {
                        UI.divMensajes.innerHTML = '';
                        UI.divMensajes.classList.remove('error');
                        UI.formularioBuscar.reset();
                    }, 2000);
                };
            });
    };
});