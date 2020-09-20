document.body.onload = addElementosGeral

function criaNovaMatriz(linha, coluna) {
    var mat = {}
    mat.linha = linha
    mat.coluna = coluna
    mat.matriz = []
    
    for(var i = 0; i < mat.linha; i++) {
        mat.matriz[i] = []
        for(var j = 0; j < mat.coluna; j++) {
            mat.matriz[i][j] = 0
        }
    }

    return mat
}

var A = criaNovaMatriz(3, 3)
var B = criaNovaMatriz(3, 3)
var R = criaNovaMatriz(3, 3)

res = 0

function addElementosGeral() {
    addElementos(A, 'A')
    addElementos(B, 'B')
}

function addElementos(mat, char) {
    var divNova = document.createElement('div')
    divNova.setAttribute('id',`box-Matriz-${char}`)
    
    for(var i = 0; i < mat.linha; i ++) {
            // cria uma <div>linha
            var divLinha = document.createElement('div')
            divLinha.setAttribute('id', `linha-${i}-${char}`)
        
        for(var j = 0; j < mat.coluna; j++) {
            // cria um <input> 
            var inputNovo = document.createElement('input')
            inputNovo.setAttribute('class', 'elemento-Matriz')
            inputNovo.setAttribute('id', `elemento-${i}-${j}-${char}`)

            // <input> se torna filho da <div>Linha
            divLinha.appendChild(inputNovo)
        }

        // <divLinha> se torna filha da <div>Nova
        divNova.appendChild(divLinha)
    }

    var box = document.getElementById(`box-${char}`)
    var divAtual = document.getElementById(`botões-${char}`)
        
    // adiciona a <div>Nova na <div>Box
    // antes da <div>Atual
    box.insertBefore(divNova, divAtual)

}

function aumentaGeral(char) {
    if(char == 'A') {
        aumenta(A, 'A')
        A = criaNovaMatriz(A.linha, A.coluna)
    }
    else if(char == 'B') {
        aumenta(B, 'B')
        B = criaNovaMatriz(B.linha, B.coluna)
    }
}

function aumenta(mat, char) {
    if(mat.linha < 5 && mat.coluna < 5) {
        for(var i = 0; i < mat.linha; i++) {
            var divLinhaAtual = document.getElementById(`linha-${i}-${char}`)
            
            // cria um <input>
            var inputNovo = document.createElement('input')
            inputNovo.setAttribute('class', 'elemento-Matriz')
            inputNovo.setAttribute('id', `elemento-${i}-${mat.coluna}-${char}`)
            // <input> se torna filho da <div>Linha
            divLinhaAtual.appendChild(inputNovo)
        }

        // cria uma <div>Linha
        var divLinhaNova = document.createElement('div')
        divLinhaNova.setAttribute('id', `linha-${mat.linha}-${char}`)
        
        for(var j = 0; j <= mat.coluna; j++) {
            // cria um <input>
            var inputNovo = document.createElement('input')
            inputNovo.setAttribute('class', 'elemento-Matriz')
            inputNovo.setAttribute('id', `elemento-${mat.linha}-${j}-${char}`)

            // <input> se torna filho da <div>LinhaNova
            divLinhaNova.appendChild(inputNovo)
        }

        // <div>LinhaNova se torna filha de <div>BoxMatriz 
        var boxMatriz = document.getElementById(`box-Matriz-${char}`)
        boxMatriz.appendChild(divLinhaNova)
    
        // atualiza os valores da linha e coluna
        mat.linha += 1
        mat.coluna +=1
    }
}

function diminiuGeral(char) {
    if(char == 'A') {
        diminiu(A, 'A')
        A = criaNovaMatriz(A.linha, A.coluna)
    }
    else if(char == 'B') {
        diminiu(B, 'B')
        B = criaNovaMatriz(B.linha, B.coluna)
    }
}

function diminiu(mat, char) {
    if(mat.linha > 2 && mat.coluna > 2) {
        for(var i = 0; i < mat.linha - 1; i++) {
            var divLinhaAtual = document.getElementById(`linha-${i}-${char}`)
            var inputAtual = document.getElementById(`elemento-${i}-${mat.coluna - 1}-${char}`)
            
            // remove <input> criada em addElemento()
            divLinhaAtual.removeChild(inputAtual)
        }
        
        //remove a ultima <div>Linha criada em addElemento()
        var boxMatriz = document.getElementById(`box-Matriz-${char}`)
        boxMatriz.removeChild(boxMatriz.lastChild)
    
        // atualiza os valores da linha e coluna
        mat.linha += -1
        mat.coluna += -1
    }
}

