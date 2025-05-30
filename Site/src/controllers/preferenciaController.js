var preferenciasModel = require("../models/preferenciasModel.js");

function buscarPreferenciasPorId(req, res) {
  var idUsuario = req.params.id;

  preferenciasModel.buscarPreferenciasPorId(idUsuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as preferencias do usuario: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarCarrosPorPreferencias(req, res) {
  var idUsuario = req.params.id;

  preferenciasModel.buscarCarrosPorPreferencias(idUsuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as preferencias do usuario: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  buscarPreferenciasPorId,
  buscarCarrosPorPreferencias
}