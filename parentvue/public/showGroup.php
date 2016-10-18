<?php
require("../includes/config.php");

    // if user reached page via GET (as by clicking a link or via redirect)
    if ($_SERVER["REQUEST_METHOD"] == "GET")
    {
         if (empty($_GET["groupname"]))
        {
            apologize("Please select a group.");
        }
        else
        {
          $_SESSION["groupname"] = $_GET["groupname"];
          $rows = MYPHP::query("SELECT * FROM users WHERE groupname = ?", $_GET["groupname"]);
            //if (count($rows) != 0)
            {
            print(json_encode($rows, JSON_PRETTY_PRINT));
            }
        }
    }

