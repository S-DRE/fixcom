<template>
    <div id = "registerPage" class="vh-100 d-flex justify-content-center align-items-center">
    <form class = "text-center p-5 w-75" @submit = "register">
        <p class = "h1 mb-4">Register a new user</p>
        <div class = "form-group mb-4">
            <div class = "row mt-4 w-75 mx-auto">
                <input type = "text" id = "nickname" name = "nickname" class = "form-control" placeholder= "Nickname" maxlength = "15" required>
            </div>
            <div class="row mt-4 w-75 mx-auto">
                <input type="email" id="email" name="email" class="form-control" placeholder="Email" maxlength="30" required>
            </div>
            <div class = "row mt-4 w-75 mx-auto">
                <input type = "text" id = "name" name = "name" class = "form-control" placeholder = "Name" maxlength="30" required>
            </div>
            <div class = "row mt-4 w-75 mx-auto">
                <input type = "text" id = "surnames" name = "surnames" class = "form-control" placeholder = "Surnames" maxlength="65" required>
            </div>
            <div class = "void05"></div>
            <div class="row mt-4 w-75 mx-auto">
                <input type="password" id="password" name="password" class="form-control" placeholder="Password" maxlength="50" required>
            </div>
            <div class="row mt-4 w-75 mx-auto">
                <input type="password" id="passwordConfirm" name="passwordConfirm" class="form-control" placeholder="Confirm the password" maxlength="50" required>
            </div>
        </div>
        <label id = "infoLabel" class = "btn btn-block my-6 w-50 mx-auto" style = "display: hidden; oppacity: 0.6;"></label>
        <button class="btn btn-info my-4 btn-block w-75 mx-auto" type = "submit" title = "Register">Register</button>
    </form>
</div>
</template>

<script> 
import axios from "axios"

export default {
     methods: {
         register: function(event) {
            event.preventDefault();

            const $ = require("jquery");
            window.$ = $;
            
            var passwordValue = $("#password").val();
            var passwordConfirmValue = $("#passwordConfirm").val();
            var infoLabel = $("#infoLabel");

            var regExpPassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$", "g");

            if (regExpPassword.test(passwordValue)) {
                if (passwordValue == passwordConfirmValue) {
                    var nicknameValue = $("#nickname").val();
                    var emailValue = $("#email").val();
                    var nameValue = $("#name").val();
                    var surnamesValue = $("#surnames").val();

                    // Register a new user into the database
                    axios.post("/register", {nickname: nicknameValue, email: emailValue, name: nameValue, surnames: surnamesValue, password: passwordValue}).then(res => {
                         
                         

                        if (res.data.status != "Error") {
                            // Redirigir
                            this.$router.push("/");
                        } else {
                            infoLabel.addClass("btn-danger");
                            infoLabel.removeClass("btn-success");
                            infoLabel.text("There has been an error registering your account. \nPlease, try again later.");
                        }
                    });
                } else {
                    infoLabel.addClass("btn-danger");
                    infoLabel.removeClass("btn-success");
                    infoLabel.text("Passwords do not coincide");
                    // infoLabel.style.opacity = 0.6;
                    // infoLabel.style.display = "block";
                }
            } else {
                infoLabel.addClass("btn-danger");
                infoLabel.removeClass("btn-success");
                infoLabel.text("The password must contain at least 8 characters, one of them being an uppercase, and another one a number");
            }
        }
    }
}
</script>

<style>
#registerPage{
    background-color: #242424;
    color: #ededed;
}

/* Void Divs */

.void0205 {
    height: 25px;
    width: 25px;
}

.void05 {
    height: 50px;
    width: 50px;
}

.void {
    height: 100px;
    width: 100px;
}

.voidx2 {
    height: 200px;
    width: 200px;
}
</style>