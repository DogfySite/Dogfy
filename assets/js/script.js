function realizarLogout(){
    if(sessionStorage.getItem('UsessionId')){
        sessionStorage.clear();
    }

    if(sessionStorage.getItem('OsessionId')){
        sessionStorage.clear();
    }
    var logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
    logoutModal.show();

    setTimeout(() => {
        window.location.href = '/index.html' 
    }, 3000);
}

function carregarApi(){
    document.getElementById('loadingSpinner').style.display = 'flex';

    setTimeout(() => {
        document.getElementById('loadingSpinner').style.display = 'none';
    }, 1200);
}

function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "assets/img/menu_white_36dp.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "assets/img/close_white_36dp.svg";
    }
}

function tipoUsuario(){
    carregarApi();
    if(sessionStorage.getItem('OsessionId') || sessionStorage.getItem('UsessionId')){
        if(!sessionStorage.getItem('OsessionId')){
            window.location.href = 'adoteu.html';
        }else{
            window.location.href = 'adotex.html';
        }
    }else{
        if(!sessionStorage.getItem('OsessionId')){
            window.location.href = '/adote.html';
        }else{
            window.location.href = '/cadastraranimal.html';
        }
    }
}