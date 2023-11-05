function carregarApi(){
    document.getElementById('loadingSpinner').style.display = 'flex';

    setTimeout(() => {
        document.getElementById('loadingSpinner').style.display = 'none';
    }, 800);
}

function solicitarAnimais() {
    const apiUrl = "https://localhost:44309/api/Pet/petsEOngs";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na requisição: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            carregarApi();
            
            //console.log(data);
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
                pElement.innerText = `ONG: ${animal.nomeOng}, \nIdade: ${animal.idade}, \nSexo: ${animal.sexoPet}`;
                pElement.style.fontSize = '15px'

                divCardBody.appendChild(h5Element);
                divCardBody.appendChild(pElement);

                const divCardFooter = document.createElement("div");
                divCardFooter.classList.add("card-footer", "border-light");

                const buttonElement = document.createElement("button");
                buttonElement.href = "";
                buttonElement.classList.add("mt-2", "d-block", "w-100");
                buttonElement.value = animal.idPet;
                buttonElement.innerText = "Quero adotar";
                buttonElement.setAttribute("data-bs-toggle", "modal");
                buttonElement.setAttribute("data-bs-target", `#petModal${animal.idPet}`);
                buttonElement.addEventListener("click", () => {
                    carregarApi();
                    const petId = animal.idPet;

                    const requestBody = {
                        id: petId,
                    };

                    fetch(`https://localhost:44309/api/Pet/buscarPetId`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json", // Especifique o tipo de conteúdo como JSON
                        },
                        body: JSON.stringify(requestBody), // Converte o corpo em JSON
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error("Erro na requisição: " + response.status);
                            }
                            return response.json();
                        })
                        .then(data => {
                            setTimeout(() => {
                                preencherModal(data, petId);
                            }, 700);
                            carregarApi();
                        })
                        .catch(error => {
                            console.error("Erro na requisição:", error);
                        });
                });

                document.body.appendChild(buttonElement);

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

                const modalDiv = document.createElement("div");
                modalDiv.classList.add("modal", "fade");
                modalDiv.id = `petModal${animal.idPet}`;
                modalDiv.tabIndex = "-1";
                modalDiv.setAttribute("aria-labelledby", `petModal${animal.idPet}Label`);
                modalDiv.setAttribute("aria-hidden", "true");

                const modalDialog = document.createElement("div");
                modalDialog.classList.add("modal-dialog");

                const modalContent = document.createElement("div");
                modalContent.classList.add("modal-content");

                const modalHeader = document.createElement("div");
                modalHeader.classList.add("modal-header");

                const modalTitle = document.createElement("h5");
                modalTitle.classList.add("modal-title");
                modalTitle.id = `petModal${animal.idPet}Label`;
                modalTitle.innerText = `Confirme sua adoção:`;

                const closeButton = document.createElement("button");
                closeButton.type = "button";
                closeButton.classList.add("btn-close");
                closeButton.setAttribute("data-bs-dismiss", "modal");
                closeButton.setAttribute("aria-label", "Close");

                const modalBody = document.createElement("div");
                modalBody.classList.add("modal-body");

                modalHeader.appendChild(modalTitle);
                modalHeader.appendChild(closeButton);

                modalContent.appendChild(modalHeader);
                modalContent.appendChild(modalBody);

                modalDialog.appendChild(modalContent);

                modalDiv.appendChild(modalDialog);

                document.body.appendChild(modalDiv);
            });
        })
        .catch(error => {
            console.error("Erro:", error);
            fecharCarregamento();
        });
}

window.addEventListener("load", solicitarAnimais);

