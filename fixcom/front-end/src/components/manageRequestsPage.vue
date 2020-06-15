<template>
    <div id = "manageRequestsDiv" class = "d-flex flex-column justify-content-center align-items-center w-100 vh-100">
        <h1>Manage your requests</h1>
        <div id = "tableDiv" class = "w-75" style="overflow-x:auto;">
            <label>Your Requests</label>
            <table class = "table table-bordered table-dark">
                <thead class = "table-light text-dark text-center">
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Actions</th>
                    <th>Current state</th>
                </thead>
                <tbody>
                    <tr v-bind:key="request.id" v-for="request in requests">
                        <td class = "title">{{request.titulo}}</td>
                        <td class = "description">{{request.descripcion}}</td>
                        <td class = "image text-center"><img class = "w-50 h-25" v-bind:src="request.foto"></td>
                        <td class = "actions d-flex flex-row justify-content-around align-items-center">
                            <router-link :to="{ name: 'editRequest', params: {requestID: request.id } }">
                                <a class = "nav-link text-dark btn btn-light mr-3">Edit</a>
                            </router-link>
                            |
                            <a class = "nav-link text-light btn btn-danger ml-3" @click="deleteRequest(request.id)">Delete</a>
                        <td class = "state text-center">{{request.estado}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    mounted: function() {
        this.searchUserRequests();
    },

    data: function() {
        return {
            requests: [],
        }
    },

    methods: {
        searchUserRequests: function() {
            // Axios post to select all the user's requests

            const $ = require("jquery");
            window.$ = $;

            this.requests = [];

            // $("#tableDiv").empty();

            axios.post("/manageRequests").then(res => {
                //  

                // Create a new table with the obtained data
                var requests = res.data.requests;
                 

                

                 for (var i = 0; i < requests.length; i++) {

                    // Photo fix
                    requests[i].foto = "./" + requests[i].foto;

                    // Adding the request
                    this.requests.push(requests[i]);
                }
            });
        },

        deleteRequest: function(requestID) {
             
            axios.post("/deleteRequest", {requestID: requestID}).then(() => {
                this.searchUserRequests();
            });
        }
    }
}
</script>

<style>
#manageRequestsDiv{
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