<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Credentials: true");
    header('Content-Type: application/json');

    include_once '../config/database.php';
    include_once '../objects/aluno.php';

    $database = new Database();
    $db = $database->getConnection();
    
    $aluno = new Aluno($db);
    
    $aluno->id = isset($_GET['idAluno']) ? $_GET['idAluno'] : die();
    $aluno->id_disciplina = isset($_GET['idDisciplina']) ? $_GET['idDisciplina'] : die();
    
    $stmt = $aluno->relatorioUm();
    $row_count = $stmt->rowCount();
    
    if($row_count>0){

        $alunos_arr=array();
        $alunos_arr["data"]=array();
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $aluno_item=array(
                "idAluno" => $idAluno, 
                "nome" => $nomeAluno, 
                "idDisciplina" => $idDisciplina,
                "nomeDisciplina" => $nomeDisciplina,
                "nota1" => $nota1,
                "nota2" => $nota2,
                "nota3" => $nota3,
                "media" => $media,
                "conceito" => $conceito );

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
