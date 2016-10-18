<?php
require("../includes/config.php");
require("user.php");
if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $curr_user = new user;
    $curr_user->deleteAccount($_SESSION["user"]);
     if($curr_user->deleteAccount_Status)
         {
            header("Location: logout.php");
            //or render("main.php");
         }
         else
         {
             apologize("You are still with us."); 
         }
}
