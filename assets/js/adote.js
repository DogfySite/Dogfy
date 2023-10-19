function solicitarAnimais() {
    const apiUrl = "https://localhost:44309/api/Pet/PetsWithOngs";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na requisição: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            document.getElementById("petList").innerHTML = "";

            const divRow = document.createElement("div");
            divRow.classList.add("row", "g-3");

            data.forEach(animal => {
                const divCol = document.createElement("div");
                divCol.classList.add("col-12", "col-sm-6", "col-md-6", "col-lg-4", "col-xl-4");

                const divCard = document.createElement("div");
                divCard.classList.add("card", "text-center", "bg-light", "border-light");

                const aElement = document.createElement("a");
                aElement.href = "";

                const imgElement = document.createElement('img');
                imgElement.src = animal.imgPet;
                imgElement.classList.add("card-img-top");
                imgElement.style.height = "200px";
                imgElement.style.width = "auto";

                aElement.appendChild(imgElement);

                const divCardHeader = document.createElement("div");
                divCardHeader.classList.add("card-header", "border-light");
                divCardHeader.innerText = animal.cidaOng + ", " + animal.estadoOng.toUpperCase();

                const divCardBody = document.createElement("div");
                divCardBody.classList.add("card-body");

                const h5Element = document.createElement("h5");
                h5Element.classList.add("card-title");
                h5Element.innerText = animal.nomePet;

                const pElement = document.createElement("p");
                pElement.classList.add("card-text", "truncar-3l");
                pElement.innerText = `Sobre: ${animal.sobrePet} ONG:${animal.nomeOng}, Idade: ${animal.idade}, Sexo: ${animal.sexoPet}`;

                divCardBody.appendChild(h5Element);
                divCardBody.appendChild(pElement);

                const divCardFooter = document.createElement("div");
                divCardFooter.classList.add("card-footer", "border-light");

                const buttonElement = document.createElement("button");
                buttonElement.href = "";
                buttonElement.classList.add("mt-2", "d-block", "w-100");
                buttonElement.value = animal.idPet;
                buttonElement.innerText = "Quero adotar";
                buttonElement.addEventListener('click', enviarAdocao);
                
                buttonElement.addEventListener('click', function(event) {
                    // Mostre o spinner de carregamento quando o botão for clicado
                    document.getElementById('loadingSpinner').style.display = 'flex';
                
                    enviarAdocao(event);
                });

                const smallElement = document.createElement("small");
                smallElement.classList.add("text-success");
                smallElement.innerText = animal.nomeOng;

                divCardFooter.appendChild(buttonElement);
                divCardFooter.appendChild(smallElement);

                divCard.appendChild(aElement);
                divCard.appendChild(divCardHeader);
                divCard.appendChild(divCardBody);
                divCard.appendChild(divCardFooter);

                divCol.appendChild(divCard);

                divRow.appendChild(divCol);

               document.getElementById("petList").appendChild(divRow);
            });
        })
        .catch(error => {

            console.error("Erro:", error);
        });
}

window.addEventListener("load", solicitarAnimais);