function textNum(text) {
    numerador = ''
    denominador = ''

    var i
    for(i = 0; text[i] != '/'; i++) {
        numerador += text[i]
        
        if(text[i] == '.') {
            return text
        }
    }

    var j
    for(j = i + 1; text[j] != null; j++) {
        denominador += text[j]
    }

    text = Number(numerador) / Number(denominador)

    return text
}

function numText(num) {
    if(Number.isInteger(num)) {
        return num
    }
    else {
        var controle = 0
        if(num < 0) {
            num = - num
            controle = 1
        }
        
        for(var i = 0; i < 1000; i++) {
            for(var j = 1; j < 1000; j++) {
                if((i/j).toFixed(14) == num.toFixed(14)) {
                    if(i == 0) {
                        return 0
                    }
                    else if(i == j) {
                        return 1
                    }
                    if(controle == 1) {
                        var num = `-${i}/${j}`
                    }
                    else {
                        var num = `${i}/${j}`
                    }
                    return num
                }
            }
        }

        return num
    }
}

function recebeElementosGeral(char) {
    if(char == 'A') {
        recebeElementos(A, 'A')
    }
    else if(char == 'B') {
        recebeElementos(B, 'B')
    }
}

function recebeElementos(mat, char) {
    for(var i = 0; i < mat.linha; i++) {
        for(var j = 0; j < mat.coluna; j++) {
            // recebe o <input> 
            var elemento = document.getElementById(`elemento-${i}-${j}-${char}`)
            var num = elemento.value

            // verifica se o valor do <input> é vazio 
            if(num == ''){
                mat.matriz[i][j] = 0
            }
            
            else {
                // verifica se o valor é inteiro
                if(Number.isInteger(Number(num))) {
                    mat.matriz[i][j] = Number(num)
                }
                // se for fração a função textNum() transforma em float
                else {
                    num = textNum(num)
                    mat.matriz[i][j] = Number(num)
                }
            }
        }
    }
}

function showMatriz(mat, char) {
    var divNova = document.createElement('div')
    divNova.setAttribute('class', 'box-Matriz-Resultados')
    divNova.setAttribute('id',`matriz-resultado-${res}-${char}`)


    for(var i = 0; i < mat.linha; i++) {
        var divLinha = document.createElement('div')
        divLinha.setAttribute('id', `linha-${i}-resultado-${res}-${char}`)

        for(var j = 0; j < mat.coluna; j++) {
           var inputNovo = document.createElement('input')
           inputNovo.setAttribute('class', 'elemento-Matriz')
           inputNovo.setAttribute('id', `elemento-${i}-${j}-resultado-${res}-${char}`)
           var num = numText(mat.matriz[i][j])
           inputNovo.setAttribute('value', `${num}`)

           divLinha.appendChild(inputNovo)
        }
        divNova.appendChild(divLinha)
    }

    var divAtual = document.getElementById(`resultados-${res}`)
    
    divAtual.appendChild(divNova)
}

function limpar(char) {
    var divAtual = document.getElementById('resultados')
    var divRemovida = document.getElementById(`resultados-${char}`)
    divAtual.removeChild(divRemovida)

    res += -1
}

function insereA(linha, coluna, res) {
    while(A.linha != linha) {
        if(linha > A.linha) {
            aumentaGeral('A')
        }
        else if(linha < A.linha) {
            diminiuGeral('A')
        }
    }

    for(var i = 0; i < linha; i++) {
        for(var j = 0; j < coluna; j++) {
            var inputRes = document.getElementById(`elemento-${i}-${j}-resultado-${res}-R`)
            var inputMat = document.getElementById(`elemento-${i}-${j}-A`)

            inputMat.value = inputRes.value
        }
    }
}

function insereB(linha, coluna, res) {
    while(B.linha != linha) {
        if(linha > B.linha) {
            aumentaGeral('B')
        }
        else if(linha < B.linha) {
            diminiuGeral('B')
        }
    }

    for(var i = 0; i < linha; i++) {
        for(var j = 0; j < coluna; j++) {
            var inputRes = document.getElementById(`elemento-${i}-${j}-resultado-${res}-R`)
            var inputMat = document.getElementById(`elemento-${i}-${j}-B`)

            inputMat.value = inputRes.value
        }
    }
}

