<?php
// Start the session
session_start();
$ERR_LOG = "../logs/err_log.log";

$username = $_POST["username"];
$pass = $_POST["pass"];

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

//in caso di caratteri speciali
$username = mysqli_real_escape_string($connessione, $username );
$pass = mysqli_real_escape_string($connessione, $pass);


//controllo che username e password siano validi
$query="SELECT * FROM users WHERE username='".$username."' && password='".$pass."';";

if(!$ris=mysqli_query($connessione,$query)) {
    error_log(date('Y-m-d H:i:sO')." ".mysqli_error($connessione)."\r\n", 3, $ERR_LOG);
    die(json_encode(array('Error'=>"Query fallita")));
}

if (mysqli_num_rows($ris) == 0){
    die(json_encode(array('Error'=>"Username o password non validi")));
}

mysqli_close($connessione);


$_SESSION["logged_in"] = true;
$_SESSION["current_username"] = $username;


print(json_encode(array("Success"=>"Il log-in ha avuto successo!")));
?>


