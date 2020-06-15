<template>
    <div id = "userOptionsPage" class = "d-flex flex-column align-items-center w-100 h-100">
        <!-- TODO: Create a section for managing the user's requests and another to manage the claims-->
        <div class = "void05"></div>
        <h1>User options</h1>

        <div class = "void05"></div>
        <h3>General options</h3>

        <div class = "void0205"></div>
        <div id = "divGenOptions" class = "d-flex flex-row justify-content-around align-items-center bg-secondary w-75 border border-light rounded">
            <router-link to = "/userConfig">
                <a id = "userConfigLink" class = "nav-link text-light">User configuration</a>
            </router-link>
            <router-link to = "/manageRequests">
                <a id = "manageRequestsLink" class = "nav-link text-light">Manage Requests</a>
            </router-link>
        </div>  

        <div class = "void05"></div>  
        <div id = "divClaimOptions" @click="collapseArrow" class = "w-75 border border-light rounded text-center d-flex flex-column align-items-center" data-toggle = "collapse" data-target = "#collapseDiv">
            <h4>Manage your request's claims</h4><i id = "downIcon" v-if="collapsedArrow==false" class="fas fa-angle-down"></i><i if = "upIcon" v-else class = "fas fa-angle-up"></i>
            <div id = "collapseDiv" class = "collapse w-100 h-100 d-flex justify-content-center">
                <p v-if="this.requests.length==0">There isn't still any claim in your requests</p>
                <div id = "tableDiv" v-if="this.requests.length>0" class = "w-75 h-75">
                    <table class = "table table-bordered table-dark">
                        <thead class = "table-light text-dark text-center">
                            <th>User</th>
                            <th>Title</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            <tr v-for="(request, i) in this.requests" :key="i">
                                <td class = "title">{{request.nickUsuario}}</td>
                                <td class = "title">{{request.tituloRecado}}</td>
                                 <td class = "actions d-flex justify-content-center">
                                    <button :class="[{'col text-dark btn btn-light w-75 h-75': successItems.includes(i) !== true && dangerItems.includes(i) !== true, 'col btn btn-success text-light w-75 h-75': successItems.includes(i) == true, 'col btn btn-danger text-light w-75 h-75': dangerItems.includes(i) == true}]" @click="grantRequest($event.target, i, request.idclaimer, request.idrecado)">Grant request</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class = "void05"></div>
        <div id = "divFinishOptions" @click="collapseArrow" class = "w-75 mb-2 border border-light rounded text-center d-flex flex-column align-items-center" data-toggle = "collapse" data-target = "#collapseDiv2">
            <h4>Finish the requests you have claimed</h4><i id = "downIcon" v-if="collapsedArrow==false" class="fas fa-angle-down"></i><i if = "upIcon" v-else class = "fas fa-angle-up"></i>
            <div id = "collapseDiv2" class = "collapse w-100 h-100 d-flex justify-content-center">
                <p v-if="this.requestsToFinish.length==0">You haven't still claimed any request</p>
                <div id = "tableDiv" v-if="this.requestsToFinish.length>0" class = "w-75 h-75">
                    <table class = "table table-bordered table-dark">
                        <thead class = "table-light text-dark text-center">
                            <th>Request's creator</th>
                            <th>Request's Title</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            <tr v-for="(request2, i) in this.requestsToFinish" :key="i">
                                <td class = "title">{{request2.nick}}</td>
                                <td class = "title">{{request2.titulo}}</td>
                                 <td class = "actions d-flex justify-content-center">
                                    <button :class="[{'col text-dark btn btn-light w-75 h-75': successFinishItems.includes(i) !== true && dangerFinishItems.includes(i) !== true, 'col btn btn-success text-light w-75 h-75': successFinishItems.includes(i) == true, 'col btn btn-danger text-light w-75 h-75': dangerFinishItems.includes(i) == true}]" @click="finishRequest($event.target, request2.email, i, request2.id)">Finish request</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from "axios"

export default {
    data: function() {
        return {
            requests: [],
            requestsToFinish: [],
            collapsedArrow: false,
            successItems: [],
            dangerItems: [],
            successFinishItems: [],
            dangerFinishItems: [],
            normalClass: 'nav-link col text-dark btn btn-light w-75 h-75',
            successClass: 'nav-link col btn btn-success w-75 h-75',
            dangerClass: 'nav-link col btn btn-danger w-75 h-75'
        }
    },

    
    mounted: function() {
        this.createClaimsTable();
    },

    methods: {
        createClaimsTable: function() {
            const $ = require("jquery");
            window.$ = $;

            this.requests = [];

            // Axios post
            axios.post("/createClaimsTable").then(res => {
                 
                
                this.requests = res.data.claims;
            });

            axios.post("/createPendingClaimsTable").then(res => {
                 
                
                this.requestsToFinish = res.data.claims;
            });
        },

        collapseArrow: function() {
            this.collapsedArrow = !this.collapsedArrow;
        },

        grantRequest: function(pressedButton, solicitudID, claimerID, recadoID) {
            axios.post("/grantRequest", {claimerID: claimerID, requestID: recadoID}).then(res => {
                //  
                //  
                 if (res.data.message == "Request granted successfully") { 
                    this.successItems.push(solicitudID);     
                    // pressedButton.className = "btn btn-success w-75 h-75";
                    pressedButton.textContent = "Granted";
                  } else if (res.data.message == "Request already granted") {
                    this.dangerItems.push(solicitudID);    
                    // pressedButton.className = "btn btn-danger w-75 h-75";
                    pressedButton.textContent = "Already granted";
                  }
            });
        },


        finishRequest: function(pressedButton, email, requestPosition, requestID) {
             

             

            axios.post("/finishRequest", {email: email, requestID: requestID}).then(res => {
                if (res.data.message == "Finish email sent") {
                    this.successFinishItems.push(requestPosition);
                    pressedButton.textContent = "Email Sent";
                } else if (res.data.message == "Error") {
                    this.dangerFinishItems.push(requestPosition);
                    pressedButton.textContent = "Error";
                }
            });
        }
    }
    
}
</script>

<style>
#userOptionsPage, html{
    background-color: #242424;
    color: #ededed;
}

#divClaimOptions, #divFinishOptions {
    background-color: #868e96;
}

#divClaimOptions:hover, #divFinishOptions:hover {
    background-color: #ededed;
    color: #242424;
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