function somaGeral(char) {
    recebeElementosGeral(char)
    
    var divNova = document.createElement('div')
    divNova.setAttribute('class', 'resultados')
    divNova.setAttribute('id', `resultados-${res}`)
    
    var divAtual = document.getElementById('resultados')
    divAtual.insertBefore(divNova, divAtual.firstChild)

    var elemento = document.getElementById(`num-Soma-${char}`)
    var num = elemento.value

    if(Number.isInteger(Number(num))) {
        num = Number(num)
    }
    else {
        num = textNum(num)
        num = Number(num)
    }
    
    if(char == 'A') {
        showMatriz(A, 'A')
        R = soma(A, num)
    }
    else if(char == 'B') {
        showMatriz(B, 'B')
        R= soma(B, num)
    }
    
    var span = document.createElement('span')
    if(num >= 0) {
        span.innerHTML = ` +${numText(num)} = `
    }
    else {
        span.innerHTML = `  ${numText(num)} = `
    }
    divNova.appendChild(span)
    
    showMatriz(R, 'R')

    var inputNovo = document.createElement('input')
    inputNovo.setAttribute('class', 'botão-resposta')
    inputNovo.setAttribute('type', 'button')
    inputNovo.setAttribute('value', 'limpar')
    inputNovo.setAttribute('onclick', `limpar(${res})`)
    divNova.appendChild(inputNovo)

    var inputNovo = document.createElement('input')
    inputNovo.setAttribute('class', 'botão-resposta')
    inputNovo.setAttribute('type', 'button')
    inputNovo.setAttribute('value', 'insere A')
    inputNovo.setAttribute('onclick', `insereA(${R.linha}, ${R.coluna}, ${res})`)
    divNova.appendChild(inputNovo)

    var inputNovo = document.createElement('input')
    inputNovo.setAttribute('class', 'botão-resposta')
    inputNovo.setAttribute('type', 'button')
    inputNovo.setAttribute('value', 'insere B')
    inputNovo.setAttribute('onclick', `insereB(${R.linha}, ${R.coluna}, ${res})`)
    divNova.appendChild(inputNovo)
    
    res += 1
}

function soma(mat, num) {
    var resposta = criaNovaMatriz(mat.linha, mat.coluna)
    
    for(var i = 0; i < mat.linha; i++) {
        for(var j = 0; j < mat.coluna; j++) {
           resposta.matriz[i][j] = mat.matriz[i][j] + num
        }
    }

    return resposta
}

function multiplicaGeral(char) {
    recebeElementosGeral(char)
    
    var divNova = document.createElement('div')
    divNova.setAttribute('class', 'resultados')
    divNova.setAttribute('id', `resultados-${res}`)
    
    var divAtual = document.getElementById('resultados')
    divAtual.insertBefore(divNova, divAtual.firstChild)

    var elemento = document.getElementById(`num-Mult-${char}`)
    var num = elemento.value

    if(Number.isInteger(Number(num))) {
        num = Number(num)
    }
    else {
        num = textNum(num)
        num = Number(num)
    }
    
    if(char == 'A') {
        showMatriz(A, 'A')
        R = multiplica(A, num)
    }
    else if(char == 'B') {
        showMatriz(B, 'B')
        R = multiplica(B, num)
    }
    
    var span = document.createElement('span')
    if(num >= 0) {
        span.innerHTML = ` x ${numText(num)} = `
    }
    else {
        span.innerHTML = ` x (${numText(num)}) = `
    }
    divNova.appendChild(span)
    
    showMatriz(R, 'R')

    var inputNovo = document.createElement('input')
    inputNovo.setAttribute('class', 'botão-resposta')
    inputNovo.setAttribute('type', 'button')
    inputNovo.setAttribute('value', 'limpar')
    inputNovo.setAttribute('onclick', `limpar(${res})`)
    divNova.appendChild(inputNovo)
    
    var inputNovo = document.createElement('input')
    inputNovo.setAttribute('class', 'botão-resposta')
    inputNovo.setAttribute('type', 'button')
    inputNovo.setAttribute('value', 'insere A')
    inputNovo.setAttribute('onclick', `insereA(${R.linha}, ${R.coluna}, ${res})`)
    divNova.appendChild(inputNovo)

    var inputNovo = document.createElement('input')
    inputNovo.setAttribute('class', 'botão-resposta')
    inputNovo.setAttribute('type', 'button')
    inputNovo.setAttribute('value', 'insere B')
    inputNovo.setAttribute('onclick', `insereB(${R.linha}, ${R.coluna}, ${res})`)
    divNova.appendChild(inputNovo)

    res += 1
}

