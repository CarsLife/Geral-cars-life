var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrarUsuario", function (req, res) {
  usuarioController.cadastrarUsuario(req, res);
});

router.post("/cadastrarPreferencias", function (req, res) {
  usuarioController.cadastrarPreferencias(req, res);
});

router.post("/cadastrarTipo", function (req, res) {
  usuarioController.cadastrarTipo(req, res);
});

router.post("/cadastrarPrioridades", function (req, res) {
  usuarioController.cadastrarPrioridades(req, res);
});

router.post("/autenticar", function (req, res) {
  usuarioController.autenticar(req, res);
});

router.put("/alterarUsuario", function (req, res) {
  usuarioController.alterarUsuario(req, res);
});

router.put("/alterarPreferencias", function (req, res) {
  usuarioController.alterarPreferencias(req, res);
});

router.put("/alterarTipo", function (req, res) {
  usuarioController.alterarTipo(req, res);
});

router.put("/alterarPrioridades", function (req, res) {
  usuarioController.alterarPrioridades(req, res);
});

module.exports = router;