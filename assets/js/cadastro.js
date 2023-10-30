function carregarApi(){
    document.getElementById('loadingSpinner').style.display = 'flex';
}

function fecharCarregamento(){
    document.getElementById('loadingSpinner').style.display = 'none';
}

function cadastrarUsuario(){
    carregarApi();
    event.preventDefault();

    const apiUrl = "https://localhost:44309/api/Usuario/registrarUsuario";

    var nomeUsuario = document.getElementById('nome').value;
    var emailUsuario = document.getElementById('email').value;
    var cpfUsuario = document.getElementById('cpf').value;
    var ruaUsuario = document.getElementById('rua').value;
    var bairroUsuario = document.getElementById('bairro').value;
    var numeroUsuario = document.getElementById('num').value;
    var cidadeUsuario = document.getElementById('cidade').value;
    var cepUsuario = document.getElementById('cep').value;
    var estadoUsuario = document.getElementById('estado').value; 
    var contatoUsuario = document.getElementById('telefone').value;
    var senhaUsuario = document.getElementById('senha').value;

    cadastro = {
        nome: nomeUsuario,
        cpf: cpfUsuario,
        cep: cepUsuario,
        rua: ruaUsuario,
        bairro: bairroUsuario,
        num: numeroUsuario,
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
        
        setTimeout(() => {
            fecharCarregamento();      
        }, 700);
        
        var successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
    })
    .catch((error) =>{
        console.log('Error', error);
    })
}