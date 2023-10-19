function validateLogin() {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    const login = {
        email: email,
        senhaUsuario: senha
    }

    fetch('https://localhost:44309/api/Usuario/validarLoginUser', {
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
            sessionStorage.setItem('sessionId', data.idUsuario);
            //document.getElementById('mensagemSucesso').innerHTML = 'Login efetuado com sucesso';
            window.location.href = '/index.html';
        })
        .catch((error) => {
            console.error('Error', error);
            document.getElementById('mensagemSucesso').innerHTML = error.message;
        });
}