function multiplica(mat, num) {
    var resposta = criaNovaMatriz(mat.linha, mat.coluna)
    
    for(var i = 0; i < mat.linha; i++) {
        for(var j = 0; j < mat.coluna; j++) {
           resposta.matriz[i][j] = mat.matriz[i][j] * num
        }
    }

    return resposta
}

function determinanteGeral(char) {
    recebeElementosGeral(char)
    
    var divNova = document.createElement('div')
    divNova.setAttribute('class', 'resultados')
    divNova.setAttribute('id', `resultados-${res}`)
    
    var divAtual = document.getElementById('resultados')
    divAtual.insertBefore(divNova, divAtual.firstChild)

    if(char == 'A') {
        showMatriz(A, 'A')
        var det = determinante(A)
    }
    else if(char == 'B') {
        showMatriz(B, 'B')
        var det = determinante(B)
    }
    
    var span = document.createElement('span')
    span.innerHTML = ` = ${numText(det)}  `

    divNova.appendChild(span)

    var inputNovo = document.createElement('input')
    inputNovo.setAttribute('class', 'botão-resposta')
    inputNovo.setAttribute('type', 'button')
    inputNovo.setAttribute('value', 'limpar')
    inputNovo.setAttribute('onclick', `limpar(${res})`)
    divNova.appendChild(inputNovo)
    
    res += 1
}

function determinante(mat) {
    if(mat.linha == mat.coluna) {
        var det = 0
        
        if(mat.linha == 2) {
            det = mat.matriz[0][0] * mat.matriz[1][1] - mat.matriz[0][1] * mat.matriz[1][0]
        }
        
        else {
            var nova = criaNovaMatriz(mat.linha -1, mat.coluna -1)
            var exp

            for(var k = 0; k < mat.coluna; k++) {
                var m = 0

                for(var i = 1; i < mat.linha; i++) {
                    var n = 0

                    for(var j = 0; j < mat.coluna; j++) {

                        if(j != k) {
                            nova.matriz[m][n] = mat.matriz[i][j]
                            n += 1
                        }
                    }
                    m += 1
                }
                
                if(k % 2 == 0) {
                    exp = 1
                }
                else {
                    exp = -1
                }
                det += mat.matriz[0][k] * exp * determinante(nova)
            }
        }
    
        return det
    }
}

function transpostaGeral(char) {
    recebeElementosGeral(char)

    var divNova = document.createElement('div')
    divNova.setAttribute('class', 'resultados')
    divNova.setAttribute('id', `resultados-${res}`)
    
    var divAtual = document.getElementById('resultados')
    divAtual.insertBefore(divNova, divAtual.firstChild)

    if(char == 'A') {
        showMatriz(A, 'A')
        R = transposta(A)
    }
    else if(char == 'B') {
        showMatriz(B, 'B')
        R = transposta(B)
    }
    
    var span = document.createElement('span')
    span.innerHTML = ' ^ (T) = '

    divNova.appendChild(span)

    showMatriz(R, 'R')

    var inputNovo = document.createElement('input')
    inputNovo.setAttribute('class', 'botão-resposta')
    inputNovo.setAttribute('type', 'button')
    inputNovo.setAttribute('value', 'limpar')
    inputNovo.setAttribute('onclick', `limpar(${res})`)
    divNova.appendChild(inputNovo)
    
    var inputNovo = document.createElement('input')
    inputNovo.setAttribute('class', 'botão-resposta')
    inputNovo.setAttribute('type', 'button')
    inputNovo.setAttribute('value', 'insere A')
    inputNovo.setAttribute('onclick', `insereA(${R.linha}, ${R.coluna}, ${res})`)
    divNova.appendChild(inputNovo)

    var inputNovo = document.createElement('input')
    inputNovo.setAttribute('class', 'botão-resposta')
    inputNovo.setAttribute('type', 'button')
    inputNovo.setAttribute('value', 'insere B')
    inputNovo.setAttribute('onclick', `insereB(${R.linha}, ${R.coluna}, ${res})`)
    divNova.appendChild(inputNovo)

    res += 1
}

