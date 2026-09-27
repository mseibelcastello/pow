<?php

$contenido = file_get_contents("php://input");    //recibe lo del javascript
$datos = json_decode($contenido, true);                 //convierte lo recibido en dato con indice 

$archivo = file_get_contents("datos.json");     //lee lo que esta guardado en datos.json
$datos_json = json_decode($archivo, true);      //lo convierte en dato con indice

if (array_key_exists("minimo", $datos) && array_key_exists("maximo", $datos)) {
    $datos_json["minimo"] = $datos["minimo"];
    $datos_json["maximo"] = $datos["maximo"];
}

if (isset($datos["numeros"])) {
    $datos_json["numeros"] = $datos["numeros"];
}

$nuevo_json = json_encode($datos_json, JSON_PRETTY_PRINT); //codifica los datos (contrario a decode)
file_put_contents("datos.json", $nuevo_json);               //escribe este json codificado en el archivo

?>