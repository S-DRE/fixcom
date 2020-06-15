import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import axios from "axios"
import "bootstrap"
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
// import LeafletVue from 'leaflet-vue'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

/*
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSpinner)
Vue.component('font-awesome-icon', FontAwesomeIcon)
*/

var VueScrollactive = require('vue-scrollactive');

// Pages
import startPage from "./components/startPage.vue"
import loginPage from "./components/loginPage.vue"
import registerPage from "./components/registerPage.vue"
import meteoPage from "./components/meteoPage.vue"
import createRequestPage from "./components/createRequestPage.vue"
import searchRequestsPage from "./components/searchRequestsPage.vue"
import userOptionsPage from "./components/userOptionsPage.vue"
import userConfigPage from "./components/userConfigPage.vue"
import manageRequestsPage from "./components/manageRequestsPage.vue"
import editRequestPage from "./components/editRequestPage.vue"
import forgotPasswordPage from "./components/forgotPasswordPage.vue"
import newPassword from "./components/newPassword.vue"
import introduceCodePage from "./components/introduceCodePage.vue"
import actingMapPage from "./components/actingMapPage.vue"
import legalAdvicePage from "./components/legalAdvicePage.vue"

Vue.use(VueRouter);
Vue.use(VueScrollactive);
Vue.use(axios);

window.axios=axios;
Vue.config.productionTip = false

// ---------- ROUTES ----------
const router = new VueRouter({
  routes: [
    // ----- Every route needs two parameters: path and component
    {path: "/", component: startPage},
    {path: "/login", component: loginPage},
    {path: "/register", component: registerPage},
    {path: "/meteo", component: meteoPage},
    {path: "/createRequest", component: createRequestPage},
    {path: "/searchRequests", component: searchRequestsPage},
    {path: "/userOptions", component: userOptionsPage},
    {path: "/userConfig", component: userConfigPage},
    {path: "/manageRequests", component: manageRequestsPage},
    {path: '/editRequest/:requestID', name: 'editRequest', component: editRequestPage},
    {path: "/forgotPassword", component: forgotPasswordPage},
    {path: "/newPassword", component: newPassword},
    {path: "/introduceCode", component: introduceCodePage},
    {path: "/actingMap", component: actingMapPage},
    {path: "/legalAdvice", component: legalAdvicePage}
  ],
  mode: "history" // <-- Newer mode (deletes a hash in the link) but doesn't work on older browsers
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
