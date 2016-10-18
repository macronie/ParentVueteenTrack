<?php

    /**
     * config.php
     *
     * 
     * 
     *
     * Configures pages.
     */
    // display errors, warnings, and notices
    //ini_set("display_errors", true);
    //error_reporting(E_ALL);

    // requirements
    require("helpers.php");

    
    require("MYPHP.php");
    

    MYPHP::init(__DIR__ . "/../config.json");
    // enable sessions
    session_start();
    if (!empty($_SESSION["id"]))
    {
      if (!is_array($_SESSION['friends'])) $_SESSION['friends'] = array();
    }
    else
    {
    $_SESSION['friends'] = array();    
    }
    
    
    // require authentication for all pages except /login.php, /logout.php, and /register.php
  
    {
        if (empty($_SESSION["id"]))
        {
           // render("../public/index.php");
        }
    }

?>
