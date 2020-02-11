<?php
// Start the session
session_start();

//controlla l'user attuale
if (!isset($_SESSION["logged_in"]) || !$_SESSION["logged_in"]){
    die(json_encode(array('Error'=>"User not logged-in!",'Redirect'=>true)));
}
//file log per errori
$ERR_LOG = "../logs/err_log.log";
$data = array();
$data = (array) json_decode($_POST["data"]);



$connessione = mysqli_connect("localhost","root","","bhm_db");
if (mysqli_connect_errno()) {
    error_log(date('Y-m-d H:i:sO')." ".mysqli_connect_error()."\r\n", 3, $ERR_LOG);
    die(json_encode(array('Error' => mysqli_connect_error())));
}
//connessione
if(!mysqli_select_db($connessione,"bhm_db")) {
    error_log(date('Y-m-d H:i:sO')." "."Couldn't select the database\r\n", 3, $ERR_LOG);
    die(json_encode(array('Error' => "Impossibile selezinare il DB")));
}

//preparo i dati di testo ad essere inseribili
$data["nome"] = mysqli_real_escape_string($connessione, $data["nome"]);
$data["note"] = mysqli_real_escape_string($connessione, $data["note"]);

//atomicità
mysqli_query($connessione,"BEGIN;");
/*$query="UPDATE schede SET nome='".$data["nome"]."', note='".$data["note"]."', _LV='".$data["LV"]."' 
WHERE id=".$data["id"].";";*/
$query="UPDATE schede SET nome='".$data["nome"]."', note='".$data["note"]."', _LV='".$data["LV"]."',
		_FOR='".$data["FOR"]."', _DEX='".$data["DEX"]."', _COS='".$data["COS"]."',
		_INT='".$data["INT"]."', _SAG='".$data["SAG"]."', _CAR='".$data["CAR"]."' 
		WHERE id=".$data["id"]." AND username='".$_SESSION["current_username"]."';";
if(!mysqli_query($connessione,$query)) {
    error_log(date('Y-m-d H:i:sO')." ".mysqli_error($connessione)."\r\n", 3, $ERR_LOG);
    mysqli_query($connessione,"ROLLBACK;");
    die(json_encode(array('Error'=>"Query fallita")));
}

mysqli_query($connessione,"COMMIT;");
mysqli_close($connessione);

print(json_encode(array("Success"=>"Scheda salvata correttamente")));
?>









