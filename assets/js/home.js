function carregarApi(){
    document.getElementById('loadingSpinner').style.display = 'flex';
}

function fecharCarregamento(){
    document.getElementById('loadingSpinner').style.display = 'none';
}


function carregarOngsHome() {
    carregarApi();
    const apiUrl = "http://191.252.153.53:81/api/Ong/visualizarOngs";
    
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
                    ongIcon.src = "assets/img/icons8-coração-do-cão-64.png"; // Certifique-se de que 'icone' seja a propriedade correta em seus dados.
                    ongIcon.alt = "Ícone de cachorro";
    
                    const ongLocalizacao = document.createElement("p2");
                    ongLocalizacao.textContent = ong.cidaOng + ', ' + ong.estadoOng.toUpperCase(); // Certifique-se de que 'localizacao' seja a propriedade correta em seus dados.
    
                    divCol.appendChild(ongNome);
                    divCol.appendChild(ongIcon);
                    divCol.appendChild(ongLocalizacao);
    
                    divRow.appendChild(divCol);
                }
    
                ongContainer.appendChild(divRow);
            }, 500);

            setTimeout(() => {
                fecharCarregamento();
            }, 800);
        })
        .catch(error => {
            
            console.error("Erro:", error);
            setTimeout(() => {
                fecharCarregamento();
            }, 800);
        });
}

window.addEventListener("load", carregarOngsHome);

