<?php
    require("../includes/config.php");
    
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $friends_list = array();
        $users = MYPHP::query("SELECT * FROM users WHERE groupname = ?", $_SESSION["groupname"]);
        
        if (count($users) != 0)
        {
            for ($x = 0; $x < count($users); $x++) 
            {
                $username = $users[$x]["username"];
                $rows = MYPHP::query("SELECT username, latitude, longitude FROM location WHERE username=? ORDER BY time DESC LIMIT 1", $username);

            //Push each user record into local friends list
                if (count($rows) != 0)
                {
                array_push($friends_list, $rows[0]);      
                }
            } 
        }
        
        if (count($friends_list) != 0)
        {
        print(json_encode($friends_list, JSON_PRETTY_PRINT));
        }
        else 
        {
        print(json_encode($friends_list, JSON_PRETTY_PRINT));
        
        }
    }

?>