<?php
require("../includes/config.php");
    
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $history = MYPHP::query("SELECT * FROM location WHERE username=? ORDER BY time DESC", $_POST["username"]);
            if (count($history) != 0)
            {
            print(json_encode($history, JSON_PRETTY_PRINT));
            }
    }
