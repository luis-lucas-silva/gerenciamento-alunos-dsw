<?php 
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once '../config/database.php';
    include_once '../objects/aluno.php';

    $database = new Database();
    $db = $database->getConnection();
    
    $aluno = new Aluno($db);

    $stmt = $aluno->read();
    $row_count = $stmt->rowCount();

    if($row_count>0){

        $alunos_arr=array();
        $alunos_arr["data"]=array();
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $aluno_item=array("idAluno" => $idAluno, 
            "nomeAluno" => $nomeAluno,
            "emailAluno" => $emailAluno,
            "telAluno" => $telAluno,
            "cepAluno" => $cepAluno,
            "ruaAluno" => $ruaAluno,
            "numAluno" => $numAluno,
            "bairroAluno" => $bairroAluno,
            "cidadeAluno" => $cidadeAluno,
            "estadoAluno" => $estadoAluno,
            "nomeDisciplina" => $nomeDisciplina
             );

            array_push($alunos_arr["data"], $aluno_item);
        }

        http_response_code(200);

        echo json_encode($alunos_arr);
    }
    else {
    
        http_response_code(200);
    
        $empty_data=array();
    
        $empty_data["data"]=array();
        
        http_response_code(200);

        echo json_encode($empty_data);
    }
