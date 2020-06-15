<template>
    <div id = "forgotPasswordDiv" class = "d-flex justify-content-center align-items-center w-100 vh-100">
        <form class = "text-center p-5 w-75" @submit = "recuperatePassword">
            <p class = "h1 mb-4">Password recovery</p>
            <div class = "form-group mb-4">
                <div class="row mt-4 w-75 mx-auto">
                    <input type="text" id="email" name="email" class="form-control" placeholder="Email" maxlength="30" required>
                </div>
            </div>
            <label id = "infoLabel" class = "btn btn-block my-6 w-50 mx-auto" style = "display: hidden; oppacity: 0.6;"></label>
            <button class="btn btn-info my-4 btn-block w-75 mx-auto" type = "submit" title = "Recuperate Password">Recuperate Password</button>
        </form>
    </div>
</template>

<script>

import axios from "axios";

export default {
    methods: {
        recuperatePassword: function (event) {
            event.preventDefault();

            const $ = require("jquery");
            window.$ = $;

            var emailValue = $("#email").val();
            var infoLabel = $("#infoLabel");

            axios.post("/recuperatePassword", {email: emailValue}).then(res => {
                 
                if (res.data.message == "Error") {
                    infoLabel.addClass("btn-danger");
                    infoLabel.removeClass("btn-success");
                    infoLabel.text("Error");
                } else {
                    infoLabel.addClass("btn-success");
                    infoLabel.removeClass("btn-danger");
                    infoLabel.text("Email sent");
                }
            });
        }
    }
}
</script>

<style>
#forgotPasswordDiv{
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