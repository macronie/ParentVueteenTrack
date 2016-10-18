
<?php
    require("../includes/config.php");

    // if user reached page via GET (as by clicking a link or via redirect)
    if ($_SERVER["REQUEST_METHOD"] == "GET")
    {
        // else render form
        if(empty($_SESSION["user"]))
        {
        render("welcome.php", ["title" => "welcome"]);
        }
        else 
        {
         render("main.php", ["title" => "mainpage"]);
        }
    }
?>

