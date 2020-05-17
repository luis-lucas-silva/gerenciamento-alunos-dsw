<?php 
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once '../config/database.php';
    include_once '../objects/disciplina.php';

    $database = new Database();
    $db = $database->getConnection();
    
    $disciplina = new Disciplina($db);

    $stmt = $disciplina->read();
    $row_count = $stmt->rowCount();

    if($row_count>0){

        $disciplinas_arr=array();
        $disciplinas_arr["data"]=array();
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $disciplina_item=array("idDisciplina" => $idDisciplina, "nomeDisciplina" => $nomeDisciplina);

            array_push($disciplinas_arr["data"], $disciplina_item);
        }

        http_response_code(200);

        echo json_encode($disciplinas_arr);
    }
    else {
    
        http_response_code(200);
    
        $empty_data=array();
    
        $empty_data["data"]=array();
        
        http_response_code(200);

        echo json_encode($empty_data);
    }
