<?php

// OBTENER MEDICIONES

//verificar si la peticion esta definida
if (!isset($peticion)) {
    //error interno del servidor en el caso de que no lo este
    http_response_code(500);
    die();
}

//conexion a la BBDD
require_once 'includes/connection.php';
if (!isset($connexion)) die();

// Obtener el ID del sensor desde los parámetros en la URL
$id = intval($peticion->parametrosPath()[0]);

//Consulta SQL, obtener todos los datos de la tabla mediciones cuya id sea igual a la que le pasemos
$sql = "SELECT * FROM `mediciones` WHERE `mediciones`.`id_sensor` = $id";

// Recorrer y almacenar los resultados
$result = mysqli_query($connexion, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $salida[] = $row;
}