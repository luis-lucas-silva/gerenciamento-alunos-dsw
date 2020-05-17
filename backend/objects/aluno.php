<?php
class Aluno
{
    private $conn;
    private $table_name = "aluno";

    public $id;
    public $nome;
    public $email;
    public $telefone;
    public $cep;
    public $rua;
    public $numero;
    public $bairro;
    public $cidade;
    public $estado;
    public $id_disciplina;
    public $nota1;
    public $nota2;
    public $nota3;
    public $media;
    public $conceito = NULL;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    function read()
    {
        $query = "SELECT A.idAluno, A.nomeAluno, A.emailAluno, A.telAluno, A.cepAluno, A.ruaAluno, A.numAluno, A.bairroAluno, A.cidadeAluno, A.estadoAluno, D.nomeDisciplina " .
            "FROM `aluno` AS A INNER JOIN `aluno_has_disciplina` AS AD ON A.idAluno = AD.idAluno " .
            "INNER JOIN `disciplina` AS D ON AD.idDisciplina = D.idDisciplina";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }

    function create()
    {
        $query = "INSERT INTO `aluno` " .
            "(`idAluno`, `nomeAluno`, `emailAluno`, `telAluno`, `cepAluno`, `ruaAluno`, `numAluno`, `bairroAluno`, `cidadeAluno`, `estadoAluno`) " .
            "VALUES (NULL, '" . $this->nome . "', '" . $this->email . "', '" . $this->telefone . "', '" . $this->cep . "', '" . $this->rua . "', " . $this->numero . ", '" . $this->bairro . "', '" . $this->cidade . "', '" . $this->estado . "');" .
            " INSERT INTO `aluno_has_disciplina` (`idAluno`, `idDisciplina`, `nota1`, `nota2`, `nota3`, `media`, `conceito`) " .
            "VALUES (LAST_INSERT_ID(), " . $this->id_disciplina . ", NULL, NULL, NULL, NULL, NULL)";

        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function update()
    {
        $query = "UPDATE `aluno` SET " .
            "nomeAluno='" . $this->nome . "', emailAluno='" . $this->email . "', telAluno='" . $this->telefone . "', " .
            "cepAluno='" . $this->cep . "', ruaAluno='" . $this->rua . "', numAluno=" . $this->numero . ", bairroAluno='" . $this->bairro . "', " .
            "cidadeAluno='" . $this->cidade . "', estadoAluno='" . $this->estado . "' WHERE idAluno=" . $this->id;
    }

    function lancarNota()
    {

        $this->media = ($this->nota1 + $this->nota2 + $this->nota3) / 3;
        if ($this->media < 4) {
            $this->conceito = "F";
        } elseif ($this->media < 6) {
            $this->conceito = "D";
        } elseif ($this->media < 7) {
            $this->conceito = "C";
        } elseif ($this->media < 8.5) {
            $this->conceito = "B";
        } elseif ($this->media < 10) {
            $this->conceito = "A";
        } else {
            $this->conceito = "A";
        }

        $query = "UPDATE `aluno_has_disciplina` SET " .
            "nota1=" . $this->nota1 . ", nota2=" . $this->nota2 . ", nota3=" . $this->nota3 . ", media=" . $this->media .
            ", conceito='" . $this->conceito . "' WHERE idAluno=" . $this->id . " AND idDisciplina=" . $this->id_disciplina;

        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function relatorio()
    {
        $query = "SELECT A.idAluno, A.nomeAluno, D.idDisciplina, D.nomeDisciplina, AD.nota1, AD.nota1, AD.nota2, AD.nota3, " .
            "AD.media, AD.conceito " .
            "FROM `aluno` AS A INNER JOIN `aluno_has_disciplina` AS AD ON A.idAluno = AD.idAluno " .
            "INNER JOIN `disciplina` AS D ON AD.idDisciplina = D.idDisciplina";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }

    function relatorioUm()
    {
        $query = "SELECT A.idAluno, A.nomeAluno, D.idDisciplina, D.nomeDisciplina, AD.nota1, AD.nota1, AD.nota2, AD.nota3, " .
            "AD.media, AD.conceito " .
            "FROM `aluno` AS A INNER JOIN `aluno_has_disciplina` AS AD ON A.idAluno = AD.idAluno " .
            "INNER JOIN `disciplina` AS D ON AD.idDisciplina = D.idDisciplina WHERE A.idAluno =" . $this->id .
            " AND D.idDisciplina=" . $this->id_disciplina;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    function relatorioLancarNotaAlunos()
    {

        $query = "SELECT A.idAluno, A.nomeAluno, D.idDisciplina, D.nomeDisciplina, AD.nota1, AD.nota1, AD.nota2, AD.nota3, " .
            "AD.media, AD.conceito " .
            "FROM `aluno` AS A INNER JOIN `aluno_has_disciplina` AS AD ON A.idAluno = AD.idAluno " .
            "INNER JOIN `disciplina` AS D ON AD.idDisciplina = D.idDisciplina " .
            "WHERE AD.nota1 IS NULL AND AD.nota2 IS NULL AND AD.nota3 IS NULL";

        if ($this->id_disciplina != 0) {
            $query = $query .  " AND AD.idDisciplina =" . $this->id_disciplina . "";
        }


        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }

    function relatorioAlterarNotaAlunos()
    {
        $query = "SELECT A.idAluno, A.nomeAluno, D.idDisciplina, D.nomeDisciplina, AD.nota1, AD.nota1, AD.nota2, AD.nota3, " .
            "AD.media, AD.conceito " .
            "FROM `aluno` AS A INNER JOIN `aluno_has_disciplina` AS AD ON A.idAluno = AD.idAluno " .
            "INNER JOIN `disciplina` AS D ON AD.idDisciplina = D.idDisciplina " .
            "WHERE AD.nota1 IS NOT NULL AND AD.nota2 IS NOT NULL AND AD.nota3 IS NOT NULL";

        if ($this->id_disciplina != 0) {
            $query = $query .  " AND AD.idDisciplina =" . $this->id_disciplina . "";
        }

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }

    function relatorioLancarNotaDisciplinas()
    {
        $query = "SELECT DISTINCT D.idDisciplina, D.nomeDisciplina " .
            "FROM `aluno` AS A INNER JOIN `aluno_has_disciplina` AS AD ON A.idAluno = AD.idAluno " .
            "INNER JOIN `disciplina` AS D ON AD.idDisciplina = D.idDisciplina " .
            "WHERE AD.nota1 IS NULL AND AD.nota2 IS NULL AND AD.nota3 IS NULL";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }

    function relatorioAlterarNotaDisciplinas()
    {
        $query = "SELECT DISTINCT D.idDisciplina, D.nomeDisciplina " .
            "FROM `aluno` AS A INNER JOIN `aluno_has_disciplina` AS AD ON A.idAluno = AD.idAluno " .
            "INNER JOIN `disciplina` AS D ON AD.idDisciplina = D.idDisciplina " .
            "WHERE AD.nota1 IS NOT NULL AND AD.nota2 IS NOT NULL AND AD.nota3 IS NOT NULL";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }
}
