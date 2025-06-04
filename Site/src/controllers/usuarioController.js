var usuarioModel = require("../models/usuarioModel");
var preferenciasModel = require("../models/preferenciasModel");

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else {

    usuarioModel.autenticar(email, senha)
      .then(
        function (resultadoAutenticar) {
          console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
          console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

          if (resultadoAutenticar.length == 1) {
            console.log(resultadoAutenticar + " Esse é o resultado autenticar");

            preferenciasModel.buscarPreferenciasPorId(resultadoAutenticar[0].id)
              .then((resultadoPreferencias) => {

                console.log(`\nResultados encontrados: ${resultadoPreferencias.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoPreferencias)}`);
                if (resultadoPreferencias.length > 0) {



                  preferenciasModel.buscarCarrosPorPreferencias(resultadoPreferencias[0])
                    .then((resultadosCarros) => {

                      console.log(`\nResultados encontrados: ${resultadosCarros.length}`);
                      console.log(`Resultados: ${JSON.stringify(resultadosCarros)}`);

                      if (resultadosCarros.length > 0) {
                        res.json({
                          id: resultadoAutenticar[0].id,
                          nome: resultadoAutenticar[0].nome,
                          email: resultadoAutenticar[0].email,
                          senha: resultadoAutenticar[0].senha,
                          nascimento: resultadoAutenticar[0].dtNasc,
                          cadastro: resultadoAutenticar[0].dtCadastro,
                          orcMin: resultadoPreferencias[0].orcMin,
                          orcMax: resultadoPreferencias[0].orcMax,
                          cambio: resultadoPreferencias[0].cambio,
                          anoMin: resultadoPreferencias[0].anoMin,
                          trabalho: resultadoPreferencias[0].trabalho,
                          diadia: resultadoPreferencias[0].diadia,
                          viagem: resultadoPreferencias[0].viagem,
                          trabalhoCar: resultadoPreferencias[0].trabalhoCar,
                          eco: resultadoPreferencias[0].eco,
                          manutencao: resultadoPreferencias[0].manutencao,
                          seguranca: resultadoPreferencias[0].seguranca,
                          design: resultadoPreferencias[0].design,
                          espaco: resultadoPreferencias[0].espaco,
                          revenda: resultadoPreferencias[0].revenda,
                          desempenho: resultadoPreferencias[0].desempenho,
                          carrosRecomendados: resultadosCarros
                        });
                      } else {
                        res.status(204).json({ carros: [] });
                      }
                    })
                } else {
                  res.status(204).json({ preferencias: [] });
                }
              })
          } else if (resultadoAutenticar.length == 0) {
            res.status(403).send("Email e/ou senha inválido(s)");
          } else {
            res.status(403).send("Mais de um usuário com o mesmo login e senha!");
          }
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        }
      );
  }

}

