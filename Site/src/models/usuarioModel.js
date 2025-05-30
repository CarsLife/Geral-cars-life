var database = require("../database/config");
const { cadastrar } = require("./preferenciasModel");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email, dtNasc, dtCadastro FROM usuarios WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarUsuario(nome, email, senha, nasc) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, nasc);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuarios (nome, email, senha, dtNasc)
        VALUES ('${nome}', '${email}', '${senha}', '${nasc}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarPreferencias(orcamentoMin, orcamentoMax, cambio, anoMin, id) {
    console.log("ACESSEI O USUARIO MODEL \n\n function cadastrarDados():", orcamentoMin, orcamentoMax, cambio, anoMin, id);

    // Executando todos os INSERTs em sequência
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


module.exports = {
    autenticar,
    cadastrarUsuario,
    cadastrarPreferencias,
    cadastrarTipo,
    cadastrarPrioridades
};