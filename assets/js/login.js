function validateLogin() {
    event.preventDefault();

    var apiUrl = '';

    var email = document.getElementById('email').value;
    var senha = document.getElementById('password').value;

    if(document.querySelector("#pessoa").checked == true){
        apiUrl = 'https://localhost:44309/api/Usuario/validarLoginUser';

        var login = {
            email: email,
            senhaUsuario: senha
        };

    }

    if(document.querySelector("#ong").checked == true){
        apiUrl = 'https://localhost:44309/api/Ong/validarLogin';

        var login = {
            emailOng: email,
            senhaOng: senha
        };
    }

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(login),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Email ou senha incorretos, por favor verifique.');
            }
            return response.json();
        })  
        .then(data => {
            if(document.querySelector("#pessoa").checked == true){
                sessionStorage.setItem('sessionId', data.idUsuario);
            }else{
                sessionStorage.setItem('sessionId', data.idOng);
            }

            window.location.href = '/ongeusuarioLogado.html';
        })
        .catch((error) => {
            console.error('Error', error);
            document.getElementById('mensagemSucesso').innerHTML = error.message;
        });
}
