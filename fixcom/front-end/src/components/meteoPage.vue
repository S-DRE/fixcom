<template>
    <div id = "meteoPage" class="vh-100 d-flex flex-column justify-content-center align-items-center container-fluid">
      <h1 class="mt-4">Look for the weather in your action range</h1>
      <div class="row w-100 h-100 d-flex justify-content-center">
          <div id = "meteoCard" class="card w-50 h-50 overflow-auto">
            <div class="card-header text-center">
              <i class="fas fa-cloud-sun fa-2x"></i> Meteorology
            </div>

            <div class="card-body">
              <h5 class="card-title text-center">Here you can look for information about meteo predictions</h5>
              <p
                class="card-text text-center"
              >We will return you the actual weather of any city you want!</p>
              <div id="meteoDiv" class="text-center">
                <p class="card-text">
                  Which city do you want to look for?
                  <input id="ciudadInput" />
                  <button id="ciudadButton" name="ciudadButton" value="Buscar información" @click="lookMeteo">Search</button>
                </p>
              </div>
              <br />
              <div id="infoDiv" style="text-align: center; align-items: center;">
                <label id="infoLabel"></label>
                <!--
                        <p id="nombreCiudad">Ciudad: <label id="ciudadLabel"></label></p>
                        <p id=""
                -->
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
    methods: {
        lookMeteo: function() {

            const $ = require("jquery");
            window.$ = $;

            let ciudadInputVal = $("#ciudadInput").val();
            var meteoCard = $("#meteoCard");
             
            $.post("/meteo", {ciudad: ciudadInputVal}, function(res) {
                // window.location = "/meteo";
            
                 
                 

                meteoCard.removeClass("h-50");
                meteoCard.addClass("h-75");

                $("#infoLabel").html(res.info);
            });
        }
    }
}
</script>

<style>
#meteoPage, html {
  background-color: #242424;
  color: #ededed;
}

#meteoCard {
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