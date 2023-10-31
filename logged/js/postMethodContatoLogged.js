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