<template>
  <div id="actingMapDiv" class = "vh-100 d-flex flex-column justify-content-center align-items-center">
    <!--
    <div class = "content">
      <div class = "map">
        <h2>Check in our map the situation of requests in your area</h2>
        <div id = "map"></div>
    -->
    <div class = "void05"></div>
    <h2 class = "ml-5 mr-5">Check in our map the situation of requests in your area</h2>
    <div class = "void05"></div>
    <input id = "cityPicker" class="form-control w-25" title = "Select a city" @input="city = $event.target.value" placeholder="City">
    <div class = "void0205"></div>
    <button id = "cityButton" class = "btn btn-primary" @click="getCityInfo(city)">Search by city</button>
    <div class = "void0205"></div>
    <div style="height: 900px; width: 90%" class = "map d-flex flex-column justify-content-center align-items-center">
      
      <l-map ref="map" 
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: 80%"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"

        class = "d-flex flex-column justify-content-center align-items-center">
        <l-tile-layer :url="url" :attribution="attribution" />
      </l-map>
      </div>
    </div>
</template>

<script>

import { latLng } from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";
import 'leaflet-search';
import "leaflet-search/dist/leaflet-search.src.css";
import axios from "axios";

import L from 'leaflet';

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer
  },
  data() {
    return {
      zoom: 8,
      city: null,
      numberOfCities: 0,
      activeRequests: 0,
      finishedRequests: 0,
      center: latLng(42.886027, -7.970126),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },


  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },

    centerUpdate(center) {
      this.currentCenter = center;
    },

    getCityInfo(city) {
      this.numberOfCities = 0;
      this.activeRequests = 0;
      this.finishedRequests = 0;

      document.getElementById('cityPicker').value = null;

      axios.post("/getCityInfo", {city: city}).then(res => {
         
        this.numberOfCities = res.data.requests.length;

        for (var i = 0; i < this.numberOfCities; i++) {
          if (res.data.requests[i].estado == "Active") {
            this.activeRequests++;
          } else if (res.data.requests[i].estado == "Finished") {
            this.finishedRequests++;
          }
        }
      });

      var vue = this;

      // API Petition
      axios.get("https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=69bb97d127c7458488fd45de309037d9").then(res => {
         
        for(var i = 0; i < res.data.results.length; i++) {
          if (res.data.results[i].formatted.includes(this.city)) {
            var map = this.$refs.map.mapObject;
            const defaultIcon = new L.icon({
              iconUrl: 'https://i0.wp.com/taekwondoamerica.org/wp-content/uploads/2018/04/Location-Marker-Icon.png',
              iconSize: [45, 45],
              iconAnchor: [25, 35],
              popupAnchor: [-2, -30]
            });

            //  { title: res.data.results[i].formatted }, 
            var marker = L.marker([res.data.results[i].geometry.lat, res.data.results[i].geometry.lng], {icon: defaultIcon}).addTo(map);

            marker.bindPopup("<div style = 'text-align: center'><h6><strong><a class = 'city-link text-primary'>" + this.city + "</a></strong></h6><p style = 'color: green;'><strong>Active requests: </strong><b style = 'color: black;'>" + this.activeRequests + "</b></p><p style = 'color: darkred;'><strong>Finished Requests: </strong><b style = 'color: black;'>" + this.finishedRequests + "</b></div>").openPopup();
            
            

            var elements = document.getElementsByClassName("city-link");
            for (var z = 0; z < elements.length; z++) {
              if (z == (elements.length - 1)) {
                elements[z].addEventListener("click", (e) => {
                  vue.searchRequests(e.target.innerHTML);
                });
              }
            }

            break;
          }
        } 
      });
    },

    searchRequests(city) {
      this.$router.push("/SearchRequests?city=" + city);
    }
  },

  mounted: function() {
    const $ = require("jquery");
    window.$ = $;

    var map = this.$refs.map.mapObject;

     
     

    var searchLayer = L.layerGroup().addTo(map);
    map.addControl( new L.Control.Search({layer: searchLayer}))
  }
}




/*
import L from 'leaflet';

export default {
    name: "Map",
    methods: {
        mapInit: function() {
            var myMap = L.map('map').setView([42.886027, -7.970126], 8);
             
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, <a href="https://solarmobi.iessanclemente.net">SolarMobi</a>', maxZoom: 22
            }).addTo(myMap);

            L.control.scale().addTo(myMap);
        }
    },

    mounted: function() {
        this.mapInit();
    },
}
*/
</script>

<style>
#actingMapDiv {
  background-color: #242424;
  color: #ededed;
}

.city-link {
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