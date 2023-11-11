function carregarApi(){
    document.getElementById('loadingSpinner').style.display = 'flex';

    setTimeout(() => {
        document.getElementById('loadingSpinner').style.display = 'none';
    }, 800);
}

window.addEventListener("load", carregarApi);

function cadastrarUsuario(){
    carregarApi();
    event.preventDefault();

    const apiUrl = "http://191.252.153.53:81/api/Usuario/registrarUsuario";

    var nomeUsuario = document.getElementById('nome').value;
    var emailUsuario = document.getElementById('email').value;
    var cidadeUsuario = document.getElementById('cidade').value;
    var estadoUsuario = document.getElementById('estado').value; 
    var contatoUsuario = document.getElementById('telefone').value;
    var senhaUsuario = document.getElementById('senha').value;

    if(document.querySelector("#senha").value == document.querySelector("#confirmaSenha").value)
    {
        var senhaUsuario = document.querySelector("#senha").value;
    }
    else
    {
        window.alert("As senhas não coincidem");
        return
    }

    cadastro = {
        nome: nomeUsuario,
        cidade: cidadeUsuario,
        estado: estadoUsuario,
        email: emailUsuario,
        senha: senhaUsuario,
        contato: contatoUsuario,
        observacao: ""
    }
    
    fetch(apiUrl,{
        method: 'POST',
        headers:{
            'Content-type':'application/json',
        },
        body: JSON.stringify(cadastro),
    })
    .then(response =>{
        if(!response.ok){
            throw new Error('Erro ao realizar cadastro');
        }
        return response.text();
    })
    .then(data =>{
        //console.log('Sucesso', data);
        
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
    })
    .catch((error) =>{
        //console.log('Error', error);

        var erroModal = new bootstrap.Modal(document.getElementById('erroModal'));
        erroModal.show();
    })
}