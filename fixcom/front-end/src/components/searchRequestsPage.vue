<template>
    <div id = "searchPage" class = "vh-100 d-flex flex-column justify-content-center align-items-center">
        <form id = "searchForm" class = "d-flex flex-column justify-content-center align-items-center text-center w-100 h-100" @submit = "searchRequests" enctype="multipart/form-data">
                <p class = "h1 mb-4">Search Requests</p>
                <input class = "mb-4 form-control w-50" type="text" id="city" name="city" placeholder="Select a city" maxlength="30" required>
                <button class="btn btn-info my-4 btn-block w-50 mx-auto" type = "submit" title = "Search">Search</button>
        </form>
        <div id = "tableDiv" v-if="requests.length>0" class = "w-75 h-75" style="overflow-x:auto;">
            <label>Requests found in {{this.cityValue}}</label>
            <table class = "table table-bordered table-dark">
                <thead class = "table-light text-dark text-center">
                    <th>User</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    <tr v-bind:key="request.id" v-for="request in requests">
                        <td class = "user">{{request.nick}}</td>
                        <td class = "title">{{request.titulo}}</td>
                        <td class = "description">{{request.descripcion}}</td>
                        <td class = "image"><img class = "fixcom-image" v-bind:src="request.foto"></td>
                        <td class = "actions d-flex justify-content-center">
                            <button :class="[{'col text-dark btn btn-light w-75 h-75': successItems.includes(request.id) !== true && dangerItems.includes(request.id) !== true, 'col btn btn-success text-light w-75 h-75': successItems.includes(request.id) == true, 'col btn btn-danger text-light w-75 h-75': dangerItems.includes(request.id) == true}]" @click="claimRequest($event.target, request.id, request.titulo)">Claim</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    data: function() {
        return {
            cityValue: "",
            requests: [],
            successItems: [],
            dangerItems: []
        }
    },

    methods: {
          searchRequests: function(event) {
              event.preventDefault();

              const $ = require("jquery");
              window.$ = $;

              this.cityValue = $("#city").val();

              this.requests = [];

              // Here I make an axios request with the city as the only parameter
              axios.post("/searchRequests", {city: this.cityValue}).then(res => {
                   

                  var requests = res.data.requests;

                for (var i = 0; i < requests.length; i++) {
                    // Photo fix
                    requests[i].foto = "./" + requests[i].foto;

                    // Adding the request
                    this.requests.push(requests[i]);
                }



                  /*
                   
                  // Now, we have to make a Table with the information we've received
                 
                  document.write("<div id = 'tabla'>" + 
                                     "<thead>" +
                                         "<th>Titulo</th>" +
                                         "<th>Descripción</th>" +
                                         "<th>Imagen</th>" + 
                                         "<th>Estado</th>" + 
                                         );
                  for (request in requests) {
                      // Using document.write
                     
                  }
                
                var label = $("<label>").append("Requests found in " + cityValue + ": ");
                $('#tableDiv').append(label);

                var table = $('<table>').addClass('table').addClass("table-bordered").addClass("table-dark");
                var thead = $("<thead>").addClass("table-light").addClass("text-dark").addClass("text-center");

                var usuario = $("<th>");
                usuario.text("User");

                var titulo = $("<th>");
                titulo.text("Title");

                var descripcion = $("<th>");
                descripcion.text("Description");

                var imagen = $("<th>");
                imagen.text("Image");

                var acciones = $("<th>");
                acciones.text("Actions");

                thead.append(usuario);
                thead.append(titulo);
                thead.append(descripcion);
                thead.append(imagen);
                thead.append(acciones);
                table.append(thead);

                // var loc = window.location.pathname;
                //  
                
                for (var i = 0; i < requests.length; i++) {
                    // Photo fix
                    requests[i].foto = "./" + requests[i].foto;

                    var row = $('<tr>');

                    var usuarioVal = $("<td>");
                    var strong = $("<strong>");
                    strong.append(requests[i].nick);
                    usuarioVal.append(strong);
                    row.append(usuarioVal);

                    var tituloVal = $("<td>");
                    tituloVal.append(requests[i].titulo);
                    row.append(tituloVal);

                    var descripcionVal = $("<td>");
                    descripcionVal.append(requests[i].descripcion);
                    row.append(descripcionVal);
                    
                    var fotoVal = $("<td>");
                    var img = $("<img>");
                    img.attr("src", requests[i].foto);
                    fotoVal.append(img);
                    row.append(fotoVal);

                    var accionesVal = $("<td>").addClass("text-center");
                    
                    var boton = $("<button id = 'boton" + i + "'>").addClass("btn").addClass("btn-light").addClass("w-75").addClass("h-75");
                    
                    boton.on("click", {idRequest: requests[i].id}, (event) => {
                         
                        this.claimRequest(event.target, event.data.idRequest);
                    });

                    boton.append("Claim");
                    accionesVal.append(boton);
                    row.append(accionesVal);

                     
                    table.append(row);
                
                }

                $('#tableDiv').append(table);
                */
              });
          },

          claimRequest: function(pressedButton, idRequest, tituloRequest) {
               
               
               

              // Axios request
              axios.post("/claimRequest", {idRequest: idRequest, tituloRequest: tituloRequest}).then(res => {
                   
                  if (res.data.message == "Request claimed successfully") {
                    // pressedButton.className = "nav-button col btn btn-success w-75 h-75";
                    this.successItems.push(idRequest);
                    pressedButton.textContent = "Claimed";
                  } else if (res.data.message == "Request already claimed") {
                    this.dangerItems.push(idRequest);
                    // pressedButton.className = "nav-button col btn btn-danger w-75 h-75";
                    pressedButton.textContent = "Already claimed";
                  }
              });
          },
    },

    mounted: function() {
        const $ = require("jquery");
        window.$ = $;

        if (window.location.href.includes("city")) {
            $("#city").val(window.location.href.split("city=")[1].split("%20").join(" ").split("%C3%B1").join("ñ"));
        }
    }
}
</script>


<style>
#searchPage{
    background-color: #242424;
    color: #ededed;
}

.nav-button {
    font-size: 20px;
}

.fixcom-image {
    max-width: 300px;
    max-height: 200px;
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