function transposta(mat) {
    var resposta = criaNovaMatriz(mat.linha, mat.coluna)

    for(var i = 0; i < mat.linha; i++){
        for(var j = 0; j < mat.coluna; j++) {
            resposta.matriz[j][i] = mat.matriz[i][j]
        }
    }

    return resposta
}

function inversaGeral(char) {
    recebeElementosGeral(char)
    
    if(char == 'A') {
        var det = determinante(A)
    }
    else {
        var det = determinante(B)
    }
    
    if(det != 0){

        var divNova = document.createElement('div')
        divNova.setAttribute('class', 'resultados')
        divNova.setAttribute('id', `resultados-${res}`)
        
        var divAtual = document.getElementById('resultados')
        divAtual.insertBefore(divNova, divAtual.firstChild)

        if(char == 'A') {
            showMatriz(A, 'A')
            R = inversa(A)
        }
        else if(char == 'B') {
            showMatriz(B, 'B')
            R = inversa(B)
        }
        
        var span = document.createElement('span')
        span.innerHTML = ' ^ (-1) = '

        divNova.appendChild(span)

        showMatriz(R, 'R')

        var inputNovo = document.createElement('input')
        inputNovo.setAttribute('class', 'botão-resposta')
        inputNovo.setAttribute('type', 'button')
        inputNovo.setAttribute('value', 'limpar')
        inputNovo.setAttribute('onclick', `limpar(${res})`)
        divNova.appendChild(inputNovo)
        
        var inputNovo = document.createElement('input')
        inputNovo.setAttribute('class', 'botão-resposta')
        inputNovo.setAttribute('type', 'button')
        inputNovo.setAttribute('value', 'insere A')
        inputNovo.setAttribute('onclick', `insereA(${R.linha}, ${R.coluna}, ${res})`)
        divNova.appendChild(inputNovo)

        var inputNovo = document.createElement('input')
        inputNovo.setAttribute('class', 'botão-resposta')
        inputNovo.setAttribute('type', 'button')
        inputNovo.setAttribute('value', 'insere B')
        inputNovo.setAttribute('onclick', `insereB(${R.linha}, ${R.coluna}, ${res})`)
        divNova.appendChild(inputNovo)

        res += 1
    }
}

function inversa(mat) {
    var det = determinante(mat)
    var ad = adjunta(mat)
    
    if(mat.linha == 2) {
        
        var nova = criaNovaMatriz(2, 2)

        nova.matriz[0][0] = mat.matriz[1][1]
        nova.matriz[0][1] = - mat.matriz[0][1]
        nova.matriz[1][0] = - mat.matriz[1][0]
        nova.matriz[1][1] = mat.matriz[0][0]

        var resultado = multiplica(nova, 1/det)
    }
    
    else {
        var resultado = multiplica(ad, 1/det)
    }

    return resultado
}

function adjunta(mat) {
		
    nova = criaNovaMatriz(mat.linha, mat.coluna)
    
    if(mat.linha == mat.coluna) {
        
        auxiliar = criaNovaMatriz(mat.linha - 1, mat.coluna - 1)
        
        var exp = 0;
        
        for(var i = 0; i < mat.linha; i++) {
            
            for(var j = 0; j < mat.coluna; j++) {
                
                var k = 0;
                
                for(var m = 0; m < mat.linha; m++) {
                    
                    var l = 0;
                    var controle = 0;
                    
                    for(var n = 0; n < mat.coluna; n++) {
                        
                        if(m != i && n != j) {
                            
                            auxiliar.matriz[k][l] = mat.matriz[m][n];
                            
                            l += 1;
                            controle = 1;
                        }
                    }
                    
                    if(controle == 1) {
                        k += 1;
                    }
                }
                
                if((i + j) % 2 == 0) {
                    exp = 1;
                }
                else {
                    exp = -1;
                }
            
                nova.matriz[i][j] = exp * determinante(auxiliar); 
            }
        }
    }
    
    return transposta(nova);
}

