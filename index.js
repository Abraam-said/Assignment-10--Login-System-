var users = [
    { name: 'name', email: 'name@gmail.com', password: 'password123' },
    { name: 'name', email: 'name@gmail.com', password: 'password123' }
];

var signupName, signupEmail, signupPassword, existMessage, successMessage;
var loginEmail, loginPassword, errorMessage;

function createSignUpPage() {
    document.body.innerHTML = `
    <div class="container my-5 text-center">
        <div class="group m-auto w-75 p-5">
            <h1>Smart Sign Up System</h1>

            <input id="signupName" class="form-control my-3" placeholder="Enter your name" type="text">
            <input id="signupEmail" class="form-control my-3" placeholder="Enter your email" type="email">
            <input id="signupPassword" class="form-control my-3" placeholder="Enter your password" type="password">
            <p id="exist"></p>
            <p id="successMessage" style="color: green;"></p>
            <p id="allInputsMessage" style="color: red;"></p>

            <button onclick="signUp()" class="btn btn-outline-info w-100 my-3">Sign Up</button>
            <p class="text-white">Already have an account? <a class="text-white" href="#" onclick="createLoginPage()">Sign In</a></p>
        </div>
    </div>`;

    signupName = document.getElementById("signupName");
    signupEmail = document.getElementById("signupEmail");
    signupPassword = document.getElementById("signupPassword");
    existMessage = document.getElementById("exist");
    successMessage = document.getElementById("successMessage");
    allInputsMessage = document.getElementById("allInputsMessage");
}

function signUp() {
    allInputsMessage.textContent = "";

    if (!signupName.value.trim() || !signupEmail.value.trim() || !signupPassword.value) {
        allInputsMessage.textContent = "All inputs are required.";
        return;
    }

    var existingUser = users.find(function (user) {
        return user.email === signupEmail.value.trim();
    });

    if (existingUser) {
        existMessage.textContent = "email already exists";
        existMessage.style.color = "red";
        successMessage.textContent = "";
        return;
    }

    var newUser = {
        name: signupName.value.trim(),
        email: signupEmail.value.trim(),
        password: signupPassword.value
    };

    users.push(newUser);
    successMessage.textContent = "Success";
    existMessage.textContent = "";
}

function createLoginPage() {
    document.body.innerHTML = `
    <div class="container my-5 text-center">
        <div class="group m-auto w-75 p-5">
            <h1>Smart Sign Up System</h1>
            <input id="loginEmail" class="form-control my-3" placeholder="Enter your email" type="email">
            <input id="loginPassword" class="form-control my-3" placeholder="Enter your password" type="password">
            <p id="error"></p>
            <p id="allInputsMessageLogin" style="color: red;"></p>

            <button onclick="login()" class="btn btn-outline-info w-100 my-3">Login</button>
            <p class="text-white">Don't have an account? <a class="text-white" href="#" onclick="createSignUpPage()">Sign Up</a></p>
        </div>
    </div>`;

    loginEmail = document.getElementById("loginEmail");
    loginPassword = document.getElementById("loginPassword");
    errorMessage = document.getElementById("error");
    allInputsMessageLogin = document.getElementById("allInputsMessageLogin");
}

function login() {
    allInputsMessageLogin.textContent = "";

    if (!loginEmail.value.trim() || !loginPassword.value) {
        allInputsMessageLogin.textContent = "All inputs are required.";
        return;
    }

    var email = loginEmail.value.trim();
    var password = loginPassword.value;

    var user = users.find(function (user) {
        return user.email === email;
    });

    if (!user) {
        errorMessage.textContent = "incorrect email or password";
        errorMessage.style.color = "red";
        return;
    }

    if (user.password !== password) {
        errorMessage.textContent = "incorrect email or password";
        errorMessage.style.color = "red";
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    createHomePage(user);
}

function createHomePage(user) {
    document.body.innerHTML = `
    <div class="container my-5 text-center">
        <div class="group m-auto w-75 p-5">
            <h1>Welcome, ${user.name}!</h1>
            <p>You have successfully logged in.</p>
            <button onclick="logout()" class="btn btn-outline-danger" style="position: absolute; top: 10px; right: 10px;">Logout</button>
        </div>
    </div>`;
}

function logout() {
    localStorage.removeItem("loggedInUser");
    createLoginPage();
}

function checkLogin() {
    var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
        createLoginPage();
    } else {
        createHomePage(loggedInUser);
    }
}

checkLogin();
