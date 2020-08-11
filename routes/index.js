var express = require('express');
var router = express.Router();
const { send } = require("../helpers/mailer");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/spamer", (req, res) => {
  let options = { ...req.body };
  // Aquí se selecciona qué plantilla se va a utilizar:
  options.filename = "alert";
  send(options).then((result) => {
    console.log("Email enviado");
    res.status(200).json({ result });
  });
})

module.exports = router;
