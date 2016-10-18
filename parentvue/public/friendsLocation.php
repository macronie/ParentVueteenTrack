<?php
    require("../includes/config.php");

        if ($_SERVER["REQUEST_METHOD"] == "POST")
        {
            if (isset($_POST['username'])) {
            $str = $_POST['username'];    // get data(username)
            }
           
            $rows = MYPHP::query("SELECT username, latitude, longitude FROM location WHERE username=? ORDER BY time DESC LIMIT 1", $str);

            //$rows = MYPHP::query("SELECT username, latitude, longitude FROM location ORDER BY 'time' DESC LIMIT 1");
                 // if we found user, check password
            if (count($rows) != 0)
            {
            // All the rows
            $row = $rows[0];
            print(json_encode($rows, JSON_PRETTY_PRINT));
            }
            else 
            {
            print(json_encode($rows, JSON_PRETTY_PRINT));
            //render("apology.php", ["message" => "Friends not in the list"]);
            }
        }
?>
