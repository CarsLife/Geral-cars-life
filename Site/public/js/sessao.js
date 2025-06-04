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

function sumirMensagem() {
  var erro = document.getElementById("erro")
  erro.style.display = "none";
}

function aguardar() {
  var divAguardar = document.getElementById("aguardar");
  divAguardar.style.display = "flex";
}

function finalizarAguardar() {
  var divAguardar = document.getElementById("aguardar");
  divAguardar.style.display = "none"
}


function Fechar() {
  erro.style.display = "none";
}

function verificarSenha(senha) {
    const letrasMinusculas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const letrasMaiusculas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let temMaiuscula = false;
    let temMinuscula = false;
    let temNumero = false;

    for (let i = 0; i < senha.length; i++) {
      const caractere = senha[i];
      if (letrasMaiusculas.includes(caractere)) {
        temMaiuscula = true;
      }
      if (letrasMinusculas.includes(caractere)) {
        temMinuscula = true;
      }
      if (numeros.includes(caractere)) {
        temNumero = true;
      }
    }

    return senha.length >= 8 && temMaiuscula && temMinuscula && temNumero;
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