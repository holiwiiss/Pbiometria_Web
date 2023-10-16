/*
    * Clase para gestionar la API de sensores
 */
class medicionesMetodos {

    // URL a la que se hacen las peticiones
    url = '../../api/mediciones/';

    // Array para almacenar los datos
    sensores = [];

//-------------------------------------------------
//
//             R-> getUsuario() -> <T>
//
//-------------------------------------------------
//
// Coge las mediciones del sensor que corresponga
//
//-------------------------------------------------
    async recuperarMediciones(idSensor) {
        // Solicitud GET a la URL base pasandole la id
        const respuesta = await fetch(this.url + idSensor, {
            method: 'GET'
        });

        // Verifica si se ha podido solicitar
        if (!respuesta.ok) {
            return false;
        }

        // La respuesta en un JSON
        this.sensores = await respuesta.json();

        // Devuelve los datos
        return this.sensores;
    }
}