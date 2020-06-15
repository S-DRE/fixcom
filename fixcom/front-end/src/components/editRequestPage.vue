<template>
<div id = "editRequestDiv" class="d-flex flex-direction-column justify-content-center align-items-center vh-100">
    <form id = "editRequestForm" class = "text-center w-75 h-75" @submit = "editRequest" enctype="multipart/form-data">
    
        <h3>Edit request</h3>

        <div class="form-row transparent mb-4">
            <div class="col">
                <input type="text" id="title" name="title" class="form-control" placeholder = "Title" :value="[[request.titulo]]" maxlength="100" required>
            </div>
        </div>

        <div class="form-row transparent mb-4">
            <textarea class="form-control" id="description" name="description" placeholder = "Description" :value="[[request.descripcion]]" maxlength="2000" required></textarea>
        </div>

        <div class="form-row transparent mb-4">
            <div class="col">
                <input type="text" id="city" name="city" class="form-control" placeholder = "City" :value="[[request.ciudad]]" maxlength="60" required>
            </div>
        </div>

        <div class = "input-group">
            <div class = "custom-file">
                <input type="file" id="photoFile" name="photoFile" class="custom-file-input" placeholder="Select a file to upload" required>
                <label class = "custom-file-label" for = "photoFile">Select a descriptive photograph</label>
            </div>
        </div>
        <div class = "void0205"></div>
        <label id = "infoLabel" class = "btn btn-block my-6 w-50 mx-auto" style = "display: hidden; oppacity: 0.6;"></label>
        <button id = "editForm" class="btn btn-info my-4 btn-block" type="submit">Edit request</button>
        <hr style = "border: 0.3px solid white;">
    </form>
</div>
</template>

<script>

import axios from "axios"

export default {
    mounted: function() {
        this.searchRequestInfo();
    },
    data: function() {
        return {
            request: null,
        }
    },
    methods: {
        searchRequestInfo: function() {
            var requestID = this.$route.params.requestID;

            axios.post("/searchRequestInfo", {requestID: requestID}).then(res => {
                 
                this.request = res.data.request[0];
            });
        },

        editRequest: function(event) {
            event.preventDefault();

            const $ = require("jquery");
            window.$ = $;

            var requestID = this.$route.params.requestID;

            var titleVal = $("#title").val();
            var descriptionVal = $("#description").val();
            var cityVal = $("#city").val();

            axios.post("/editRequest", {requestID: requestID, title: titleVal, description: descriptionVal, city: cityVal}).then(res => {
                 

                this.$router.push("/manageRequests");
            });
        }
    }
}
</script>

<style>
#editRequestDiv{
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