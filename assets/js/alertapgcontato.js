// Captura o evento de envio do formulário
document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Mostra o alerta de sucesso
    document.getElementById("successAlert").style.display = "block";

    //limpa o form
    document.getElementById("myForm").reset();

    // Esconde o alerta após 3 segundos
    setTimeout(function () {
        document.getElementById("successAlert").style.display = "none";
    }, 3000);
});