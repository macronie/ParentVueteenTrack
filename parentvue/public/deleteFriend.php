<?php
require("user.php");

    // if user reached page via GET (as by clicking a link or via redirect)
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        //$curr_user = new user;
        //$curr_user->removePary($_POST["username"]);
        $rows = MYPHP::query("UPDATE users SET groupname = ? WHERE username = ?" , "" ,$_POST["username"]);
        //insert status will be non zero if the user data is updated in sql
        if($rows == NULL)
        {
            $message = "Not removed";
            render("apology.php", ["message" => $message]);
        }

    }

?>

