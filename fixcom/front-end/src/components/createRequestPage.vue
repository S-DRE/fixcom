<template>
<div id = "createRequestPage" class="d-flex flex-direction-column justify-content-center align-items-center vh-100">
<form id = "requestForm" class = "text-center w-75 h-75" @submit = "createRequest" enctype="multipart/form-data">
    
        <h3>Publish a new request</h3>

        <div class="form-row transparent mb-4">
            <div class="col">
                <input type="text" id="title" name="title" class="form-control" placeholder="Title" maxlength="100" required>
            </div>
        </div>

        <div class="form-row transparent mb-4">
            <textarea class="form-control" id="description" name="description" placeholder="Description" maxlength="2000" required></textarea>
        </div>

        <div class="form-row transparent mb-4">
            <div class="col">
                <input type="text" id="city" name="city" class="form-control" placeholder="City" maxlength="60" required>
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
        <button id = "publishForm" class="btn btn-info my-4 btn-block" type="submit">Publish request</button>
        <hr style = "border: 0.3px solid white;">
</form>
</div>
</template>

<script>
const $ = require("jquery");


window.$ = $;

$(".custom-file-input").on("change", function() {
var fileName = $(this).val().split("\\").pop();
$(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});


import axios from "axios"

export default {
     methods: {
          createRequest: function(event) {
              event.preventDefault();

              // var titleValue = $("#title").val();
              // var descriptionValue = $("#description").val();
            
              let formData = new FormData();

              var infoLabel = $("#infoLabel");
              
               
               
              
              for (let i = 0; i < document.forms[0].elements.length; i++) {
                if (document.forms[0].elements[i].type == "file") {
                     
                    formData.append(document.forms[0].elements[i].id, document.forms[0].elements[i].files[0]); // Only one photo is sent
                } else {
                    formData.append(document.forms[0].elements[i].id, document.forms[0].elements[i].value);
                }
              }

              // Photo upload
              // var photoFile = $("#photoFile");

              // Axios post petition
              axios.post("https://fixcom.mywire.org/createRequest", formData).then(res => {
                 
                 
                
                if (res.data.status == "OK") {
                    infoLabel.addClass("btn-success");
                    infoLabel.removeClass("btn-danger");
                    infoLabel.text("Request successfully created");
                } else {
                    infoLabel.addClass("btn-danger");
                    infoLabel.removeClass("btn-success");
                    infoLabel.text("Error creating the request");
                }
              });
          }
     }
}
</script>

<style>
#createRequestPage{
    background-color: #242424;
    color: #ededed;
}

.transparent {
    background-color: transparent !important;
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