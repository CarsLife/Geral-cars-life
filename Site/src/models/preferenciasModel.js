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


module.exports = {
  buscarPreferenciasPorId
}
