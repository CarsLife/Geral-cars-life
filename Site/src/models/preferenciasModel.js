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

function buscarCarrosPorPreferencias(preferencias) {
    let instrucaoSql = `SELECT distinct marca, modelo, ano, preco, tipoCambio, tipoCombustivel, portas, consumoCidade, consumoEstrada, round((consumoCidade + consumoEstrada)/2, 2) AS consumo, potenciaCV FROM carsLife.carros
    WHERE ano >= ${preferencias.anoMin}  AND preco >= ${preferencias.orcMin} AND preco <= ${preferencias.orcMax}`;

    if (preferencias.espaco == 1 || preferencias.viagem == 1 || preferencias.trabalho == 1) {
        instrucaoSql += ` AND portas >= 4`;
    }

    if (preferencias.cambio != "Tanto faz") {
        instrucaoSql += ` AND tipoCambio = '${preferencias.cambio}'`;
    }

    if (preferencias.eco == 1) {
        instrucaoSql += ` AND (consumoCidade + consumoEstrada)/2 >= 12.0`;
    }

    if (preferencias.seguranca == 1) {
        instrucaoSql += ` AND ano >= 2018`;
    }

    if (preferencias.trabalho == 1 && preferencias.consumo == 0) {
        instrucaoSql += ` AND (consumoCidade + consumoEstrada)/2 >= 9.0`;
    }

    if (preferencias.viagem == 1) {
        instrucaoSql += ` AND consumoEstrada >= 13.0`;
    }

    if (preferencias.revenda == 1 || preferencias.manutencao == 1) {
        instrucaoSql += ` AND marca IN ('Volkswagen', 'Fiat', 'Chevrolet', 'Hyundai')`;
    }

    if (preferencias.diadia == 1 && preferencias.trabalho == 0) {
        instrucaoSql += ` AND consumoCidade >= 9.5`;
    }

    if (preferencias.trabalhoCar == 1) {
        instrucaoSql += ` AND (consumoCidade + consumoEstrada)/2 >= 12.0`;
    }

    if (preferencias.desempenho == 1) {
        instrucaoSql += ` ORDER BY potenciaCV DESC, consumo DESC, ano DESC, preco ASC LIMIT 30;`;
    } else {
        instrucaoSql += ` ORDER BY consumo DESC, ano DESC, preco ASC LIMIT 30;`;
    }


    console.log("Executando a instrução SQL (buscarCarrosPorPreferencias): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarPreferenciasPorId,
    buscarCarrosPorPreferencias
};