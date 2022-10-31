class Transacao {
        constructor(tipo, nome, valor) {
            this.tipo = tipo
            this.nome = nome
            this.valor = valor
        }

        validarDados()
}

class Bd {
    constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		} 
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}
}

let bd = new Bd()

function cadastrarTransacao() {
    let tipo = document.getElementById('tipo')
    let nome =document.getElementById('nome')
    let valor =document.getElementById('valor')

    let transacao = new Transacao(
        tipo.value, 
        nome.value, 
        valor.value
    )
    
    bd.gravar(transacao)
}