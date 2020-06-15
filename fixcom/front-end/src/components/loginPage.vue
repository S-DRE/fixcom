<template>
    <div id = "loginPage" class="vh-100 d-flex justify-content-center align-items-center">
    <form class = "text-center p-5 w-75" @submit = "login">
        <p class = "h1 mb-4">User login</p>
        <div class = "form-group mb-4">
            <div class="row mt-4 w-75 mx-auto">
                <input type="text" id="email" name="email" class="form-control" placeholder="Email" maxlength="30" required>
            </div>
            <div class="row mt-4 w-75 mx-auto">
                <input type="password" id="password" name="password" class="form-control" placeholder="Password" maxlength="50" required>
            </div>
        </div>
        <router-link to = "/forgotPassword">
            <label id = "forgotPassword" name = "forgotPassword"><a class = "nav-link text-primary">Forgot your password?</a></label>
        </router-link>
        <label id = "infoLabel" class = "btn btn-block my-6 w-50 mx-auto" style = "display: hidden; oppacity: 0.6;"></label>
        <button class="btn btn-info my-4 btn-block w-75 mx-auto" type = "submit" title = "Log In">Log In</button>
    </form>
</div>
</template>

<script>
import axios from "axios"

export default {
    methods: {
        login: function (event) {

            event.preventDefault();

            const $ = require("jquery");
            window.$ = $;

            var nicknameValue = $("#email").val();
            var passwordValue = $("#password").val();

            var infoLabel = $("#infoLabel");

            axios.post("https://fixcom.mywire.org/login", {nickname: nicknameValue, password: passwordValue}).then(res => {
                //  
                //  

                if (res.data.status == "OK - No users found") {
                     

                    infoLabel.addClass("btn-danger");
                    infoLabel.removeClass("btn-success");
                    infoLabel.text("Credenciales incorrectas");
                    // infoLabel.style.opacity = 0.6;
                    // infoLabel.style.display = "block";
                } else {
                     
                     

                    // Session management
                    this.$parent.user = res.data.data[0];
                    
                    //  
                    //  

                    infoLabel.addClass("btn-success");
                    infoLabel.removeClass("btn-danger");
                    infoLabel.text("Logueado correctamente");
                    // infoLabel.style.opacity = 0.6;
                    // infoLabel.style.display = "block";

                    // Redirigir
                    this.$router.push("/");
                }
            }).catch(e => {
                  console.log("Error: ", e);
                 
            })
        }
    }
}
</script>

<style>
#loginPage{
    background-color: #242424;
    color: #ededed;
}

#forgotPassword:hover {
    cursor: pointer;
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