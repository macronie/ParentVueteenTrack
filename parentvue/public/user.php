<?php

require("../includes/config.php");
$uniq_id = uniqid();
class user{
    var $firstname;
    var $lastname;
    var $phonenumber;
    var $email;
    var $username;
    var $password;
    var $confirmation;
    var $uniq_id;
    var $login_status;
    var $register_status;
    var $groupname;
    var $id;
    var $addParty_Status;
    var $removeParty_Status;
    var $deleteAccount_Status;
    
     //$uniq_id = uniqid();
    
    public function login($username, $password )
    {
        $this->username = $username;
        $this->password = $password;
        $rows = MYPHP::query("SELECT * FROM users WHERE username=?", $this->username);
        if(count($rows == 1))
        {
            //$rows[0] gives the first array in the array of array list.
            $row = $rows[0];
            if(password_verify($this->password, $row["password"]))
            {
                $_session["id"] = $row["id"];
                $_SESSION["user"] = $row["username"];
                $this->login_status = true;
            }
            else
            {
                $this->login_status = false;
            }
        }
        
    }
    
    public function register($firstname, $lastname, $phonenumber, $email, $username, $password)
    {
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->phonenumber = $phonenumber;
        $this->email = $email;
        $this->username = $username;
        $this->password = $password;
        $uniq_id = uniqid();
        $this->uniq_id = $uniq_id;
        //insert new user
        $insert_status = MYPHP::query("INSERT IGNORE INTO users (firstname, lastname, phonenum, emailID, username, userid, password) VALUES(?, ?, ?, ?, ?, ?, ?)", $this->firstname, $this->lastname, $this->phonenumber, $this->email, $this->username, $uniq_id, password_hash($this->password, PASSWORD_DEFAULT));
    
        if($insert_status != NULL)
        {
           $rows = MYPHP::query("SELECT userid FROM users WHERE username = ?", $_POST["username"]);
           $_SESSION["id"] = $rows[0]["userid"];
           $this->register_status = true;
        }
        else
        {
           $this->register_status = false;
        }
    }
    
    public function addParty($username, $uniq_id, $groupname)
    {
       $this->username = $username;
       $this->uniq_id = $uniq_id;
       $this->groupname = $groupname;
       $rows = MYPHP::query("UPDATE users SET groupname = ? WHERE username = ? AND userid = ?", $this->groupname ,$this->username, $this->uniq_id);
       if($rows != NULL)
       {
           $this->addParty_Status = true;
       }
       else
       {
           $this->addParty_Status = false;
       }
    }
    //creating new group for the first time
    public function createGroup($groupname)
    {
        $this->groupname = $groupname;
        $insert_status = MYPHP::query("INSERT IGNORE INTO groups (groupname) VALUE(?)", $this->groupname);
         if($insert_status == 0)
            {
                $message = "Group already exist";
                render("apology.php", ["message" => $message]);
            }
            else
            {
                $_SESSION["groupcount"]++;
            }
       
    }
    
    //get the members of a particular group
    public function getGroup($groupname)
    {
     $this->groupname = $groupname;
     $rows = MYPHP::query("SELECT * FROM groups");
         if (count($rows) != 0)
            {
            print(json_encode($rows, JSON_PRETTY_PRINT));
            }
    }
    
     public function removeParty($username)
    {
       $this->username = $username;
       
       $rows = MYPHP::query("UPDATE users SET groupname = ? WHERE username = ?" , "" ,$this->username);
       if($rows != NULL)
       {
           $this->removeParty_Status = true;
       }
       else
       {
           $this->removeParty_Status = false;
       }
    }
    
    public function deleteAccount($username)
    {
        $this->username = $username;
        $rows = MYPHP::query("DELETE FROM users WHERE username=?", $this->username); 
        if($rows != NULL)
        {
            $this->deleteAccount_Status = true;
        }
        else
        {
            $this->deleteAccount_Status = false;
        }
        
    }
    
    public function getUser()
    {
        return($this);
    }
}
?>