function filtrarAnimais(){
    event.preventDefault();

    const apiUrl = "https://localhost:44309/api/Pet/filtrarAnimais";
    let portePet = document.getElementById('porte-select').value; 
    let sexoPet = document.getElementById('sexo-select').value;
    let tipoPet = document.getElementById('tipo-animal-select').value;
    let cidadePet = document.getElementById('cidade-animal').value;

    if(portePet == 'Todos'){
        portePet = null;
    }
    if(sexoPet == 'Todos'){
        sexoPet = null;
    }
    if(tipoPet == 'Todos'){
        tipoPet = null;
    }
    if(cidadePet == 'Todos'){
        cidadePet = null;
    }

    const filtro = {
        tipoPet: tipoPet,
        porte: portePet,
        sexoPet: sexoPet,
        cidaOng: cidadePet
    }

    console.log(filtro);
    fetch(apiUrl,{
        method: 'POST',
        headers:{
            'Content-type':'application/json',
        },
        body: JSON.stringify(filtro),
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Erro na requisição" + response.status);
        }
        return response.json()
    })
    .then(data => {
        console.log(data);
        document.getElementById("petList").innerHTML = "";

        if(data.length === 0){
            document.getElementById("petList").innerText = "Nenhum resultado encontrado";
            return;
        }

        const divRow = document.createElement("div");
        divRow.classList.add("row", "g-3");

        data.forEach(animal => {
            const divCol = document.createElement("div");
            divCol.classList.add("col-12", "col-sm-6", "col-md-6", "col-lg-4", "col-xl-4");

            const divCard = document.createElement("div");
            divCard.classList.add("card", "text-center", "bg-light", "border-light");

            const aElement = document.createElement("a");
            aElement.href = "";

            const imgElement = document.createElement('img');
            imgElement.src = animal.imgPet;
            imgElement.classList.add("card-img-top");
            imgElement.style.height = "200px";
            imgElement.style.width = "auto";

            aElement.appendChild(imgElement);

            const divCardHeader = document.createElement("div");
            divCardHeader.classList.add("card-header", "border-light");
            divCardHeader.innerText = animal.cidaOng + ", " + animal.estadoOng.toUpperCase();

            const divCardBody = document.createElement("div");
            divCardBody.classList.add("card-body");

            const h5Element = document.createElement("h5");
            h5Element.classList.add("card-title");
            h5Element.innerText = animal.nomePet;

            const pElement = document.createElement("p");
            pElement.classList.add("card-text", "truncar-3l");
            pElement.innerText = `Sobre: ${animal.sobrePet} ONG:${animal.nomeOng}, Idade: ${animal.idade}, Sexo: ${animal.sexoPet}`;

            divCardBody.appendChild(h5Element);
            divCardBody.appendChild(pElement);

            const divCardFooter = document.createElement("div");
            divCardFooter.classList.add("card-footer", "border-light");

            const buttonElement = document.createElement("button");
            buttonElement.href = "";
            buttonElement.classList.add("mt-2", "d-block", "w-100");
            buttonElement.value = animal.idPet;
            buttonElement.innerText = "Quero adotar";
            buttonElement.addEventListener('click', enviarAdocao);
            
            buttonElement.addEventListener('click', function(event) {
                // Mostre o spinner de carregamento quando o botão for clicado
                document.getElementById('loadingSpinner').style.display = 'flex';
            
                enviarAdocao(event);
            });

            const smallElement = document.createElement("small");
            smallElement.classList.add("text-success");
            smallElement.innerText = animal.nomeOng;

            divCardFooter.appendChild(buttonElement);
            divCardFooter.appendChild(smallElement);

           // Adiciona os elementos à lista de animais
           divCard.appendChild(aElement);
           divCard.appendChild(divCardHeader);
           divCard.appendChild(divCardBody);
           divCard.appendChild(divCardFooter);

           divCol.appendChild(divCard);

           divRow.appendChild(divCol);

          document.getElementById("petList").appendChild(divRow);
       });
   })
   .catch(error => {
       console.error("Erro:", error);
   });
}

function enviarAdocao(event){
    const apiUrl = "https://localhost:44309/api/Adoption/EnvioDeAdocao";

    const petId = event.target.value; // Pega o valor do botão que é o ID do pet
    const userId = sessionStorage.getItem('sessionId');
    const dataAdocao = new Date().toISOString();

    const adoption = {
        idUsuario: userId,
        idPet: petId,
        dataAdocao: dataAdocao
    };

    fetch(apiUrl,{
        method: 'POST',
        headers: {
            'Content-type':'application/json'
        },
        body: JSON.stringify(adoption)
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Erro na requisição: ' + response.status)
        }
        return response.text();
    })
    .then(data =>{
        console.log('Sucesso: ', data);

        document.getElementById('loadingSpinner').style.display = 'none';

        var myModal = new bootstrap.Modal(document.getElementById('adoptionModal'), {});
        myModal.show();

        myModal._element.addEventListener('hidden.bs.modal', function (event) {
            location.reload();
        });
    })
    .catch((error) => {
        console.log('Erro:', error);

        document.getElementById('loadingSpinner').style.display = 'none';

        var myModal = new bootstrap.Modal(document.getElementById('adoptionModal'), {});
        myModal.show();

        myModal._element.addEventListener('hidden.bs.modal', function (event) {
            location.reload();
        });
    })
}
