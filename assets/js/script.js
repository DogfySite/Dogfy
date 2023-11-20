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

function dadosPerfil()  {
    carregarApi();
    var apiUrl = "";

    if(sessionStorage.getItem('OsessionId')){
        var id = sessionStorage.getItem('OsessionId');
        apiUrl = "https://localhost:44309/api/Ong/buscarOngId"
    }

    if(sessionStorage.getItem('UsessionId')){
        var id = sessionStorage.getItem('UsessionId');
        apiUrl = "https://localhost:44309/api/Usuario/buscarUserId"
    }

    var perfil = {
        id: id
    }
    
    fetch(apiUrl,{
        method: 'POST',
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify(perfil),
    })
    .then(response =>{
        if(!response.ok){
            throw new Error('Erro na requisição');
        }
        return response.json();
    })
    .then(data =>{
        preencherModalPerfil(data);
    })
    .catch((error) =>{
        //console.error('Error', error);
    })
}

function preencherModalPerfil(data) {
    const modalBody = document.querySelector('#perfilModal .modal-body');
    if(sessionStorage.getItem('OsessionId')){
        modalBody.innerHTML = `
        <h5>Nome completo: <span>${data.nomeOng}</span></h5>
        <h5>Email: <span>${data.emailOng}</span></h5>
        <h5>Endereço: <span>${data.cidaOng}</span></h5>
        <h5>Telefone: <span>${data.contato}</span></h5>
    `;
    }
    if(sessionStorage.getItem('UsessionId')){
        modalBody.innerHTML = `
        <h5>Nome completo: <span>${data.nome}</span></h5>
        <h5>Email: <span>${data.email}</span></h5>
        <h5>Endereço: <span>${data.cidade}</span></h5>
        <h5>Telefone: <span>${data.contato}</span></h5>
    `;
    }

}

function excluirPerfil(){
    carregarApi();
    var apiUrl = "";

    if(sessionStorage.getItem('OsessionId')){
        var id = sessionStorage.getItem('OsessionId');
        apiUrl = `https://localhost:44309/api/Ong/desativarOng/${id}`
    }

    if(sessionStorage.getItem('UsessionId')){
        var id = sessionStorage.getItem('UsessionId');
        apiUrl = `https://localhost:44309/api/Usuario/desativarUsuario/${id}`
    }

    var perfil = {
        id: id
    }

    fetch(apiUrl,{
        method: 'PUT',
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify(perfil),
    })
    .then(response =>{
        if(!response.ok){
            throw new Error('Erro na requisição');
        }
        return response.text();
    })
    .then(data =>{
        //console.log("Solicitação realizada", data);
        sessionStorage.clear();
        var excludeModal = new bootstrap.Modal(document.getElementById('excludeModal'));
        excludeModal.show();

        setTimeout(() => {
            window.location.href = '/index.html'
        }, 6000);
    })
    .catch((error) =>{
        //console.error('Error', error);
    })
}