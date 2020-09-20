document.body.onload = addElemento

var linha = 3
var coluna = 3

var matriz 

function addElemento() {
    for(var i = 0; i < linha; i ++) {
            // cria uma <div> 
            var divNova = document.createElement('div')
            divNova.setAttribute('id', `div-${i}`)
        
        for(var j = 0; j < coluna; j++) {
            // cria um <input> 
            var inputNovo = document.createElement('input')
            inputNovo.setAttribute('type', 'text')
            inputNovo.setAttribute('id', `${i}-${j}`)
            inputNovo.setAttribute('class', 'elemento-Matriz')

            // <input> se torna filho da <div> nova
            divNova.appendChild(inputNovo)
        }
        
        var sec = document.getElementById('sec')
        var divAtual = document.getElementById('div-10')
        
        // adiciona a nova <div> na <section>
        // antes da <div> atual
        sec.insertBefore(divNova, divAtual)

    }

    iniciaMatriz()
}

function libera() {
    for(var i = 0; i < linha; i++) {
        var sec = document.getElementById('sec')
        var divAtual = document.getElementById(`div-${i}`)
        
        // remove <div> criada em addElemento()
        sec.removeChild(divAtual)
    }
}

function aumenta() {
    if(linha < 8 && coluna < 8) {
        libera()
    
        linha = linha + 1
        coluna = coluna + 1

        addElemento()
    }
}

function diminiu() {
    if(linha > 2 && coluna > 2) {
        libera()
    
        linha = linha - 1
        coluna = coluna - 1

        addElemento()
    }
}

function iniciaMatriz () {
    matriz = []
    for(var i = 0; i < linha; i++) {
        matriz[i] = []
    
        for(var j = 0; j < coluna; j++) {
            matriz[i][j] = ''
        }
    }
}

function addMatriz() {
    var teste = document.getElementById(`${linha-1}-${coluna-1}`)
    if(teste.value != '') {
        for(var i = 0; i < linha; i++) {
            for(var j = 0; j < coluna; j++) {
                var elemento = document.getElementById(`${i}-${j}`)
                // matriz recebe o valor do <input>
                matriz[i][j] = Number(elemento.value)
            }
        }
    }
}

function showMatriz() {
    for(var i = 0; i < linha; i++) {
        // cria uma <div> 
        var divNova = document.createElement('div')
        divNova.setAttribute('id', `div-Matriz-${i}`)

        for(var j = 0; j < coluna; j++) {
            // cria um <input>
            var inputNovo = document.createElement('input')
            inputNovo.setAttribute('type', 'text')
            inputNovo.setAttribute('id', `Matriz-${i}-${j}`)
            inputNovo.setAttribute('class', 'elemento-Matriz')
            // pega o valor da matriz
            inputNovo.setAttribute('value', `${matriz[i][j]}`)

            // <input> se torna filho da <div> nova
            divNova.appendChild(inputNovo)
        }

        var sec = document.getElementById('sec')
        var divAtual = document.getElementById('div-12')

        // adiciona a nova <div> na <section>
        // antes da <div> atual
        sec.insertBefore(divNova, divAtual)

        if(i == linha - 1) {
            var quebralinha = document.createElement('br')
            sec.insertBefore(quebralinha, divAtual)
        }

    }
}

function liberaMatriz() {
    for(var i = 0; i < linha; i++) {
        var sec = document.getElementById('sec')
        var divAtual = document.getElementById(`div-Matriz-${i}`)
        
        // remove <div> criada em showMatriz()
        sec.removeChild(divAtual)
    }
}

function somar() {
    addMatriz()
    
    var num = document.getElementById('num-Soma')
    if(num.value != '') {
        for(var i = 0; i < linha; i++) {
            for(var j = 0; j < coluna; j++) {
                matriz[i][j] += Number(num.value)
            }
        }
    }
    
    showMatriz()
}

function multiplicar() {
    addMatriz()
    
    var num = document.getElementById('num-Mult')
    if(num.value != '') {
        for(var i = 0; i < linha; i++) {
            for(var j = 0; j < coluna; j++) {
                matriz[i][j] *= Number(num.value)
            }
        }
    }
    
    showMatriz()
}
