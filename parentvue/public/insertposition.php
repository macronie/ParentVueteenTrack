 <?php
    require("../includes/config.php");

    
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $insert_status = MYPHP::query("INSERT IGNORE INTO location (userid, username, latitude, longitude) VALUES(?, ?, ?, ?)", $_SESSION["id"], $_SESSION["user"], $_POST["latitude"], $_POST["longitude"]);
        //insert status will be non zero if the user data is updated in sql
        if($insert_status == NULL)
        {
            $message = "Not inserted";
            render("apology.php", ["message" => $message]);
        }
        else
        {
            print(json_encode($insert_status, JSON_PRETTY_PRINT));
        }
    }

?>


