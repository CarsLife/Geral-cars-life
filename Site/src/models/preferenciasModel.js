var database = require("../database/config");

function buscarPreferenciasPorId(id) {

    var instrucaoSql = `select
                        pre.orcamentoMin AS orcMin, pre.orcamentoMax AS orcMax, pre.tipoCambio AS cambio, pre.anoMinimo AS anoMin,
                        tu.trabalho AS trabalho, tu.diaADia AS diadia, tu.viagem AS viagem, tu.trabalhoComCarro AS trabalhoCar,
                        pri.economia AS eco, pri.manutencao AS manutencao, pri.seguranca AS seguranca, pri.design AS design, pri.espaco AS espaco, pri.revenda As revenda, pri.desempenho AS desempenho
                        from  usuarios u
                        inner join preferencias pre on pre.fkUsuario = u.id
                        inner join tipoUso tu on tu.fkUsuario = u.id
                        inner join prioridades pri on pri.fkUsuario = u.id
                        WHERE u.id = ${id};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarCarrosPorPreferencias(preferencias) { // <-- Recebe 'preferencias' como argumento
    let instrucaoSql = "SELECT marca, modelo, ano, preco, tipoCambio, tipoCombustivel, portas, consumoCidade, consumoEstrada, round((consumoCidade + consumoEstrada)/2, 2) AS consumo, potenciaCV FROM carsLife.carros WHERE 1=1";

    // --- Filtros Diretos (Ano, Preço, Portas, Consumo Geral) ---

    // Note: Não há 'idUsuario' aqui, pois as preferências já foram buscadas
    if (preferencias.anoMin && preferencias.anoMin !== 0) {
        instrucaoSql += ` AND ano >= ${preferencias.anoMin}`;
    } else {
        instrucaoSql += ` AND ano >= 2015`; // Padrão
    }

    if (preferencias.orcMin && preferencias.orcMax && preferencias.orcMin !== 0 && preferencias.orcMax !== 0) {
        instrucaoSql += ` AND preco BETWEEN ${preferencias.orcMin} AND ${preferencias.orcMax}`;
    } else if (preferencias.orcMin && preferencias.orcMin !== 0) {
        instrucaoSql += ` AND preco >= ${preferencias.orcMin}`;
    } else if (preferencias.orcMax && preferencias.orcMax !== 0) {
        instrucaoSql += ` AND preco <= ${preferencias.orcMax}`;
    } else {
        instrucaoSql += ` AND preco BETWEEN 30000 AND 80000`; // Padrão
    }

    if (preferencias.espaco == 0 && preferencias.viagem == 0 && preferencias.trabalho == 0) {
        instrucaoSql += ` AND portas >= 2`;
    } else {
        instrucaoSql += ` AND portas >= 4`;
    }

    instrucaoSql += ` AND round((consumoCidade + consumoEstrada / 2), 2) >= 13.0`;

    if (preferencias.cambio && preferencias.cambio.toLowerCase() !== "tanto faz") {
        instrucaoSql += ` AND tipoCambio = '${preferencias.cambio}'`;
    }

    if (preferencias.eco == 1) {
        instrucaoSql += ` AND consumoCidade >= 10.0 AND consumoEstrada >= 14.0`;
    }

    if (preferencias.seguranca == 1) {
        instrucaoSql += ` AND ano >= 2018 AND potenciaCV >= 110`;
    }

    if (preferencias.trabalho == 1) {
        instrucaoSql += ` AND consumoCidade >= 9.0 AND portas >= 4`;
    }

    if (preferencias.viagem == 1) {
        instrucaoSql += ` AND consumoEstrada >= 13.0 AND potenciaCV >= 120 AND portas >= 4`;
    }

    if (preferencias.desempenho == 1) {
        instrucaoSql += ` AND potenciaCV >= 150`;
    }

    if (preferencias.revenda == 1) {
        instrucaoSql += ` AND marca IN ('Volkswagen', 'Fiat', 'Chevrolet', 'Hyundai', 'Toyota', 'Honda')`;
    }

    if (preferencias.diadia == 1 && preferencias.trabalho == 0) {
        instrucaoSql += ` AND consumoCidade >= 9.5 AND potenciaCV <= 140`;
    }

    if (preferencias.trabalhoCar == 1) {
        instrucaoSql += ` AND consumoCidade >= 11.0 AND consumoEstrada >= 14.0 AND preco <= 60000`;
    }

    if (preferencias.espaco == 1 && preferencias.viagem == 0 && preferencias.trabalho == 0) {
        instrucaoSql += ` AND portas >= 4`;
    }

    if (preferencias.manutencao == 1) {
        instrucaoSql += ` AND preco <= 75000 AND marca IN ('Volkswagen', 'Fiat', 'Chevrolet', 'Hyundai')`;
    }

    instrucaoSql += ` ORDER BY consumo DESC, ano DESC, preco ASC LIMIT 30;`;

    console.log("Executando a instrução SQL (buscarCarrosPorPreferencias): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarPreferenciasPorId,
    buscarCarrosPorPreferencias
};