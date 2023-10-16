<?php

/*
    Conexión a la base de datos
*/

$bbdd_servidor = 'localhost'; 
$bbdd_nombre = 'sprint0_pbiometria'; // Nombre de la BBDD
$bbdd_user = 'root'; 
$bbdd_password = ''; 

try {
    //intenta conectarse a la BBDD
    $connexion = mysqli_connect($bbdd_servidor, $bbdd_user, $bbdd_password, $bbdd_nombre);
} catch (Exception $e) {
    //si hay algun error, lo muestra
    http_response_code(500);
    die("Error: " . mysqli_connect_errno() . " " . mysqli_connect_error());
}

mysqli_query($connexion, 'SET NAMES utf8mb4');