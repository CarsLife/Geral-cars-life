var database = require("../database/config");
const { cadastrar } = require("./preferenciasModel");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email, dtNasc, dtCadastro, senha FROM usuarios WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function cadastrarUsuario(nome, email, senha, nasc) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, nasc);

    var instrucaoSql = `
        INSERT INTO usuarios (nome, email, senha, dtNasc)
        VALUES ('${nome}', '${email}', '${senha}', '${nasc}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarPreferencias(orcamentoMin, orcamentoMax, cambio, anoMin, id) {
    console.log("ACESSEI O USUARIO MODEL \n\n function cadastrarDados():", orcamentoMin, orcamentoMax, cambio, anoMin, id);

    const instrucaoSql = `
    INSERT INTO preferencias (fkUsuario, orcamentoMin, orcamentoMax, tipoCambio, anoMinimo)
    VALUES ('${id}', '${orcamentoMin}', '${orcamentoMax}', '${cambio}', '${anoMin}');
    `;

    console.log("Executando a instrução SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function cadastrarTipo(trabalho, dia, viagem, trabalhoCar, id) {
    console.log("ACESSEI O USUARIO MODEL \n\n function cadastrarDados():", trabalho, dia, viagem, trabalhoCar, id);

    const instrucaoSql = `
        INSERT INTO tipoUso (fkUsuario, trabalho, diaADia, viagem, trabalhoComCarro)
        VALUES ('${id}', '${trabalho}', '${dia}', '${viagem}', '${trabalhoCar}');
    `;

    console.log("Executando a instrução SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarPrioridades(economia, manutencao, seguranca, design, espaco, revenda, desempenho, id) {
    console.log("ACESSEI O USUARIO MODEL \n\n function cadastrarDados():", economia, manutencao, seguranca, design, espaco, revenda, desempenho, id);

    const instrucaoSql = `
        INSERT INTO prioridades (fkUsuario, economia, manutencao, seguranca, design, espaco, revenda, desempenho)
        VALUES ('${id}', '${economia}', '${manutencao}', '${seguranca}', '${design}', '${espaco}', '${revenda}', '${desempenho}');
    `;

    console.log("Executando a instrução SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alterarUsuario(nome, email, senha, nasc, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, nasc, idUsuario);

    var instrucaoSql = `
        UPDATE usuarios
        SET nome = '${nome}', email = '${email}', senha = '${senha}', dtNasc = '${nasc}'
        WHERE id = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alterarPreferencias(orcamentoMin, orcamentoMax, cambio, anoMin, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n\n function cadastrarDados():", orcamentoMin, orcamentoMax, cambio, anoMin, idUsuario);

    const instrucaoSql = `
        UPDATE preferencias
        SET orcamentoMin = '${orcamentoMin}', orcamentoMax = '${orcamentoMax}', tipoCambio = '${cambio}', anoMinimo = '${anoMin}'
        WHERE fkUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alterarTipo(trabalho, dia, viagem, trabalhoCar, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n\n function cadastrarDados():", trabalho, dia, viagem, trabalhoCar, idUsuario);

    const instrucaoSql = `
        UPDATE tipoUso
        SET trabalho = '${trabalho}', diaADia = '${dia}', viagem = '${viagem}', trabalhoComCarro = '${trabalhoCar}'
        WHERE fkUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alterarPrioridades(economia, manutencao, seguranca, design, espaco, revenda, desempenho, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n\n function cadastrarDados():", economia, manutencao, seguranca, design, espaco, revenda, desempenho, idUsuario);

    const instrucaoSql = `
        UPDATE prioridades
        SET economia = '${economia}', manutencao = '${manutencao}', seguranca = '${seguranca}', design = '${design}', espaco = '${espaco}', revenda = '${revenda}', desempenho = '${desempenho}'
        WHERE fkUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
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
    alterarPrioridades
};