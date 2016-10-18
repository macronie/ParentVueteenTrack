<div>
    <form action="register.php" method="POST">
        <fieldset>
            <h3>Please Register</h3>
            <div>
                <input name="firstname" placeholder="FirstName" type="text" />
            </div>
            <br>
            <div>
                <input name="lastname" placeholder="LastName" type="text" /> 
            </div>
            <br>
            <div>
                <input name="phonenum" placeholder="ContactNumber" type="tel" />
            </div>
            <br>
            <div>
                <input name="email" placeholder="Email" type="email" />
            </div>
            <br>
            <div>
                <input name="username" placeholder="Username" type="text" />
            </div>
            <br>
            <div>
            <input name="password" placeholder="Password" type="password" />
            </div>
            <br>
            <div>
                <input name="confirmation" placeholder="Confirmation" type="password" />
            </div>
            <br>
            <button class="btn btn-default" type="submit">
                <span aria-hidden="true" class="glyphicon glyphicon-log-in"></span>
                Register
            </button>
        </fieldset>
    </form>
    <div>
    or <a href="login.php">Log In</a>
</div>
</div>

