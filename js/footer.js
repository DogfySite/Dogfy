//Termos

// Obtém o modal
var modalt = document.getElementById("myModalt");
var modalp = document.getElementById("mymodalp");

// Obtém o botão que abre o modal
var btn = document.getElementById("myBtn");
var btn1 = document.getElementById("myBtn1");

// Obtém o elemento <span> que fecha o modal
var span = document.getElementsByClassName("close")[0];
var span1 = document.getElementsByClassName("close")[1];

// Quando o usuário clica no botão, abre o modal 
btn.onclick = function () {
    modalt.style.display = "block";
}

btn1.onclick = function () {
    modalp.style.display = "block";
}

// Quando o usuário clica em <span> (x), fecha o modal
span.onclick = function () {
    modalt.style.display = "none";
}

span1.onclick = function () {
    modalp.style.display = "none";
}

// Quando o usuário clica em qualquer lugar fora do modal, fecha-o
window.onclick = function (event) {
    if (event.target == modalt) {
        modalt.style.display = "none";
    }
    if (event.target == modalp) {
        modalp.style.display = "none";
    }
}


//Voltar ao Topo// 

// Quando o usuário rola para baixo 20px da parte superior do documento, mostra o botão
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  // Obtém a altura total do documento
  var body = document.body;
  var html = document.documentElement;
  var height = Math.max( body.scrollHeight, body.offsetHeight, 
                         html.clientHeight, html.scrollHeight, html.offsetHeight );

  // Obtém a altura da janela de visualização
  var windowHeight = window.innerHeight;

  // Calcula a distância do rodapé
  var footerDistance = height - windowHeight;

  // Se a posição de rolagem atual for maior que a distância do rodapé menos um certo valor (por exemplo, 800), mostra o botão
  if (document.body.scrollTop > footerDistance - 800 || document.documentElement.scrollTop > footerDistance - 800) {
    document.getElementById("btnTopo").style.visibility = "visible";
    document.getElementById("btnTopo").style.opacity = "1";
  } else {
    document.getElementById("btnTopo").style.visibility = "hidden";
    document.getElementById("btnTopo").style.opacity = "0";
  }
}

// Quando o usuário clica no botão, rola para o topo do documento
function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}
