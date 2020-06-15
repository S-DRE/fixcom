<template>
    <div id = "userConfigDiv" class = "d-flex justify-content-center align-items-center w-100 vh-100">
        <form id = "userInfoForm" class = "container w-75 h-75" @submit="editRequest">
            <div id = "usernameRow" class = "form-row mt-3 rounded">
                <div class = "col">
                    <label id = "usernameLabel" class = "mr-2"><h3 style="font-size:2.5vw;">Username:</h3></label>
                </div>
                <div class = "col">
                    <label v-if="edit==false" class = "text-primary"><h3 style="font-size:2.5vw;">{{this.$parent.user.nick}}</h3></label>
                </div>
                <div class = "col">
                    <input id = "nicknameInput" v-if="edit==true" title = "nickname">
                </div>
            </div>
            <div class = "void0205"></div>
            <div id = "nameRow" class = "form-row rounded">
                <div class = "col">
                    <label id = "nameLabel"><h3 style="font-size:2.5vw;">Name: </h3></label>
                </div>
                <div class = "col">
                    <label v-if="edit==false"><h3 style="font-size:2.5vw;">{{this.$parent.user.nombre}}</h3></label>
                </div>
                <div class = "col">
                    <input id = "nameInput" v-if="edit==true" title = "name">
                </div>
            </div>
            <div class = "void0205"></div>
            <div id = "surnamesRow" class = "form-row rounded">
                <div class = "col">
                    <label id = "surnamesLabel"><h3 style="font-size:2.5vw;">Surnames: </h3></label>
                </div>
                <div class = "col">
                    <label v-if="edit==false"><h3 style="font-size:2.5vw;">{{this.$parent.user.apellidos}}</h3></label>
                </div>
                <div class = "col">
                    <input id = "surnamesInput" v-if="edit==true" title = "Surnames">
                </div>
            </div>
            <div class = "void0205"></div>
            <div id = "passwordRow" class = "form-row rounded">
                <div class = "col">
                    <label id = "passwordLabel"><h3 style="font-size:2.5vw;">Password: </h3></label>
                </div>
                <div class = "col">
                    <label v-if="edit==false"><h3 style="font-size:2.5vw;">???</h3></label>
                </div>
                <div class = "col">
                    <input id = "passwordInput" v-if="edit==true" title = "Password">
                </div>
            </div>
            <div class = "void0205"></div>
            <div id = "buttonRow" class = "form-row rounded">
                <div v-if="edit==false" class = "col">
                    <button type = "submit" class = "w-100 btn btn-primary">Edit</button>
                </div>
                <div v-if="edit==true" class = "col">
                    <button id = "saveButton" v-if="edit==true" class = "w-100 btn btn-success" @click="saveEdition">Save</button>
                </div>
                <div v-if="edit==true" class = "col">
                    <button id = "cancelButton" v-if="edit==true" class = "w-100 btn btn-danger" @click="editRequest">Cancel</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>

import axios from "axios"

export default {
    data: function() {
        return {
            edit: false
        }
    },

    methods: {
        editRequest: function(event) {
            event.preventDefault();

            this.edit = !this.edit;
        },

        saveEdition: function() {

            const $ = require("jquery");
            window.$ = $;
            
            var usernameVal = $("#nicknameInput").val();
            var nameVal = $("#nameInput").val();
            var surnamesVal = $("#surnamesInput").val();
            var passwordVal = $("#passwordInput").val();

            if (usernameVal == "")
                usernameVal = this.$parent.user.nick;
            
            if (nameVal == "")
                nameVal = this.$parent.user.nombre;
            
            if (surnamesVal == "")
                surnamesVal = this.$parent.user.apellidos;
            
            if (passwordVal == "") 
                passwordVal = this.$parent.user.password;
            

             

            axios.post("/editRequest", {nickname: usernameVal, name: nameVal, surnames: surnamesVal, password: passwordVal}).then(res => {
                 
                
                if (res.data.message == "User info succesfully updated") {
                    this.$parent.user.nick = usernameVal;
                    this.$parent.user.nombre = nameVal;
                    this.$parent.user.apellidos = surnamesVal;
                    this.$parent.user.password = passwordVal;
                }
            });
        }
    }
}
</script>

<style>
#userConfigDiv{
    background-color: #242424;
    color: #ededed;
}

#buttonRow {
    background-color: transparent;
}

#saveButton {
    padding: .375rem .75rem !important;
}

#cancelButton {
    font-size: 20px;
}

.form-row {
    background-color: #ededed;
    color: #242424;
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