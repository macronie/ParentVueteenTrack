<?php
// configuration
require("../includes/config.php"); 
unset($_SESSION["user"]);
session_destroy(); 

render("welcome.php", ["title" => "loggedout"]);
exit;
?>