function somaMatrizes(char) {
    recebeElementosGeral('A')
    recebeElementosGeral('B')

    if(A.linha == B.linha && A.coluna == B.coluna) {

        var divNova = document.createElement('div')
        divNova.setAttribute('class', 'resultados')
        divNova.setAttribute('id', `resultados-${res}`)
    
        var divAtual = document.getElementById('resultados')
        divAtual.insertBefore(divNova, divAtual.firstChild)

        R = criaNovaMatriz(A.linha, A.coluna)

        for(var i = 0; i < R.linha; i++) {
            for(var j = 0; j < R.coluna; j++) {
                if(char == '+') {
                    R.matriz[i][j] = A.matriz[i][j] + B.matriz[i][j]
                }
                else if(char == '-') {
                    R.matriz[i][j] = A.matriz[i][j] - B.matriz[i][j]
                }
            }
        }

        showMatriz(A, 'A')

        var span = document.createElement('span')
        span.innerHTML = ` ${char} `
        divNova.appendChild(span)

        showMatriz(B, 'B')
        
        var span = document.createElement('span')
        span.innerHTML = ' = '
        divNova.appendChild(span)

        showMatriz(R, 'R')

        var inputNovo = document.createElement('input')
        inputNovo.setAttribute('class', 'botão-resposta')
        inputNovo.setAttribute('type', 'button')
        inputNovo.setAttribute('value', 'limpar')
        inputNovo.setAttribute('onclick', `limpar(${res})`)
        divNova.appendChild(inputNovo)
        
        var inputNovo = document.createElement('input')
        inputNovo.setAttribute('class', 'botão-resposta')
        inputNovo.setAttribute('type', 'button')
        inputNovo.setAttribute('value', 'insere A')
        inputNovo.setAttribute('onclick', `insereA(${R.linha}, ${R.coluna}, ${res})`)
        divNova.appendChild(inputNovo)

        var inputNovo = document.createElement('input')
        inputNovo.setAttribute('class', 'botão-resposta')
        inputNovo.setAttribute('type', 'button')
        inputNovo.setAttribute('value', 'insere B')
        inputNovo.setAttribute('onclick', `insereB(${R.linha}, ${R.coluna}, ${res})`)
        divNova.appendChild(inputNovo)

        res += 1
    }
}

function multiplicaMatrizes() {
    recebeElementosGeral('A')
    recebeElementosGeral('B')

    if(A.linha == B.coluna) {
        var divNova = document.createElement('div')
        divNova.setAttribute('class', 'resultados')
        divNova.setAttribute('id', `resultados-${res}`)
    
        var divAtual = document.getElementById('resultados')
        divAtual.insertBefore(divNova, divAtual.firstChild)

        R = criaNovaMatriz(A.linha, B.coluna)

        for(var i = 0; i < A.linha; i++) {
				
            for(var j = 0; j < B.coluna; j++) {
                
                var soma = 0;
                
                for(var k = 0; k < A.coluna; k++) {
                    
                    soma += A.matriz[i][k] * B.matriz[k][j];
                }
            
                R.matriz[i][j] = soma;
            }
        }
        
        showMatriz(A, 'A')

        var span = document.createElement('span')
        span.innerHTML = ` x `
        divNova.appendChild(span)

        showMatriz(B, 'B')
        
        var span = document.createElement('span')
        span.innerHTML = ' = '
        divNova.appendChild(span)

        showMatriz(R, 'R')

        var inputNovo = document.createElement('input')
        inputNovo.setAttribute('class', 'botão-resposta')
        inputNovo.setAttribute('type', 'button')
        inputNovo.setAttribute('value', 'limpar')
        inputNovo.setAttribute('onclick', `limpar(${res})`)
        divNova.appendChild(inputNovo)
        
        var inputNovo = document.createElement('input')
        inputNovo.setAttribute('class', 'botão-resposta')
        inputNovo.setAttribute('type', 'button')
        inputNovo.setAttribute('value', 'insere A')
        inputNovo.setAttribute('onclick', `insereA(${R.linha}, ${R.coluna}, ${res})`)
        divNova.appendChild(inputNovo)

        var inputNovo = document.createElement('input')
        inputNovo.setAttribute('class', 'botão-resposta')
        inputNovo.setAttribute('type', 'button')
        inputNovo.setAttribute('value', 'insere B')
        inputNovo.setAttribute('onclick', `insereB(${R.linha}, ${R.coluna}, ${res})`)
        divNova.appendChild(inputNovo)
        
        res += 1
    }
}