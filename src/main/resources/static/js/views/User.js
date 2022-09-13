import CreateView from "../createView.js";

let me;
export default function prepareUserHTML(props) {
    me = props.me;
    return `
        <h1>Welcome, ${props.me.username}!</h1>
        <h2>${props.me.email}</h2>
        
        <form>
            <label for="old-pass">Old Password</label>
            <input type="password" id="old-pass" name="old-pass">
            <br>
            <label for="new-pas">New Password</label>
            <input type="password" id="new-pass" name="new-pass">
            <br>
            <label for="confirm">Confirm New Password</label>
            <input type="password" id="confirm" name="confirm">
            <br>
            <i id="show-pass" class="bi bi-eye-fill"></i>
            <button id="update-pass" name="update-pass">Update</button>
        </form>
    `;
}

export function prepareUserJS() {
    handleToggleShowPassword();
    handleUpdatePassword();
}

function handleToggleShowPassword() {
    const showBtn = document.querySelector('#show-pass');
    showBtn.addEventListener('click', (e) => {
        let oldPass = document.querySelector('#old-pass'),
            newPass = document.querySelector('#new-pass'),
            confirm = document.querySelector('#confirm');
        if(oldPass.getAttribute('type') === 'password') {
            oldPass.setAttribute('type', 'text');
            newPass.setAttribute('type', 'text');
            confirm.setAttribute('type', 'text');


        }

    })
}

function     handleUpdatePassword() {

}