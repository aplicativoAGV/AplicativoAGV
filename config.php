<?php
    $dbHost='Localhost:3306';
    $dbUsername='root';
    $dbPassword='';
    $dbname='bancoagv';

    //$mysqli = new mysqli($dbHost,$dbUsername,$dbPassword,$dbname);

    //if($mysqli->connect_error){
        //echo "FALHA AO CONECTAR: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    //}

    //$bancoagv = "SELECT * FROM usuario";

    //$con = $mysqli->query($bancoagv) or die($mysqli->error);

    $con = new mysqli($dbHost,$dbUsername,$dbPassword,$dbname);

?>