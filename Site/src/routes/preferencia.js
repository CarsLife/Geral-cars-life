var express = require("express");
var router = express.Router();

var preferenciaController = require("../controllers/preferenciaController");

router.get("/:Id", function (req, res) {
  preferenciaController.buscarPreferenciasPorId(req, res);
});


module.exports = router;