function carregarApi(){
    document.getElementById('loadingSpinner').style.display = 'flex';

    setTimeout(() => {
        document.getElementById('loadingSpinner').style.display = 'none';
    }, 800);
}

function carregarPgOngs() {
    event.preventDefault();
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
            //console.log(data);
            data.forEach(ong => {
                const divCol = document.createElement("div");
                divCol.classList.add("col");

                const ongNome = document.createElement("p");
                ongNome.innerHTML = `<strong>${ong.nomeOng}</strong>`;

                const ongIcon = document.createElement("img");
                ongIcon.src = "assets/img/osso.png";
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
            
            carregarApi();
        })
        .catch(error => {
            //console.error("Erro:", error);
        });
}

window.addEventListener("load", carregarPgOngs);


function registrarOng(){
    carregarApi();
    const apiUrl = "https://localhost:44309/api/Ong/registrarOng"

    var nomeOng = document.querySelector("#nomedaong").value;
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
        window.alert("As senhas não coincidem");
        return
    }
    
    const cadastro = {
        nomeOng: nomeOng,
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
        //console.log('Sucesso: ', data);
        carregarApi();
        
        var cadModal = new bootstrap.Modal(document.getElementById('cadModal'));
        cadModal.hide();
   
        
        setTimeout(() => {
            var successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();

            const btnFechar = document.getElementById('btnFechar');

            if (btnFechar) {
                btnFechar.addEventListener('click', function () {
                    window.location.href = 'login.html';
                });
            }

            const fecharModalSucessoBtn = document.getElementById('fecharModalSucesso');

            if (fecharModalSucessoBtn) {
                    fecharModalSucessoBtn.addEventListener('click', function () {
                        window.location.href = 'login.html';
                    });
            }
        }, 1500);
        
    })
    .catch((error) => {
        //console.log('Erro: ', 'A');

        var erroModal = new bootstrap.Modal(document.getElementById('erroModal'));
        erroModal.show();
    })
}