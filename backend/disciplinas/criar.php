<?php 
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../config/database.php';
    include_once '../objects/disciplina.php';

    $database = new Database();
    $db = $database->getConnection();

    $disciplina = new Disciplina($db);

    $data = json_decode(file_get_contents("php://input"));

    if(!empty($data->nome)) {
        $disciplina->nome = $data->nome;

        if($disciplina->create()){

            http_response_code(201);

            echo json_encode(array("message" => "Sucess to create disciplina"));
        }
        else {
            
            http_response_code(503);

            echo json_encode(array("message" => "Service unavailable"));
        }
    }
    else {

        http_response_code(400);

        echo json_encode(array("message" => "Data is incomplete")); 
    }
