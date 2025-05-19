// sessão
function validarSessao() {
  var email = sessionStorage.EMAIL_USUARIO;
  var nome = sessionStorage.NOME_USUARIO;

  var b_usuario = document.getElementById("b_usuario");

  if (email != null && nome != null) {
    b_usuario.innerHTML = nome;
  } else {
    window.location = "../login.html";
  }
}

function limparSessao() {
  sessionStorage.clear();
  window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
  var divAguardar = document.getElementById("div_aguardar");
  divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
  var divAguardar = document.getElementById("div_aguardar");
  divAguardar.style.display = "none";

  var divErrosLogin = document.getElementById("div_erros_login");
  if (texto) {
    divErrosLogin.style.display = "flex";
    divErrosLogin.innerHTML = texto;
  }
}

function ceckBox(json) {
    if (json.trabalhoVar == true) json.trabalhoVar = 1;
    else json.trabalhoVar = 0;
    if (json.diaVar == true) json.diaVar = 1;
    else json.diaVar = 0;
    if (json.viagemVar == true) json.viagemVar = 1;
    else json.viagemVar = 0;
    if (json.trabalhoCarVar == true) json.trabalhoCarVar = 1;
    else json.trabalhoCarVar = 0;

    if (json.economiaVar == true) json.economiaVar = 1;
    else json.economiaVar = 0;
    if (json.manutencaoVar == true) json.manutencaoVar = 1;
    else json.manutencaoVar = 0;
    if (json.segurancaVar == true) json.segurancaVar = 1;
    else json.segurancaVar = 0;
    if (json.designVar == true) json.designVar = 1;
    else json.designVar = 0;
    if (json.espacoVar == true) json.espacoVar = 1;
    else json.espacoVar = 0;
    if (json.revendaVar == true) json.revendaVar = 1;
    else json.revendaVar = 0;
    if (json.desempenhoVar == true) json.desempenhoVar = 1;
    else json.desempenhoVar = 0;
  }