<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../config/database.php';
    include_once '../objects/aluno.php';

    $database = new Database();
    $db = $database->getConnection();

    $aluno = new Aluno($db);

    $data = json_decode(file_get_contents("php://input"));
    if( 
        !empty($data->nome) &&
        !empty($data->email) &&
        !empty($data->telefone) &&
        !empty($data->cep) &&
        !empty($data->rua) &&
        !empty($data->numero) &&
        !empty($data->bairro) &&
        !empty($data->cidade) &&
        !empty($data->estado) &&
        !empty($data->id_disciplina)
        ){
        
        $aluno->nome = $data->nome;
        $aluno->email = $data->email;
        $aluno->telefone = $data->telefone;
        $aluno->cep = $data->cep;
        $aluno->rua = $data->rua;
        $aluno->numero = $data->numero;
        $aluno->bairro = $data->bairro;
        $aluno->cidade = $data->cidade;
        $aluno->estado = $data->estado;
        $aluno->id_disciplina = $data->id_disciplina;    

        if($aluno->create()){


            http_response_code(201);

            echo json_encode(array("message" => "Sucess to create aluno"));
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
