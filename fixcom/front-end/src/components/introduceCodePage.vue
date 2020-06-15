<template>
    <div id = "forgotPasswordDiv" class = "d-flex justify-content-center align-items-center w-100 vh-100">
        <form class = "text-center p-5 w-75" @submit = "confirmFinish">
            <p class = "h1 mb-4">Introduce code to confirm the request has been finished</p>
            <p class = "h3">Request ID: {{this.requestID}}</p>
            <div class = "form-group mb-4">
                <div class="row mt-4 w-75 mx-auto">
                    <input type="text" id="code" name="code" class="form-control" placeholder="Finish Code" maxlength="30" required>
                </div>
            </div>
            <label id = "infoLabel" class = "btn btn-block my-6 w-50 mx-auto" style = "display: hidden; oppacity: 0.6;"></label>
            <button class="btn btn-info my-4 btn-block w-75 mx-auto" type = "submit" title = "Confirm finished request">Confirm finished request</button>
        </form>
    </div>
</template>

<script>

import axios from "axios"

export default {
    data: function() {
        return {
            requestID: this.$route.fullPath.split("idRequest=")[1]
        }
    },

    methods: {
      confirmFinish: function() {
        event.preventDefault();

        const $ = require("jquery");
        window.$ = $;

        var codeValue = $("#code").val();

         

        axios.post("/introduceCode", {code: codeValue, requestID: this.requestID}).then(res => {
           
          if (res) {
            if (res.data.message == "Request Finished") {
              this.$router.push("/login");
            } else if (res.data.message == "Code does not coincide") {
              alert(res.data.message);
            } else {
              alert("Something went wrong - Possibly request is already finished");
            }
          }
        });
      }
    }
}
</script>

<style>
#forgotPasswordDiv, html {
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