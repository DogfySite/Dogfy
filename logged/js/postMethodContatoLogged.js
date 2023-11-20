function carregarApi(){
    document.getElementById('loadingSpinner').style.display = 'flex';

    setTimeout(() => {
        document.getElementById('loadingSpinner').style.display = 'none';
    }, 800);
}

window.addEventListener("load", carregarApi);

function postRequest(url, body){
    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body));

    request.onload = function(){
        console.log(this.responseText);
    }

    return request.responseText;
}

function cadastrarMensagem(){
    event.preventDefault()

    let url = "http://191.252.153.53:81/api/Contato/registrarContato"; 
    
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let mensagem = document.getElementById("mensagem").value;

    body = {
        "nome": nome,
        "email": email,
        "mensagem": mensagem,
    }

    postRequest(url, body)
}

function userReplace()  {
    var apiUrl = "";

    if(sessionStorage.getItem('OsessionId')){
        var id = sessionStorage.getItem('OsessionId');
        apiUrl = "http://191.252.153.53:81/api/Ong/buscarOngId"
    }

    if(sessionStorage.getItem('UsessionId')){
        var id = sessionStorage.getItem('UsessionId');
        apiUrl = "http://191.252.153.53:81/api/Usuario/buscarUserId"
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
        if (sessionStorage.getItem('OsessionId')) {
            var primeiroNomeOng = data.nomeOng.split(' ')[0];
            document.getElementById('helloUser').innerHTML = `Olá, ${primeiroNomeOng}`;
        }
        if (sessionStorage.getItem('UsessionId')) {
            var primeiroNomeUsuario = data.nome.split(' ')[0];
            document.getElementById('helloUser').innerHTML = `Olá, ${primeiroNomeUsuario}`;
        }
    })
    .catch((error) =>{
        //console.error('Error', error);
    })
}

window.addEventListener("load", userReplace);