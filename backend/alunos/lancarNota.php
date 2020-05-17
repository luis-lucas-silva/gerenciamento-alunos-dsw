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
        !empty($data->id) &&
        !empty($data->id_disciplina)){
            
            $aluno->id = $data->id;
            $aluno->id_disciplina = $data->id_disciplina;

            $aluno->nota1 = 0;
            $aluno->nota2 = 0;
            $aluno->nota3 = 0;
            if (array_key_exists("nota1", $data)){
                $aluno->nota1 = $data->nota1;
            }
            if (array_key_exists("nota2", $data)){
                $aluno->nota2 = $data->nota2;
            }
            if (array_key_exists("nota3", $data)){
                $aluno->nota3 = $data->nota3;
            }

            if($aluno->lancarNota()){

                http_response_code(200);
    
                echo json_encode(array("message" => "Sucesso para lancar notas"));
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
?>