function filtrarAnimais() {
    carregarApi();
    event.preventDefault();

    const apiUrl = "https://localhost:44309/api/Pet/filtrarAnimais";
    let portePet = document.getElementById('porte-select').value;
    let sexoPet = document.getElementById('sexo-select').value;
    let tipoPet = document.getElementById('tipo-animal-select').value;
    let cidadePet = document.getElementById('cidade-animal').value;

    if (portePet == 'Todos') {
        portePet = null;
    }
    if (sexoPet == 'Todos') {
        sexoPet = null;
    }
    if (tipoPet == 'Todos') {
        tipoPet = null;
    }
    if (cidadePet == 'Todos') {
        cidadePet = null;
    }

    const filtro = {
        tipoPet: tipoPet,
        porte: portePet,
        sexoPet: sexoPet,
        cidaOng: cidadePet
    }

    //console.log(filtro);
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(filtro),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na requisição" + response.status);
            }
            return response.json()
        })
        .then(data => {
            //console.log(data);
            document.getElementById("petList").innerHTML = "";

            if (data.length === 0) {
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
                pElement.innerText = `ONG: ${animal.nomeOng}, \nIdade: ${animal.idade}, \nSexo: ${animal.sexoPet}`;
                pElement.style.fontSize = '15px'

                divCardBody.appendChild(h5Element);
                divCardBody.appendChild(pElement);

                const divCardFooter = document.createElement("div");
                divCardFooter.classList.add("card-footer", "border-light");

                const buttonElement = document.createElement("button");
                buttonElement.href = "";
                buttonElement.classList.add("mt-2", "d-block", "w-100");
                buttonElement.value = animal.idPet;
                buttonElement.innerText = "Quero adotar";
                buttonElement.setAttribute("data-bs-toggle", "modal");
                buttonElement.setAttribute("data-bs-target", `#petModal${animal.idPet}`);
                buttonElement.addEventListener("click", () => {
                    carregarApi();
                    const petId = animal.idPet;

                    const requestBody = {
                        id: petId,
                    };

                    fetch(`http://191.252.153.53:81/api/Pet/buscarPetId`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json", // Especifique o tipo de conteúdo como JSON
                        },
                        body: JSON.stringify(requestBody), // Converte o corpo em JSON
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error("Erro na requisição: " + response.status);
                            }
                            return response.json();
                        })
                        .then(data => {
                            setTimeout(() => {
                                preencherModal(data, petId);
                            }, 700);
                            setTimeout(() => {
                                fecharCarregamento();
                            }, 1000);
                        })
                        .catch(error => {
                            console.error("Erro na requisição:", error);
                            fecharCarregamento();
                        });
                });

                document.body.appendChild(buttonElement);

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

                const modalDiv = document.createElement("div");
                modalDiv.classList.add("modal", "fade");
                modalDiv.id = `petModal${animal.idPet}`;
                modalDiv.tabIndex = "-1";
                modalDiv.setAttribute("aria-labelledby", `petModal${animal.idPet}Label`);
                modalDiv.setAttribute("aria-hidden", "true");

                const modalDialog = document.createElement("div");
                modalDialog.classList.add("modal-dialog");

                const modalContent = document.createElement("div");
                modalContent.classList.add("modal-content");

                const modalHeader = document.createElement("div");
                modalHeader.classList.add("modal-header");

                const modalTitle = document.createElement("h5");
                modalTitle.classList.add("modal-title");
                modalTitle.id = `petModal${animal.idPet}Label`;
                modalTitle.innerText = `Confirme sua adoção:`;

                const closeButton = document.createElement("button");
                closeButton.type = "button";
                closeButton.classList.add("btn-close");
                closeButton.setAttribute("data-bs-dismiss", "modal");
                closeButton.setAttribute("aria-label", "Close");

                const modalBody = document.createElement("div");
                modalBody.classList.add("modal-body");

                modalHeader.appendChild(modalTitle);
                modalHeader.appendChild(closeButton);

                modalContent.appendChild(modalHeader);
                modalContent.appendChild(modalBody);

                modalDialog.appendChild(modalContent);

                modalDiv.appendChild(modalDialog);

                document.body.appendChild(modalDiv);
            });
        })
        .catch(error => {
            console.error("Erro:", error);
            fecharCarregamento();
        });
}

