import CreateView from "../createView.js"

export default function Register(props) {
    return `
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Register</title>
            </head>
            <body>
                <h1>Register</h1>
                <form id="register-form">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input id="username" name="username" type="text" class="form-control"  placeholder="Username"/>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input id="email" name="email" type="email" class="form-control" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input id="password" name="password" type="password" class="form-control"  placeholder="Password"/>
                        <small class="form-text text-muted">Minimum Password Length is 14 Characters</small>
                    </div>
                    <div class="form-group">
                        <label for="confirm">Confirm Password</label>
                        <input id="confirm" name="confirm" type="password" class="form-control" placeholder="Confirm Password">
                    </div>
                    <button id="register-btn" type="submit" class="btn btn-primary m-1">Register</button>
                </form>
            </body>
        </html>
`;
}

export function RegisterEvent(){
    const registerBtn = document.querySelector('#register-btn')
    registerBtn.addEventListener('click', function(e) {
        let username = document.querySelector('#username').value,
            email = document.querySelector('#email').value,
            password = document.querySelector('#password').value,
            confirm = document.querySelector('#confirm').value;
            if(password.length < 14) {
                alert('Password is too short.')
            } else if(password !== confirm) {
                alert('Passwords do not match.')
            } else {
                let newUser = {username, email, password};
                console.log(newUser);

                let request = {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(newUser)
                }

                fetch(`${HOME}/api/users`, request)
                    .then(response => {
                        console.log(response.status);
                        CreateView("/");
                    })
            }
    })
}