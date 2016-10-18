<?php

    require("user.php");
    // if user reached page via GET (as by clicking a link or via redirect)
    if ($_SERVER["REQUEST_METHOD"] == "GET")
    {
        // else render form
        render("register_form.php", ["title" => "Register"]);
    }

    // else if user reached page via POST (as by submitting a form via POST)
    else if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        
         if (empty($_POST["firstname"]))
        {
            apologize("You must provide your firstname.");
            
        }
         else if (empty($_POST["lastname"]))
        {
            apologize("You must provide your lastname.");
            
        }
          else if (empty($_POST["phonenum"]))
        {
            apologize("You must provide a valid contact number.");
            
        }
         else if (empty($_POST["email"]))
        {
            apologize("You must provide a valid email Id.");
            
        }
        else if (empty($_POST["username"]))
        {
            apologize("You must provide your username.");
            
        }
        else if(empty($_POST["password"]))
        {
            apologize("You must provide your password.");
        }
        else if(empty($_POST["confirmation"]))
        {
            apologize("Please confirm your password");
        }
        
        else if($_POST["password"] != $_POST["confirmation"])
        {
            apologize("Password MISMATCH.");
        }
         else
         {
             $current_user = new user;
             $current_user->register($_POST["firstname"], $_POST["lastname"], $_POST["phonenum"], $_POST["email"], $_POST["username"], $_POST["password"]);
            
             //insert status will be non zero if the user data is updated in sql
             if($current_user->register_status)
             {
                 $message =  "Your unique id is " . $current_user->uniq_id . " , save and share the uniqueid with your partner/group to track you.";
                 render("registered.php", ["message" => $message]);
             }
             else
             {
              $message = "User with emailid already exist";
                 
              render("apology.php", ["message" => $message]);
             }
             
         }
    }

?>

