
<div class="col-xs-4">
    <form action="addParty.php" method="post">
        <fieldset>
            <h3>Add Friend</h3>
            <?php
            if(!empty($_SESSION["user"]))
            {
            ?>
            <div class="form-group">
              <input type="text" class="form-control" id="usr" name="username" placeholder="Username">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" id="uid" name="uniqueID" placeholder="Uniqueid">
            </div>
            <div class="form-group">
                <select id="grouplist" name="groupname" class="form-control" onclick="buildSelectGroup_listBox(event)">
                <option value="one">SelectGroup</option>
                </select>
            </div>
            <?php
            }
            ?>
            <button class="btn btn-default" type="submit">
                <span aria-hidden="true" class="glyphicon glyphicon-log-in"></span>
                Add
            </button>
            
        </fieldset>
            
    </form>
</div>

