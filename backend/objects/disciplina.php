<?php 
    class Disciplina {
        private $conn;
        private $table_name = "disciplina"; 

        public $id;
        public $nome;

        public function __construct($db){
            $this->conn = $db;
        }

        function read() {
            $query = "SELECT * FROM {$this->table_name}";
    
            $stmt = $this->conn->prepare($query);
            
            $stmt->execute();
            
            return $stmt;
        }

        function create() {

            $query = "INSERT INTO `disciplina` (`idDisciplina`, `nomeDisciplina`)" .
            "VALUES (NULL, '". $this->nome ."')";

            $stmt = $this->conn->prepare($query);
            
            if($stmt->execute()){ 
                return true;
            }
    
            return false;
        }

    }
