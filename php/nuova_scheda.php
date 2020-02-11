<?php
// Start the session
session_start();

//controlla l'user attuale
if (!isset($_SESSION["logged_in"]) || !$_SESSION["logged_in"]){
    die(json_encode(array('Error'=>"User not logged-in!",'Redirect'=>true)));
}

//file log per errori
$ERR_LOG = "../logs/err_log.log";
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

//atomicità
mysqli_query($connessione,"BEGIN;");
$query="INSERT INTO schede (username, nome, note, _LV, _FOR, _DEX, _COS, _INT, _SAG, _CAR)
        VALUES ('".$_SESSION["current_username"]."','Senza Nome', '','1', '10', '10', '10', '10', '10', '10');";
if(!mysqli_query($connessione,$query)) {
    error_log(date('Y-m-d H:i:sO')." ".mysqli_error($connessione)."\r\n", 3, $ERR_LOG);
    mysqli_query($connessione,"ROLLBACK;");
    die(json_encode(array('Error'=>"Query fallita")));
}
$id = mysqli_insert_id($connessione);
mysqli_query($connessione,"COMMIT;");
mysqli_close($connessione);

print(json_encode(array("Success"=>"Scheda inserita correttamente","ID_GENERATA"=>$id)));
?>