function cadastrarUsuario(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var nasc = req.body.nascServer;


  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (nasc == undefined) {
    res.status(400).send("Sua data de nascimento está undefined!");
  } else {

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.cadastrarUsuario(nome, email, senha, nasc)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastroUsuario! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

function cadastrarPreferencias(req, res) {
  var orcamentoMin = req.body.orcamentoMinServer;
  var orcamentoMax = req.body.orcamentoMaxServer;
  var cambio = req.body.cambioServer;
  var anoMin = req.body.anoMinServer;
  var idUsuario = req.body.idServer

  if (orcamentoMin == undefined) {
    res.status(400).send("Seu orçamento mínimo está undefined!");
  } else if (orcamentoMax == undefined) {
    res.status(400).send("Seu orçamento maximo está undefined!");
  } else if (cambio == undefined) {
    res.status(400).send("Seu tipo de cambio está undefined!");
  } else if (anoMin == undefined) {
    res.status(400).send("Seu ano minimo está undefined!");
  } else if (idUsuario == undefined) {
    res.status(400).send("O id do usuario está undefined!");
  } else {

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.cadastrarPreferencias(orcamentoMin, orcamentoMax, cambio, anoMin, idUsuario)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastroPreferencias! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

function cadastrarTipo(req, res) {
  var trabalho = req.body.trabalhoServer;
  var dia = req.body.diaServer;
  var viagem = req.body.viagemServer;
  var trabalhoCar = req.body.trabalhoCarServer;
  var idUsuario = req.body.idServer


  if (trabalho == undefined || dia == undefined || viagem == undefined || trabalhoCar == undefined) {
    res.status(400).send("Seu tipo de uso está undefined!")
  } else if (idUsuario == undefined) {
    res.status(400).send("O idUsuario está undefined!")
  } else {

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.cadastrarTipo(trabalho, dia, viagem, trabalhoCar, idUsuario)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastroTipo! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

function cadastrarPrioridades(req, res) {
  var economia = req.body.economiaServer;
  var manutencao = req.body.manutencaoServer;
  var seguranca = req.body.segurancaServer;
  var design = req.body.designServer;
  var espaco = req.body.espacoServer;
  var revenda = req.body.revendaServer;
  var desempenho = req.body.desempenhoServer;
  var idUsuario = req.body.idServer


  if (economia == undefined || manutencao == undefined || seguranca == undefined || design == undefined || espaco == undefined || revenda == undefined || desempenho == undefined) {
    res.status(400).send("Suas prioridades estão undefined!")
  } else if (idUsuario == undefined) {
    res.status(400).send("O idUsuario está undefined!")
  } else {

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.cadastrarPrioridades(economia, manutencao, seguranca, design, espaco, revenda, desempenho, idUsuario)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastroPrioridades! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

function alterarUsuario(req, res) {
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var nasc = req.body.nascServer;
  var idUsuario = req.body.idServer


  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (nasc == undefined) {
    res.status(400).send("Sua data de nascimento está undefined!");
  } else if (idUsuario == undefined) {
    res.status(400).send("O id do usuário está undefined!");
  } else {
    usuarioModel.alterarUsuario(nome, email, senha, nasc, idUsuario)
      .then(
        function (resultado) {
          res.json(resultado);

        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastroUsuario! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

function alterarPreferencias(req, res) {
  var orcamentoMin = req.body.orcamentoMinServer;
  var orcamentoMax = req.body.orcamentoMaxServer;
  var cambio = req.body.cambioServer;
  var anoMin = req.body.anoMinServer;
  var idUsuario = req.body.idServer

  if (orcamentoMin == undefined) {
    res.status(400).send("Seu orçamento mínimo está undefined!");
  } else if (orcamentoMax == undefined) {
    res.status(400).send("Seu orçamento maximo está undefined!");
  } else if (cambio == undefined) {
    res.status(400).send("Seu tipo de cambio está undefined!");
  } else if (anoMin == undefined) {
    res.status(400).send("Seu ano minimo está undefined!");
  } else if (idUsuario == undefined) {
    res.status(400).send("O id do usuario está undefined!");
  } else {

    usuarioModel.alterarPreferencias(orcamentoMin, orcamentoMax, cambio, anoMin, idUsuario)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastroPreferencias! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

function alterarTipo(req, res) {
  var trabalho = req.body.trabalhoServer;
  var dia = req.body.diaServer;
  var viagem = req.body.viagemServer;
  var trabalhoCar = req.body.trabalhoCarServer;
  var idUsuario = req.body.idServer


  if (trabalho == undefined || dia == undefined || viagem == undefined || trabalhoCar == undefined) {
    res.status(400).send("Seu tipo de uso está undefined!")
  } else if (idUsuario == undefined) {
    res.status(400).send("O idUsuario está undefined!")
  } else {

    usuarioModel.alterarTipo(trabalho, dia, viagem, trabalhoCar, idUsuario)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastroTipo! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

function alterarPrioridades(req, res) {
  var economia = req.body.economiaServer;
  var manutencao = req.body.manutencaoServer;
  var seguranca = req.body.segurancaServer;
  var design = req.body.designServer;
  var espaco = req.body.espacoServer;
  var revenda = req.body.revendaServer;
  var desempenho = req.body.desempenhoServer;
  var idUsuario = req.body.idServer


  if (economia == undefined || manutencao == undefined || seguranca == undefined || design == undefined || espaco == undefined || revenda == undefined || desempenho == undefined) {
    res.status(400).send("Suas prioridades estão undefined!")
  } else if (idUsuario == undefined) {
    res.status(400).send("O idUsuario está undefined!")
  } else {
    usuarioModel.alterarPrioridades(economia, manutencao, seguranca, design, espaco, revenda, desempenho, idUsuario)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastroPrioridades! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

module.exports = {
  autenticar,
  cadastrarUsuario,
  cadastrarPreferencias,
  cadastrarTipo,
  cadastrarPrioridades,
  alterarUsuario,
  alterarPreferencias,
  alterarTipo,
  alterarPrioridades,
}