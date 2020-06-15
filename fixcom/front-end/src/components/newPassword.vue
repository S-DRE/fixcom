<template>
    <div id = "newPasswordDiv" class="vh-100 d-flex justify-content-center align-items-center">
        <form class = "text-center p-5 w-75" @submit = "newPassword">
            <p class = "h1 mb-4">Insert your new password</p>
            <div class = "form-group mb-4">
                <div class="row mt-4 w-75 mx-auto">
                    <input type="password" id="password" name="password" class="form-control" placeholder="Password" maxlength="30" required>
                </div>
                <div class="row mt-4 w-75 mx-auto">
                    <input type="password" id="confirmPassword" name="confirmPassword" class="form-control" placeholder="Confirm Password" maxlength="30" required>
                </div>
            </div>
            <label id = "infoLabel" class = "btn btn-block my-6 w-50 mx-auto" style = "display: hidden; oppacity: 0.6;"></label>
            <button class="btn btn-info my-4 btn-block w-75 mx-auto" type = "submit" title = "Set new password">Set new password</button>
        </form>
    </div>
</template>

<script>

import axios from "axios"

export default {
    methods: {
        newPassword: function (event) {
            event.preventDefault();

            const $ = require("jquery");
            window.$ = $;

            var infoLabel = $("#infoLabel");

            var passwordValue = $("#password").val();
            var confirmPasswordValue = $("#confirmPassword").val();

            var codeValue = this.$route.fullPath.split("code=")[1];
            
            var regExpPassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$", "g");

            var emailValue = this.$route.query.account;

            if (regExpPassword.test(passwordValue)) {
                if (passwordValue == confirmPasswordValue) {
                    axios.post("/newPassword", {password: passwordValue, email: emailValue, code: codeValue}).then(res => {
                        if (res.data.message == "Code does not match") {
                            infoLabel.addClass("btn-danger");
                            infoLabel.removeClass("btn-success");
                            infoLabel.text("Code does not match");
                        } else if (res.data.message == "The password recovery has expired") {
                            infoLabel.addClass("btn-danger");
                            infoLabel.removeClass("btn-success");
                            infoLabel.text(res.data.message);
                        } else if (res) {
                             
                            infoLabel.addClass("btn-success");
                            infoLabel.removeClass("btn-danger");
                            infoLabel.text("Password changed");

                            // Redirigir
                            this.$router.push("/login");
                        }
                    });
                } else {
                    // InfoLabel
                    infoLabel.addClass("btn-danger");
                    infoLabel.removeClass("btn-success");
                    infoLabel.text("Passwords do not coincide");
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
#newPasswordDiv{
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