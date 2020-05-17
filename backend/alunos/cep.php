<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$data_j = json_decode(file_get_contents("php://input"));

$cep = $data_j->cep;

$data = json_decode(file_get_contents("https://viacep.com.br/ws/" . $cep . "/json/"));

http_response_code(200);

echo json_encode($data);
