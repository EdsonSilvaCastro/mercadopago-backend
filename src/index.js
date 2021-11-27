var express = require("express");
var app = express();
var cors = require('cors');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var port = 3000;

var app = express();

var User = new Schema({
  name: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String
  }
}, {
  collection: 'users'
})

var Model = mongoose.model('Model', User);

mongoose.connect("mongodb://sharkathon.one:27015/carrerUser").then(() => {
  console.log('Database connected ')
},
  error => {
    console.log('Database not connected : ' + error)
  }
)

app.post("/addname", (req, res) => {
  var myData = new User(req.body);
  myData.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});


// SDK de Mercado Pago
const mercadopago = require ('mercadopago');


//Middleware
app.use(bodyParser.urlencoded({extended: false}))

// Agrega credenciales
mercadopago.configure({
  access_token: 'PROD_ACCESS_TOKEN'
});

app.listen(port, () => {
    console.log('PORT connected: ' + port)
  })
  
app.get('/checkout', (req,res)=>{

    let preference = {
        items: [
          {
            title: 'Mi producto',
            unit_price: 100,
            quantity: 1,
          }
        ]
      };
      
      mercadopago.preferences.create(preference)
      .then(function(response){
      //res.redirect();
        global.id = response.body.id;
      }).catch(function(error){
        console.log(error);
      });
      


});