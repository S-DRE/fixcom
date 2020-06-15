<template>
    <nav id = "navbar" class="navbar navbar-expand-md navbar-customcolor bg-customcolor">
        <router-link to = "/"><a id = "navbar-brand" class="navbar-brand">FIXCom</a></router-link>
        <button class="navbar-toggler" type = "button" data-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon">
                <i id = "imagenMenu" class="fas fa-bars" style="color:#454545; font-size:28px;"></i>
            </span>
        </button>
        <div class="collapse navbar-collapse" id="navbarMenu">
            <!-- Typical navbar structure -->
            <ul class="navbar-nav mr-auto">
                <!-- All the nav wrapper -->
                <!-- ml-auto for right positioning -->
                <li v-if="$route.path == '/'" class="nav-item">
                    <!-- A list item of the navbar -->
                    <a id="informationLink" href="#information" class="nav-link">Information</a>
                    <!-- Typical nav link -->
                </li>
                <li v-if="$route.path == '/'" class="nav-item">
                    <a id = "socialMediaLink" href="#socialMedia" class="nav-link">Social Media</a>
                </li>
                <li class="nav-item">
                  <router-link to = "/meteo">
                    <a id = "meteoLink" class="nav-link text-dark">Meteo</a>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to = "/actingMap">
                    <a class="nav-link text-dark">Acting map</a>
                  </router-link>
                </li>
                <li v-if="this.$parent.user != null" class = "nav-item">
                    <router-link to = "/createRequest">
                      <a id = "createRequestLink" class = "nav-link text-dark">Create Request</a>
                    </router-link>
                </li>
                <li v-if="this.$parent.user != null" class = "nav-item">
                    <router-link to = "/searchRequests">
                      <a id = "searchRequestsLink" class = "nav-link text-dark">Search Requests</a>
                    </router-link>
                </li>
            </ul>
            <ul class = "navbar-nav ml-auto">
                <li v-if="this.$parent.user == null" class = "nav-item">
                  <router-link to = "/register">
                    <a id = "registerLink" class = "nav-link">Register</a>
                  </router-link>
                </li>
                <li v-if="this.$parent.user == null" class = "nav-item">
                    <router-link to = "/login">
                        <button id = "loginLink" class = "btn btn-primary text-light nav-link" style = "padding-left: 20px; padding-right: 20px;">LogIn</button>
                    </router-link>
                </li>
                <li v-if="this.$parent.user != null" class = "nav-item d-flex flex-row">
                    Logged as: 
                    <router-link to = "/userOptions">
                      <a id = "userLink" class = "nav-link text-primary">{{this.$parent.user.nick}}</a>
                    </router-link>
                </li>
                <li v-if="this.$parent.user != null" class = "nav-item">
                    <button id = "logoutLink" class = "btn btn-primary text-light nav-link" @click="logout" style = "padding-left: 20px; padding-right: 20px;">LogOut</button>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script type = "text/javascript">
export default {
  methods: {
    logout: function(event) {
      event.preventDefault();

      const $ = require("jquery");
      window.$ = $;

      this.$parent.user = null;
      this.$router.push("/");
    }
  },
  mounted() {
    // Importamos JQuery
    const $ = require("jquery");
    // Lo declaramos globalmente
    window.$ = $;

    require("bootstrap/dist/css/bootstrap.min.css");

     
    // $(document.body).on('click', '#informationLink', (event) => {
    $("#informationLink").click(function() {
       
      event.preventDefault();
      scrollToAnchor($(this));
    });

    $("#buttonStart").click(function() {
      event.preventDefault();
      scrollToAnchor($(this));
    });

    $("#socialMediaLink").click(function() {
      event.preventDefault();
      scrollToAnchor($(this));
    });

    function scrollToAnchor(anchor) {
       
      /* 
    [DEBUG]
     
     

     
     .offset());
    */

      $("html,body").animate(
        { scrollTop: $(anchor[0].hash).offset().top },
        1000
      );
    }
  }
};
</script>

<style>
/* CSS file for index.php */

#navbar {
  z-index: 1;
}

.total-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.no-style-ul ul {
    list-style-type: none;
}

#imagenMenu {
    color:#454545; 
    font-size:28px;
}

#logoImg {
    width: 150px;
    height: 150px;
}

/* Nav Bar */

#navbarMenu {
    font-family: Coda;
}

.navbar-customcolor, .bg.customcolor {
    background-color: #ededed;
}

#navbar-brand {
    color: #ffd24d;
}

#navbar-brand:hover {
    color: #ffff66; 
}

.navbar-brand {
    color: #ffd24d;
    background-color: #474747;
    border: border solid transparent;
    padding: 3px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    font-family: Knewave;
    font-size: 30px !important;
}

.navbar-brand:hover {
    color: #ffff66; 
}

.nav-link {
    color: #474747;
    font-size: 20px;
}

.nav-link:hover {
    color: #000000;
    text-decoration: underline;
}

/* Central page */

.logo{
	width:130px;
	margin:0 auto 35px;
}

.starterPage {
    text-align: center;
    
    background-color: #242424;
    color: #ededed;
}

/* Animations */
.animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translateY(-20px);
      transform: translateY(-20px);
    }
  
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translateY(-20px);
      -ms-transform: translateY(-20px);
      transform: translateY(-20px);
    }
  
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
      -ms-transform: translateY(0);
      transform: translateY(0);
    }
  }
  
.fadeInDown {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
}


@-webkit-keyframes fadeInUp {
    0% {
      opacity: 0;
      -webkit-transform: translateY(20px);
      transform: translateY(20px);
    }
  
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }
  
@keyframes fadeInUp {
    0% {
      opacity: 0;
      -webkit-transform: translateY(20px);
      -ms-transform: translateY(20px);
      transform: translateY(20px);
    }
  
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
      -ms-transform: translateY(0);
      transform: translateY(0);
    }
}
  
.fadeInUp {
    -webkit-animation-name: fadeInUp;
    animation-name: fadeInUp;
}

@-webkit-keyframes fadeInLeft {
    0% {
      opacity: 0;
      -webkit-transform: translateX(-20px);
      transform: translateX(-20px);
    }
  
    100% {
      opacity: 1;
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
  
  @keyframes fadeInLeft {
    0% {
      opacity: 0;
      -webkit-transform: translateX(-20px);
      -ms-transform: translateX(-20px);
      transform: translateX(-20px);
    }
  
    100% {
      opacity: 1;
      -webkit-transform: translateX(0);
      -ms-transform: translateX(0);
      transform: translateX(0);
    }
  }
  
  .fadeInLeft {
    -webkit-animation-name: fadeInLeft;
    animation-name: fadeInLeft;
  }

@-webkit-keyframes fadeInRight {
  0% {
    opacity: 0;
    -webkit-transform: translateX(20px);
    transform: translateX(20px);
  }
  
  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
  
@keyframes fadeInRight {
  0% {
    opacity: 0;
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
    }
  
    100% {
      opacity: 1;
      -webkit-transform: translateX(0);
      -ms-transform: translateX(0);
      transform: translateX(0);
    }
}
  
.fadeInRight {
    -webkit-animation-name: fadeInRight;
    animation-name: fadeInRight;
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