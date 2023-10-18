   // O Codigo abaixo seleciona os elementos necessários na página e armazena em variáveis

   let navbar = document.querySelector('.header .navbar');
   let navbarLoginCadastro = document.querySelector('.header .navbarloginecadastro');
   let menuBtn = document.querySelector('#menu-btn');

   // O Codigo abaixo adiciona um evento 'click' ao botão do menu

   menuBtn.onclick = () => {

   // Quando o botão do menu é clicado, alterna a classe 'fa-times' no botão do menu
   // e a classe 'active' na navbar e na navbarLoginCadastro

   menuBtn.classList.toggle('fa-times');
   navbar.classList.toggle('active');
   navbarLoginCadastro.classList.toggle('active');
};

   // O Codigo abaixo adiciona um evento 'scroll' à janela

   window.onscroll = () => {

   /* Quando a janela é reduzida, remove a classe 'fa-times' do botão do menu
   e a classe 'active' da navbar e da navbarLoginCadastro */

   menuBtn.classList.remove('fa-times');
   navbar.classList.remove('active');
   navbarLoginCadastro.classList.remove('active');
};
