
class Transacao {
    //criação e validação dos ID's
        constructor(tipo, nome, valor) {
            this.tipo = tipo
            this.nome = nome
            this.valor = valor
        }

        validarDados(){
            for (let i in this) {
                if(this[i] == undefined || this[i] == null || this[i] == ""){
                    return false
                }
            }
            return true
        }
}

class Bd {
    //constructor para o registro dos ID's
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
    recuperarRegistros() {

        //array de despesa
        let despesas = Array()

        let id = localStorage.getItem('id')
        //recuperar todas as trasações e transformar ela em objeto.
        for(let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))
            despesas.push(despesa)
            //Caso a despesa seja apagada, vire null pulamos.
            if(despesa === null){
                continue
            }
        }

        return despesas
    }
}

let bd = new Bd()

function cadastrarTransacao() {
    //cadastro e validação dos id's
    let tipo = document.getElementById('tipo')
    let nome = document.getElementById('nome')
    let valor = document.getElementById('valor')

    let transacao = new Transacao(
        tipo.value, 
        nome.value, 
        valor.value
    )
    
    if (transacao.validarDados()){
        //Sucesso
        bd.gravar(transacao)
    } else {
        //Erro
        alert ('Dados invalidos, preencha todos os campos')
    }
}

function carregarLista() {
    //Carregar a lista no site
    let despesas = Object()

    despesas = bd.recuperarRegistros()
    var listaTransacao = document.getElementById('listaTransacao')
    /*  <tr>
            <td>+</td>
            <td class="text-left">Lorem ipsum dolor sit amet <br>consectetur</td>
            <td class="text-right">R$ 12.999,99</td>
    </tr>*/
    despesas.forEach(function(d){
        let linha = listaTransacao.insertRow()
        linha.insertCell(0).innerHTML = d.tipo
        linha.insertCell(1).innerHTML = d.nome
        linha.insertCell(2).innerHTML = "R$ " + d.valor
    })
    var total = 0
    for (transacao of despesas) {
        total += transacao.valor * (transacao.tipo == '-' ? -1 : 1)
    } 
    if ( total > 0) {
        calcTotal.insertCell(2).innerHTML = "<b> R$ " + total.toLocaleString('pt-BR', {currency: 'BRL', minimumFractionDigits: 2}) + "</b> </br> [Lucro]"
    } if ( total < 0){
       return calcTotal.insertCell(2).innerHTML = "<b> R$ " + total.toLocaleString('pt-BR', {currency: 'BRL', minimumFractionDigits: 2}) + "</b> </br> [Prejuízo]"
    } if ( total > 0 < 1 ) {
        return calcTotal.insertCell(2).innerHTML = "<b> R$ " + total.toLocaleString('pt-BR', {currency: 'BRL', minimumFractionDigits: 2}) + "</b> </br> [Estável]"
    }}

function limparDados(){
        if (confirm("Você tem certeza que quer Limpar seus dados?")){
            localStorage.clear()} else {
                return false
            }
}

