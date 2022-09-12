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
                    <label for="username">Username</label>
                    <input id="username" name="username" type="text"/><br>
                    <label for="email">Email</label>
                    <input id="email" name="email" type="email"><br>
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password"/><br>
                    <label for="confirm">Confirm Password</label>
                    <input id="confirm" name="confirm" type="password"/><br>
                    <button id="register-btn" type="button">Register</button>
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
            if(password !== confirm) {
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