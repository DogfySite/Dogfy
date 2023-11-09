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

    const apiUrl = "https://localhost:44309/api/Usuario/registrarUsuario";

    var nomeUsuario = document.getElementById('nome').value;
    var emailUsuario = document.getElementById('email').value;
    var cidadeUsuario = document.getElementById('cidade').value;
    var estadoUsuario = document.getElementById('estado').value; 
    var contatoUsuario = document.getElementById('telefone').value;
    var senhaUsuario = document.getElementById('senha').value;

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
        console.log('Sucesso', data);
        
        var successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();

        const fecharModalSucessoBtn = document.getElementById('fecharModalSucesso');

         if (fecharModalSucessoBtn) {
                fecharModalSucessoBtn.addEventListener('click', function () {
                    // Redirecionar para a tela de login
                    window.location.href = 'login.html';
                });
         }
    })
    .catch((error) =>{
        console.log('Error', error);
    })
}