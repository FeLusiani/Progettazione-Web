<?php
// Start the session
session_start();

//controlla l'user attuale
if (!isset($_SESSION["logged_in"]) || !$_SESSION["logged_in"]){
    die(json_encode(array('Error'=>"User not logged-in!",'Redirect'=>true)));
}

unset($_SESSION['logged_in']);
unset($_SESSION['current_username']);

print(json_encode(array("Success"=>"Il log-out ha avuto successo!")));
?>


