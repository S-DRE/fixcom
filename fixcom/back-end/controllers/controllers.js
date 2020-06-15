// Controllers.js

// DEBUG
 

DB = require("../db/connection.js");
CryptoJS = require("crypto-js");
var crypto = require("crypto");
formidable = require("formidable");
nodemailer = require('nodemailer'); 


///////// FUNCTIONS ////////////////

exports.web_index = function(req, res) {
     
    res.sendFile("/var/www/fixcom.mywire.org/public/index.html");
}

exports.web_loginPOST = function(req, res) {
    // Axios
    //  
    
    var resOriginal = res;
    var datosUsuarios;

    var nickname = req.body.nickname;
    var password = req.body.password;

    password =  CryptoJS.SHA3(password).toString();

    //  
    //  


    DB.query("SELECT id, nick, nombre, apellidos, email, password FROM usuarios WHERE (email = '" + nickname + "' OR nick = '" + nickname + "') AND password = '" + password + "'", function(err, res, fields) {
        if (err) {
             
            throw err;
        }

        // Connected
        datosUsuarios = res;
        
        /*
         
         

         
         
        */

        // If res returned some user
        if (res.length == 1) {
            // Initialize session
            session = req.session;
            session.usuario = {};
            session.usuario.id = datosUsuarios[0].id;
            session.usuario.nickname = nickname;
            session.usuario.email = datosUsuarios[0].email;
            req.session.save();

            resOriginal.type('json').status(200).send({ status: "OK - Users encountered", data: datosUsuarios });
        } else if (res.length == 0) {
            resOriginal.type('json').status(200).send({ status: "OK - No users found"});
        }
    });
}

exports.web_register = function(req, res) {
    var resOriginal = res;

    var nickname = req.body.nickname;
    var name = req.body.name;
    var surnames = req.body.surnames;
    var email = req.body.email;
    var password = req.body.password;

    password = CryptoJS.SHA3(password);

     
     

    DB.query("INSERT INTO usuarios (nick, nombre, apellidos, password, email) VALUES ('"+ nickname +"', '" + name + "', '" + surnames + "', '" + password + "', '" + email + "')", function(err, res, fields) {
        if (res) {
             
            resOriginal.type('json').status(200).send({ status: "OK", message: "User has been registered"});
        } else if (err) {
             
             
            resOriginal.type('json').status(200).send({ status: "Error", message: "An error has ocurred" });
        }
    });
}

