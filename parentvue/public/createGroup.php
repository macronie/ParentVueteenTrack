<?php
 require("user.php");
 if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        if (empty($_POST["groupname"]))
        {
            apologize("You must provide your groupname.");
        }
        else
        {
          $curr_user = new user;
          $curr_user->createGroup($_POST["groupname"]);
          render("main.php");
        }
    }
 else if ($_SERVER["REQUEST_METHOD"] == "GET")
    {
        $curr_user = new user;
       
        render("createGroup_form.php");
    }
    
       

