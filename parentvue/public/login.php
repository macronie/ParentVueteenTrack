<?php
    //require("../includes/config.php");
    require("user.php");
    
    // if user reached page via GET (as by clicking a link or via redirect)
    if ($_SERVER["REQUEST_METHOD"] == "GET")
    {
        // render form
        if(empty($_SESSION["user"]))
        {
        render("login_form.php", ["title" => "login"]);
        }
        else
        {
        render("main.php", ["title" => "main"]);  
        }
    }
    // else if user reached page via POST (as by submitting a form via POST)
    else if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        if (empty($_POST["username"]))
        {
            apologize("You must provide your username."); 
        }
        
        if(empty($_POST["password"]))
        {
            apologize("You must provide your password.");
        }
        
        $curr_user = new user;
        $curr_user->login($_POST["username"], $_POST["password"] );
       
        if($curr_user->login_status)
        {
           $message = "Logged in successfully.";
           render("loginstatus.php", ["message" => $message]);
        }
        else
        {
        // else apologize
            
        $message = "Invalid username and/or password.";
        render("apology.php", ["message" => $message]);
        }
    }
?>

