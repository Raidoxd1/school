function mainPage() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById("main-page").innerHTML = this.responseText;
    }
    xhttp.open("GET", "/mainPage", true);
    xhttp.send();
}
mainPage()

function Getlogin(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById("main-page").innerHTML = this.responseText;
    }
    xhttp.open("GET", "/Getlogin", true);
    xhttp.send();
}

function register(){
    var email = document.getElementById("email").value
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var url = "/register?email="+ email + "&username="+username+"&password="+password
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById("main-page").innerHTML = this.responseText;
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}
function login(){
    var username = document.getElementById("loginusername").value
    var password = document.getElementById("loginpassword").value
    var url = "/login?loginusername="+username+"&loginpassword="+password
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById("main-page").innerHTML = this.responseText;
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}
function logout(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById("main-page").innerHTML = this.responseText;
    }
    xhttp.open("GET", "/logout", true);
    xhttp.send();
}
