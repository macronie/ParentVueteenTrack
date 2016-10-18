<?php
    
      require("user.php");
       if ($_SERVER["REQUEST_METHOD"] == "GET")
    {
        // render form
        render("addParty_form.php", ["title" => "add party"]);
    }
    
    else if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
         if (empty($_POST["username"]))
        {
            apologize("You must provide your username.");
        }
        else if(empty($_POST["uniqueID"]))
        {
            apologize("You must provide your Unique ID.");
        }


        $curr_user = new user;
        $curr_user->addParty($_POST["username"], $_POST["uniqueID"], $_POST["groupname"]);
         if($curr_user->addParty_Status)
         {
            header("Location: index.php");
            //or render("main.php");
         }
         else
         {
             apologize("This user already exist in this group."); 
         }
       

    }

?>
