<?php 

    //INSERTAR MEDICIONES

//verificar si la peticion esta definida
if (!isset($peticion)) {
    //error interno del servidor en el caso de que no lo este
    http_response_code(500);
    die();
}   

//conexion a la BBDD
require_once 'includes/connection.php';
if (!isset($connexion)) die();

//Obtener los valores desde los parámetros POST de la solicitud
$temperatura = $peticion->parametrosPost()['temperatura'];
$ppm = $peticion->parametrosPost()['ppm'];

//Consulta SQL, para insertar las mediciones en su respectiva tabla
$sql = "INSERT INTO `mediciones` (`id`,`id_sensor`, `temperatura`, `ppm` ,  `bateria`) VALUES (NULL,'1','$temperatura', '$ppm', '70')";

try {
    //Ejecutar la consulta para insertar los datos
    mysqli_query($connexion, $sql);
    //respuesta con éxito
    http_response_code(200);
} catch (Exception $exception) {
    //ha habido algún error
    http_response_code(500);
    die(mysqli_errno($connexion));
}