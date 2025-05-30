var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
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


module.exports = router;