exports.web_meteo = function(req, res) {
   

  let resOriginal = res;

  // Cargamos el módulo request.
  const request = require('request');

  // Definimos nuestra API KEY
  const apiKey = 'd325c87c7d20bc779e1dcc9f8d5b99d3';

   
  // Asignamos a ciudad el parámetro recibido por POST que tenemos en req.body.ciudad
  let ciudad = req.body.ciudad;
  let unidad = 'metric';
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=${unidad}`;
   
  request(url, function (err, res, body) {
    if (err) {
       
      // res.render('/meteo', { info: null, error: 'Error, please try again' });
      resOriginal.type("json").status(400).send({ info: null, status: "error", data: "Error, please try again." });
    } else {
      let info = JSON.parse(body);
      if (info.main == undefined) {
         
        // res.render('/meteo', { info: null, error: 'Error, please try again' });
        resOriginal.type("json").status(404).send({ info: null, status: "error", data: "Error, please try again." });
      } else {
        let infoTexto = `Information about <strong>${info.name}</strong><br/>`;
        infoTexto += `Actual weather:<br/>`;
        infoTexto += `<img src='http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png' alt='${info.weather[0].description}'/><br/>`;

        infoTexto += `Coordinates (latitude,longitude): <strong>(${info.coord.lat},${info.coord.lon})</strong><br/>`;
        infoTexto += `Actual temp: <strong>${info.main.temp}ºC</strong><br/>`;
        infoTexto += `Thermal perception: <strong>${info.main.feels_like}ºC</strong><br/>`;
        infoTexto += `Minimum temp: <strong>${info.main.temp_min}ºC</strong><br/>`;
        infoTexto += `Maximum temp: <strong>${info.main.temp_max}ºC</strong><br/>`;
        infoTexto += `Atmospheric pressure: <strong>${info.main.pressure}</strong><br/>`;
        infoTexto += `Wind velocity: <strong>${info.wind.speed} Km/h</strong><br/>`;
        infoTexto += `Wind direction: <strong>${info.wind.deg}</strong><br/>`;

        // Conversión de hora en formato Unix a hh:mm
        var date = new Date(info.sys.sunrise * 1000);
        var minutos = "0" + date.getMinutes();
        var horaAmanecer = date.getHours() + ':' + minutos.substr(-2);

        var date = new Date(info.sys.sunset * 1000);
        var minutos = "0" + date.getMinutes();
        var horaPuesta = date.getHours() + ':' + minutos.substr(-2);

        infoTexto += `Sunrise time: <strong>${horaAmanecer}</strong><br/>`;
        infoTexto += `Sunset time: <strong>${horaPuesta}</strong><br/>`;
        infoTexto += `Humidity: <strong>${info.main.humidity}%</strong><br/>`;

         
         

         
         
         

        // En vez de esto, enviar un json
        // res.render('/meteo', { info: infoTexto, error: null });
        resOriginal.type("json").status(200).send({ info: infoTexto, status: "ok", data: "Devolviendo la información." });
      }
    }
  });
}

exports.web_createRequest = function(req, res) {
  /*
  let title = req.body.title;
  let description = req.body.description;

   
   

   
   
  */
  let resOriginal = res;
  let sesionActual = req.session;

   
   

  // Formidable
  var form = new formidable.IncomingForm();
            
  form.uploadDir = "/var/www/fixcom.mywire.org/public/back-end/images";
  form.keepExtensions = true;
  form.maxFieldsSize = 200 * 1024 * 1024; // 200 MB
  form.multiples = true;
  
  form.parse(req, (err, fields, files) => {
       

       
       
       
      if (err) {
         

        res.json({
          result: "failed",
          data: {},
          message: `Cannot upload images. The error is: ${err}`
        });
      }

      var image = files.photoFile;

       
       

      if (image) {
        var fileNames = [];
        
        fileNames.push(image.path.split("/public/")[1]);
        
         
         

         

        var idUser = sesionActual.usuario.id;

        // DB INSERT
        DB.query("INSERT INTO recados (idusuario, titulo, descripcion, ciudad, foto) VALUES ('" + idUser + "', '" + fields.title + "', '" + fields.description + "', '" + fields.city + "', '" + fileNames[0] + "')", function(err, res, fields) {
          if (res) {
             
             
            resOriginal.type('json').status(200).send({ status: "OK", message: "Request has been inserted"});
          } else if (err) {
             
             
            resOriginal.type('json').status(200).send({ status: "Error", message: "An error has ocurred" });
          }
        });
      } else {
         

        res.json({
          result: "failed",
          data: {},
          numberOfImages: 0,
          message: "No images to upload!"
        });
      }
  });
}

exports.web_searchRequests = function(req, res) {
  var city = req.body.city;
  let sesionActual = req.session;

  let resOriginal = res;

  // Here I simply make a DB query to SELECT the correct Requests and return them.
  DB.query("SELECT recados.*, usuarios.nick FROM recados JOIN usuarios ON recados.idusuario = usuarios.id WHERE recados.adxudicado IS NULL AND usuarios.id != '" + sesionActual.usuario.id + "' AND ciudad = '" + city + "'", function(err, res, fields) {
    if (res) {
       
       
      resOriginal.type('json').status(200).send({ status: "OK", message: "Requests search was successful", requests: res});
    } else if (err) {
       
       
      resOriginal.type('json').status(200).send({ status: "Error", message: "An error has ocurred" });
    }
  });
}

exports.web_claimRequest = function(req,res) {
  var idUser = req.session.usuario.id;
  var nickUser = req.session.usuario.nickname;
  var idRequest = req.body.idRequest;
  var tituloRequest = req.body.tituloRequest;

  //  

  let resOriginal = res;

  // First, I have to look if the request has previously been claimed

  DB.query("SELECT * FROM solicitudesRecados WHERE idusuario = '" + idUser + "' AND idrecado = '" + idRequest + "'", function(err, res, fields) {
     
    if (res.length == 0) {
       

      // Here, claim can be inserted
      // Insert to N:N table
      DB.query("INSERT INTO solicitudesRecados (idusuario, nickUsuario, idrecado, tituloRecado) VALUES ('" + idUser + "', '" + nickUser + "', '" + idRequest + "', '" + tituloRequest + "')", function(err, res, fields) {
        if (res) {
           
           
          resOriginal.type('json').status(200).send({status: "OK", message: "Request claimed successfully"});
        } else if (err) {
           
           
          resOriginal.type('json').status(200).send({status: "Error", message: "Error claiming the request"});
        }
      });

    } else if (res.length > 0) {
       
      resOriginal.type("json").status(200).send({status: "OK", message: "Request already claimed"});
    } else if (err) {
       
      resOriginal.type('json').status(200).send({status: "Error", message: "Error looking for the status of the request"});
    }
  });
}

exports.web_manageRequests = function(req, res) {
  var idUser = req.session.usuario.id;
  let resOriginal = res;

  // DB QUERY - SELECT ALL USER'S REQUESTS
  DB.query("SELECT * FROM recados WHERE idusuario = '" + idUser + "'", function(err, res, fields) {
    if (res) {
       
       
      resOriginal.type('json').status(200).send({ status: "OK", message: "Requests search was successful", requests: res});
    } else if (err) {
       
       
      resOriginal.type('json').status(200).send({ status: "Error", message: "An error has ocurred" });
    }
  });
}

exports.web_deleteRequest = function(req, res) {
   

  var resOriginal = res;
  var requestID = req.body.requestID;

  // Query to delete the request
  DB.query("DELETE FROM recados WHERE id = '" + requestID + "'", function(err, res, fields) {
    if (res) {
       
      resOriginal.type('json').status(200).send({ status: "OK", message: "Your request was succesfully deleted"});
    } else if (err) {
       
       
      resOriginal.type('json').status(200).send({ status: "Error", message: "An error has ocurred" });
    }
  });
}

exports.web_editRequest = function(req, res) {
   

  var requestID = req.body.requestID;
  var title = req.body.title;
  var description = req.body.description;
  var city = req.body.city;
  // var image = req.body.image;

  var resOriginal = res;

  // Query to edit the request
  DB.query("UPDATE recados SET titulo='" + title + "', descripcion='" + description + "', ciudad='" + city + "' WHERE id = " + requestID, function(err, res, fields) {
    if (res) {
       
      resOriginal.type('json').status(200).send({ status: "OK", message: "Request info succesfully updated"});
    } else if (err) {
       
       
      resOriginal.type('json').status(200).send({ status: "Error", message: "An error has ocurred" });
    }
  });
}

exports.web_searchRequestInfo = function(req, res) {

  var resOriginal = res;

  let requestID = req.body.requestID;

  // Make a DB Query
  DB.query("SELECT * FROM recados WHERE id = '" + requestID + "'", function(err, res, fields) {
    if (res) {
       
       
      resOriginal.type('json').status(200).send({ status: "OK", message: "Request search was successful", request: res});
    } else if (err) {
       
       
      resOriginal.type('json').status(200).send({ status: "Error", message: "An error has ocurred" });
    }
  });
}

exports.web_createClaimsTable = function(req, res) {
  var resOriginal = res;
  
  var idUser = req.session.usuario.id;

  // Make DB Query
  DB.query("SELECT *, solicitudesRecados.idusuario AS idclaimer FROM solicitudesRecados JOIN recados ON solicitudesRecados.idrecado = recados.id WHERE recados.idusuario = " + idUser, function(err, res, fields) {
    if (res) {
       
       
      resOriginal.type('json').status(200).send({ status: "OK", message: "Request search was successful", claims: res});
    } else if (err) {
       
       
      resOriginal.type('json').status(200).send({ status: "Error", message: "An error has ocurred"});
    }
  });
}

exports.web_createPendingClaimsTable = function(req, res) {
    var resOriginal = res;

    var idUser = req.session.usuario.id;

    // Make DB Query
    DB.query("SELECT usuarios.nick, usuarios.email, recados.titulo, recados.id FROM recados JOIN usuarios ON recados.idusuario = usuarios.id WHERE recados.adxudicado = " + idUser + " AND recados.estado = 'Active'", function(err, res, fields) {
      if (res) {
        resOriginal.type("json").status(200).send({status: "OK", message: "Request search was successful", claims: res});
      } else if (err) {
        resOriginal.type("json").status(200).send({ status: "Error", message: "An error has ocurred"});
      }
    });
}

exports.web_grantRequest = function(req, res) {
  var resOriginal = res;
  
  var claimerID =  req.body.claimerID;

   
  var requestID = req.body.requestID;

  //  

  // Make DB query
  DB.query("SELECT adxudicado FROM recados WHERE id = " + requestID, function(err, res, fields) {
     
    if (res[0].adxudicado == null) {

      // Make DB Update
      DB.query("UPDATE recados SET adxudicado = " + claimerID + " WHERE id = " + requestID, function(err, res, fields) {
        if (res) {
           
           

          // Now, I have to eliminate the claim request
          DB.query("DELETE FROM solicitudesRecados WHERE idusuario = " + claimerID + " AND idrecado = " + requestID, function(err, res, fields) {
            if (res) {
              resOriginal.type('json').status(200).send({ status: "OK", message: "Request granted successfully"});
            } else if (err) {
              resOriginal.type('json').status(200).send({ status: "Error", message: "An error has ocurred during delete stmt"});
            }
          });
        } else if (err) {
           
           
          resOriginal.type('json').status(200).send({ status: "Error", message: "An error has ocurred during update stmt"});
        }
      });
    } else if (res[0].adxudicado != null) {
       
      resOriginal.type('json').status(200).send({ status: "OK", message: "Request already granted"});
    } else if (err) {
      resOriginal.type('json').status(200).send({ status: "Error", message: "An error has ocurred during select stmt"});
    }
  });
}

exports.web_finishRequest = function(req, res) {
  resOriginal = res;

  var email = req.body.email; // The email from who has created the request
  var requestID = req.body.requestID;

  var codigoFinalizacion = Math.floor((Math.random() * 10000000) + 1);

  // Nodemailer

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'a19andresaa@iessanclemente.net',
      pass: 'Aloalvand19999'
    }
  });

  var mailOptions = {
    from: 'a19andresaa@iessanclemente.net',
    to: email,
    subject: 'Your request has been finished!',
    text: "The user who claimed your request has finished it! The only thing left is to confirm that everything went OK " +
          "You will be asked to introduce a code, here it is: " + codigoFinalizacion + "\n" +
          "To do so, please click on the link below:\n" +
          "Has the request been finished correctly? If so, click here: https://fixcom.mywire.org/introduceCode?idRequest=" + requestID + "\n" +
          "If not, you can always open a reclamation.\n" + 
          "Thanks,\n\n The FixCom Team."
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
       
      resOriginal.type('json').status(200).send({ status: "OK", message: "Error"});
    } else {
      // DB query to insert the endingCode
      DB.query("UPDATE recados SET codigoFinalizar = " + codigoFinalizacion + " WHERE id = " + requestID, function(err, res, fields) {
        resOriginal.type('json').status(200).send({ status: "OK", message: "Finish email sent"});
      });
       
    }
  });


  
}

exports.web_recuperatePassword = function(req, res) {

    resOriginal = res;
    

    var email = req.body.email;

    var codeDate = new Date();
    codeDate.setMinutes(codeDate.getMinutes() + 150); // timestamp
    codeDate = new Date(codeDate).toISOString().replace("T", " ").replace("Z", "");

     

    var passwordCode = crypto.randomBytes(20).toString('hex');

    DB.query("UPDATE usuarios SET codigoRecuperacion = '" + passwordCode + "' WHERE email = '" + email + "'", function(err, res, fields) {
      if (err) {
         
        resOriginal.type('json').status(200).send({ status: "OK", message: "Error"});
      } else {
        // Set recuperationDate
        DB.query("UPDATE usuarios SET data_caducidade_codigo = '" + codeDate + "' WHERE email = '" + email + "'", function(err, res, fields) {
          if (err) {
             
            resOriginal.type('json').status(200).send({ status: "OK", message: "Error"});
          } else if (res) {
             
            // Send an email to the direction given

            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                  user: 'a19andresaa@iessanclemente.net',
                 pass: 'Aloalvand19999'
              }
            });

            var mailOptions = {
              from: 'a19andresaa@iessanclemente.net',
              to: email,
              subject: 'Password recovery',
              text: "We've received a petition to recuperate your password. To do so, please click on the link below:\n" +
                    "Link to recuperate your password: https://fixcom.mywire.org/newPassword?account=" + email + "&code=" + passwordCode + "\n" +
                    "If you haven't asked for a password change, please ignore this email.\n" + 
                    "Thanks,\n\n The FixCom Team."
            };

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                 
                resOriginal.type('json').status(200).send({ status: "OK", message: "Error"});
              } else {
                 
                resOriginal.type('json').status(200).send({ status: "OK", message: "Recovery mail sent"});
              }
            });
            }
          });      
        }
      });
}

exports.web_newPassword = function(req, res) {

  resOriginal = res;

  var password = req.body.password;
  var email = req.body.email;
  var passwordCode = req.body.code;

  var dateNow = new Date(Date.now());

  password = CryptoJS.SHA3(password);
  DB.query("SELECT codigoRecuperacion, data_caducidade_codigo FROM usuarios WHERE email = '" + email + "'", function(err, res, fields) {
    if (err) {
      resOriginal.type('json').status(200).send({ status: "OK", message: "Error during select operation"});
    } else if (res) {
       
      var dataCaducidade = new Date(res[0].data_caducidade_codigo);
      if(dateNow < dataCaducidade) {;
        if (passwordCode == res[0].codigoRecuperacion) {
          DB.query("UPDATE usuarios SET password = '" + password + "', data_caducidade_codigo = null WHERE email = '" + email + "'", function(err, res, fields) {
            if (res) {
               
              DB.query("UPDATE usuarios SET codigoRecuperacion = " + null + " WHERE email = '" + email + "'", function(err, res, fields) {
                if (err) {
                  resOriginal.type('json').status(200).send({ status: "OK", message: "Error during code update"});
                } else if (res) {
                  resOriginal.type('json').status(200).send({ status: "OK", message: "Password Updated"});
                }
              });
            } else if (err) {
               
              resOriginal.type('json').status(200).send({ status: "OK", message: "Error"});
            }
          });
        } else {
          resOriginal.type('json').status(200).send({ status: "OK", message: "Code does not match"});
        }
      } else {
        DB.query("UPDATE usuarios SET data_caducidade_codigo = null WHERE email = '" + email + "'", function(err, res, fields) {
          if (res) {
            resOriginal.type('json').status(200).send({ status: "OK", message: "The password recovery has expired"});
          } else if (err) {
            resOriginal.type('json').status(200).send({ status: "OK", message: "Error"});
          }
        });
      }
    }
  });
}

exports.web_introduceCode = function(req, res) {
  resOriginal = res;

  var code = req.body.code;
  var requestID = req.body.requestID;


  DB.query("SELECT codigoFinalizar FROM recados WHERE id = '" + requestID + "' AND estado = 'Active'", function(err, res, fields) {
    if (err) {
      resOriginal.type('json').status(200).send({ status: "OK", message: "Error"});
    } else if (res) {
      if (res[0].codigoFinalizar == code) {
        DB.query("UPDATE recados SET estado = 'Finished', codigoFinalizar = null WHERE id = " + requestID , function(err, res, fields) {
          if (err) {
            resOriginal.type('json').status(200).send({ status: "OK", message: "Error"});
          } else if (res) {
            resOriginal.type('json').status(200).send({ status: "OK", message: "Request Finished"});
          }
        });
      } else {
        resOriginal.type('json').status(200).send({ status: "OK", message: "Code does not coincide"});
      }
    }
  });
}

exports.web_getCityInfo = function(req, res) {
  resOriginal = res;

  var city = req.body.city;

  DB.query("SELECT * FROM recados WHERE ciudad = '" + city + "'", function(err, res, fields) {
    if (err) {
      //  
      resOriginal.type('json').status(200).send({ status: "OK", message: "Error"});
    } else if (res) 
    {
      //  
      resOriginal.type('json').status(200).send({ status: "OK", message: "Error", requests: res});
    }
  });
}