function preencherModal(data, petId) {
    const modalBody = document.querySelector(`#petModal${petId} .modal-body`);

    modalBody.innerHTML = `
        <img src="${data.imgPet}" style="width: 200px;" alt="Imagem do pet">
        <br><br>
        <strong>Nome: </strong><p>${data.nomePet}</p>
        <strong>Idade: </strong><p>${data.idade}</p>
        <strong>Gênero: </strong><p>${data.sexoPet}</p>
        <strong>ONG localizado: </strong><p>${data.nomeOng}</p>
        <strong>Cidade localizado: </strong><p>${data.cidaOng} - ${data.estadoOng}</p>
        <strong>Por que quer adotar esse pet?</strong>
        <form>
            <label for="sobre"></label><input type="text" class="form-control" id="motivo" name="nome" required><br>
            <strong>Você tem condições para cuidar desse pet com muito amor e carinho?</strong>
            <label for="sobre"></label><input type="text" class="form-control" id="condicao" name="nome" required><br>
            <button type="button" value="${data.idPet}" onclick="enviarAdocao(event)">Confirmo que quero adotar</button>
        </form>
    `;
}

function converterImagem(){
    var buscarImagem = document.getElementById('imagemPet').files;

    if(buscarImagem.length > 0){
        var carregarImagem = buscarImagem[0];
        var lerArquivo = new FileReader();

        lerArquivo.onload = function (arquivoCarregado){
            ImgToBase64 = arquivoCarregado.target.result;

            var novaImagem = document.createElement('img');
            novaImagem.src = ImgToBase64;

            novaImagem.style.width = '300px';
            novaImagem.style.height = '300px';
            novaImagem.style.justifyContent = 'center';

            var container = document.getElementById('imagem-pet');
            container.innerHTML = '';
            container.appendChild(novaImagem);
        }
        lerArquivo.readAsDataURL(carregarImagem);
    }
}

function cadastrarPet() {
    event.preventDefault();
    const apiUrl = "https://localhost:44309/api/Pet/inserirPets";

    if (typeof ImgToBase64 !== undefined && ImgToBase64 !== null) {
        var imagemBase64 = ImgToBase64;

        var idOng = sessionStorage.getItem('OsessionId');
        var nomePet = document.getElementById('nomePet').value.trim();
        var idadePet = document.getElementById('idadePet').value;
        var sexoPet = document.getElementById('sexoPet').value;
        var tipoPet = document.getElementById('tipoPet').value;
        var portePet = document.getElementById('portePet').value;
        var sobrePet = document.getElementById('sobrePet').value;

        var registro = {
            idOng: idOng,
            nomePet: nomePet,
            porte: portePet,
            idade: idadePet,
            sexoPet: sexoPet,
            sobrePet: sobrePet,
            tipoPet: tipoPet,
            imgPet: imagemBase64
        }

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(registro),
        })
            .then(response => response.text())
            .then(data => {
                console.log('Sucesso', data);

                const petCadastradoModal = new bootstrap.Modal(document.getElementById('petCadastrado'));
                petCadastradoModal.show();

                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            })
            .catch(error => console.error('Erro na solicitação', error));
    }
}


function excluirPet(){
    event.preventDefault()

    const apiUrl = "https://localhost:44309/api/Pet/atualizarStatus";

    var idOng = sessionStorage.getItem('OsessionId');
    var nomePet = document.getElementById('nomePetExcluir').value.trim();
    var idadePet = document.getElementById('idadePetExcluir').value;
    var sexoPet = document.getElementById('sexoPetExcluir').value;
    var tipoPet = document.getElementById('tipoPetExcluir').value;
    var portePet = document.getElementById('portePetExcluir').value;

    var excluir = {
        idOng: idOng,
        nomePet: nomePet,
        porte: portePet,
        idade: idadePet,
        sexoPet: sexoPet,
        tipoPet: tipoPet
    }

    fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-type':'application/json'
        },
        body: JSON.stringify(excluir),
    })
    .then(response => response.text())
    .then(data => console.log('Sucesso', data))
    .catch(error => console.error("Erro na solicitação", error))
}

