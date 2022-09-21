export default function Login(props) {
    return `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Log In</title>
    </head>
    <body>
        <h1>Log In</h1>
        <form id="login-form">                    
            <div class="form-group">
                <label for="username">Username</label>
                <input id="username" name="username" type="text" class="form-control"  placeholder="Username" value="newuser"/>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" name="password" type="password" class="form-control" placeholder="Password" value="12345"/>
            </div>
            <button id="login-btn" type="submit" class="btn btn-primary m-1">Login</button>
        </form>
    </body>
</html>`;

}


