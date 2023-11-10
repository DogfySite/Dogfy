function carregarApi(){
    document.getElementById('loadingSpinner').style.display = 'flex';

    setTimeout(() => {
        document.getElementById('loadingSpinner').style.display = 'none';
    }, 1200);
}

function carregarPgOngs() {
    carregarApi();
    const apiUrl = "https://localhost:44309/api/Ong/visualizarOngs";

    document.getElementById("ongContainer").innerHTML = "";

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
            console.log(data);
            data.forEach(ong => {
                const divCol = document.createElement("div");
                divCol.classList.add("col");

                const ongNome = document.createElement("p");
                ongNome.innerHTML = `<strong>${ong.nomeOng}</strong>`;

                const ongIcon = document.createElement("img");
                ongIcon.src = "/assets/img/icons8-coração-do-cão-64.png";
                ongIcon.alt = "Ícone de cachorro";

                const ongLocalizacao = document.createElement("p");
                ongLocalizacao.textContent = `${ong.cidaOng}, ${ong.estadoOng.toUpperCase()}`;

                divCol.appendChild(ongNome);
                divCol.appendChild(ongIcon);
                divCol.appendChild(ongLocalizacao);

                divRow.appendChild(divCol);
            });

            // Adicione o divRow ao ongContainer após o loop
            ongContainer.appendChild(divRow);
            
        })
        .catch(error => {
            console.error("Erro:", error);
            setTimeout(() => {
                fecharCarregamento();
            }, 800);
        });
}

window.addEventListener("load", carregarPgOngs);


function registrarOng(){
    const apiUrl = "http://191.252.153.53:81/api/Ong/registrarOng"

    var nomeOng = document.querySelector("#nomedaong").value;
    var cnpjOng = document.querySelector("#cnpj").value;
    var ruaOng = document.querySelector("#rua").value;
    var bairroOng = document.querySelector("#bairro").value;
    var cidaOng = document.querySelector("#cidade").value;
    var estadoOng = document.querySelector("#estado").value;
    var emailOng = document.querySelector("#email").value;
    var contato = document.querySelector("#contato").value;
    var observacao = document.querySelector("#sobre").value;

    if(document.querySelector("#senha").value == document.querySelector("#confirmaSenha").value)
    {
        var senhaOng = document.querySelector("#senha").value;
    }
    else
    {
            
    }
    
    const cadastro = {
        nomeOng: nomeOng,
        cnpjOng: cnpjOng,
        ruaOng: ruaOng,
        numOng: string,
        bairroOng: bairroOng,
        cidaOng: cidaOng,
        estadoOng: estadoOng,
        emailOng: emailOng,
        senhaOng: senhaOng,
        contato: contato,
        observacao: observacao
    }

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-type':'application/json'
        },
        body: JSON.stringify(cadastro)
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Erro na requisição: ' + response.status);
        }
        return response.text();
    })
    .then(data => {
        console.log('Sucesso: ', data);
    })
    .catch((error) => {
        console.log('Erro: ', error);
    })
}