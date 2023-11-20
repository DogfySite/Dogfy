function carregarApi(){
    document.getElementById('loadingSpinner').style.display = 'flex';

    setTimeout(() => {
        document.getElementById('loadingSpinner').style.display = 'none';
    }, 1200);
}

function carregarOngsHomeLogado() {
    carregarApi();
    const apiUrl = "https://localhost:44309/api/Ong/visualizarOngs";
    
    document.getElementById("ongContainer").innerHTML = ""

    const ongContainer = document.getElementById("ongContainer");
    const divRow = document.createElement("div");
    divRow.classList.add("row");

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na requisição: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            setTimeout(() => {
                const limite = 3;

                for (let i = 0; i < Math.min(limite, data.length); i++) {
                    const ong = data[i];
    
                    const divCol = document.createElement("div");
                    divCol.classList.add("col");
    
                    const ongNome = document.createElement("p");
                    ongNome.innerHTML = `<strong>${ong.nomeOng}</strong>`;
    
                    const ongIcon = document.createElement("img");
                    ongIcon.src = "/assets/img/osso.png";
                    ongIcon.alt = "Ícone de cachorro";
    
                    const ongLocalizacao = document.createElement("p2");
                    ongLocalizacao.textContent = ong.cidaOng + ', ' + ong.estadoOng.toUpperCase();
                    divCol.appendChild(ongNome);
                    divCol.appendChild(ongIcon);
                    divCol.appendChild(ongLocalizacao);
    
                    divRow.appendChild(divCol);
                }
    
                ongContainer.appendChild(divRow);
            }, 500);
        })
        .catch(error => {
            
            //console.error("Erro:", error);
        });
}

window.addEventListener("load", carregarOngsHomeLogado);

function userReplace()  {
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