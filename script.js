class Transacao {
        constructor(tipo, nome, valor) {
            this.tipo = tipo
            this.nome = nome
            this.valor = valor
        }
}

function cadastrarTransacao() {
    let tipo = document.getElementById('tipo')
    let nome =document.getElementById('nome')
    let valor =document.getElementById('valor')

    let transacao = new Transacao(
        tipo.value, 
        nome.value, 
        valor.value
    )
    
    console.log(Transacao)
}