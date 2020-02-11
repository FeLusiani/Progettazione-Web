<?php
// Start the session
session_start();

$ERR_LOG = "../logs/err_log.log";

$username = $_POST["username"];
$pass = $_POST["pass"];

//controlli su password ed username
if(strlen($username) == 0 || strlen($pass)==0){ //troppo corti
    die(json_encode(array('Error' => "Username e Password devono essere lunghi almeno 1 carattere")));
}
if(preg_match("/\W/",$username) || preg_match("/\W/",$pass)){//caratteri non ammessi
    die(json_encode(array('Error' => "Username e Password devono essere composti di sole lettere e numeri")));
}
if (strlen($username) > 50 || strlen($pass) > 50){ //troppo lunghi
    die(json_encode(array('Error' => "Username e Password non possono superare i 50 caratteri")));
}

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

//per sicurezza
$username = mysqli_real_escape_string($connessione, $username );
$pass = mysqli_real_escape_string($connessione, $pass);


//controllo che non ci sia gia lo stesso username
$query="SELECT * FROM users WHERE username='".$username."'";

if(!$ris=mysqli_query($connessione,$query)) {
    error_log(date('Y-m-d H:i:sO')." ".mysqli_error($connessione)."\r\n", 3, $ERR_LOG);
    die(json_encode(array('Error'=>"Query fallita")));
}

if (mysqli_num_rows($ris) > 0){
    die(json_encode(array('Error'=>"Username gia` in uso")));
}
//procedo ad inserire il nuovo user
//atomicità
mysqli_query($connessione,"BEGIN;");
$query="INSERT INTO users (username, password) VALUES ('".$username."', '".$pass."');";
if(!mysqli_query($connessione,$query)) {
    error_log(date('Y-m-d H:i:sO')." ".mysqli_error($connessione)."\r\n", 3, $ERR_LOG);
    mysqli_query($connessione,"ROLLBACK;");
    die(json_encode(array('Error'=>"Query fallita")));
}

mysqli_query($connessione,"COMMIT;");
mysqli_close($connessione);

print(json_encode(array("Success"=>"Username salvato correttamente!")));
?>


