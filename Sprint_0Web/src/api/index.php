<?php
/*
    se encarga de gestionar una solicitud REST y responder a ella.
*/

//Incluir la clase PeticionREST
require_once 'includes/PeticionREST.inc';

// Crear una instancia de PeticionREST
$peticion = new PeticionREST('api');

// Obtener el recurso y el método de la solicitud
$recurso = $peticion->recurso();
$metodo = strtolower($peticion->metodo());

//array para almacenar la salida
$salida = [];

// archivo a importar según el recurso solicitado
$file = "laLogica/$recurso.$metodo.inc";

// Prueba de si funciona
if(!file_exists($file)) {
    http_response_code(400);
    die();
}

// importar el archivo
require_once $file;

//Cabecera de la respuesta como JSON
header('Content-Type: application/json; charset=utf-8');

//convertir el array de salida en un json
echo json_encode($salida);