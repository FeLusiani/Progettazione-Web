<?php
// Start the session
session_start();

//controlla l'user attuale
if (!isset($_SESSION["logged_in"]) || !$_SESSION["logged_in"]){
    die(json_encode(array('Error'=>"User not logged-in!",'Redirect'=>true)));
}


$user = $_SESSION["current_username"];

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


$query="SELECT id, nome, note, _LV, _FOR, _DEX, _COS, _INT, _SAG, _CAR
		FROM schede WHERE username='".$user."' ORDER BY nome";
if(!$ris=mysqli_query($connessione,$query)) {
    error_log(date('Y-m-d H:i:sO')." ".mysqli_error($connessione)."\r\n", 3, $ERR_LOG);
    die(json_encode(array('Error'=>"Query fallita")));
}

$ris_lenght = mysqli_num_rows($ris);
$resultset = mysqli_fetch_all($ris, MYSQLI_NUM);
	
$schede = array();
for($i = 0; $i < $ris_lenght; $i++ ){
	$schede[$i]["id"] = $resultset[$i][0];
	$schede[$i]["nome"] = $resultset[$i][1];
	$schede[$i]["note"] = $resultset[$i][2];
	
	$schede[$i]["LV"] =  $resultset[$i][3];
	$schede[$i]["FOR"] = $resultset[$i][4];
	$schede[$i]["DEX"] = $resultset[$i][5];
	$schede[$i]["COS"] = $resultset[$i][6];
	$schede[$i]["INT"] = $resultset[$i][7];
	$schede[$i]["SAG"] = $resultset[$i][8];
	$schede[$i]["CAR"] = $resultset[$i][9];
}
mysqli_free_result($ris);
mysqli_close($connessione);

print(json_encode($schede));
?>









