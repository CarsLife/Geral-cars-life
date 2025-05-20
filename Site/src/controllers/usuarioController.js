var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                            .then((resultadoAquarios) => {
                                if (resultadoAquarios.length > 0) {
                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha,
                                        aquarios: resultadoAquarios
                                    });
                                } else {
                                    res.status(204).json({ aquarios: [] });
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
    var email = req.body.emailServer;
    var senha = req.body.senhaServer

    if (orcamentoMin == undefined) {
        res.status(400).send("Seu orçamento mínimo está undefined!");
    } else if (orcamentoMax == undefined) {
        res.status(400).send("Seu orçamento maximo está undefined!");
    } else if (cambio == undefined) {
        res.status(400).send("Seu tipo de cambio está undefined!");
    } else if (anoMin == undefined) {
        res.status(400).send("Seu ano minimo está undefined!");
    } else if (email == undefined || senha == undefined) {
        res.status(400).send("Seu email ou senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarPreferencias(orcamentoMin, orcamentoMax, cambio, anoMin, email, senha)
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
    var email = req.body.emailServer;
    var senha = req.body.senhaServer

    if (trabalho == undefined || dia == undefined || viagem == undefined || trabalhoCar == undefined) {
        res.status(400).send("Seu tipo de uso esta undefined!")
    } else if (email == undefined || senha == undefined) {
        res.status(400).send("Seu email ou senha está undefined!")
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarTipo(trabalho, dia, viagem, trabalhoCar, email, senha)
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
    var email = req.body.emailServer;
    var senha = req.body.senhaServer

    if (economia == undefined || manutencao == undefined || seguranca == undefined || design == undefined || espaco == undefined || revenda == undefined || desempenho == undefined) {
        res.status(400).send("Suas prioridades estão undefined!")
    } else if (email == undefined || senha == undefined) {
        res.status(400).send("Seu email ou senha esta undefined!")
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarPrioridades(economia, manutencao, seguranca, design, espaco, revenda, desempenho, email, senha)
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
    cadastrarPrioridades
}