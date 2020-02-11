<?php
// Start the session
session_start();

//controlla l'user attuale
if (!isset($_SESSION["logged_in"])){
    die(json_encode(array('Error'=>"User not logged-in!",'Redirect'=>true)));
}

print(json_encode(array("current_username"=>$_SESSION["current_username"], "id_session"=>session_id())));
?>


