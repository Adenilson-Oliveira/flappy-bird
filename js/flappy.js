function novoElemento(tagName, className) {
  const elem = document.createElement(tagName)
  elem.classList.add(className)
  return elem
}

// substituir por classes ao refatorar
function Barreira(reversa = false) {
  this.elementoBarreira = novoElemento('div', 'barreira')

  const borda = novoElemento('div', 'borda')
  const corpo = novoElemento('div', 'corpo')
  this.elementoBarreira.appendChild(reversa ? corpo : borda)
  this.elementoBarreira.appendChild(reversa ? borda : corpo)

  this.setAltura = altura => corpo.style.height = `${altura}px`
}

// const b = new Barreira(true)
// b.setAltura(50)
// document.querySelector('[flappy-game]').appendChild(b.elemento)

function ParDeBarreiras(altura, abertura, x) {
  this.elBarreiras = novoElemento('div', 'par-de-barreiras')

  this.superior = new Barreira(true)
  this.inferior = new Barreira(false)

  this.elBarreiras.appendChild(this.superior.elementoBarreira)
  this.elBarreiras.appendChild(this.inferior.elementoBarreira)

  this.sortearAbertura = () => {
    const alturaSuperior = Math.random() * (altura - abertura)
    const alturaInferior = altura - abertura - alturaSuperior
    this.superior.setAltura(alturaSuperior)
    this.inferior.setAltura(alturaInferior)
  }

  this.getX = () => parseInt(this.elBarreiras.style.left.split('px')[0])
  this.setX = x => this.elBarreiras.style.left = `${x}px`
  this.getLargura = () => this.elBarreiras.clientWidth

  this.sortearAbertura()
  this.setX(x)
}

// const b = new ParDeBarreiras(700, 200, 800)
// document.querySelector('[flappy-game]').appendChild(b.elBarreiras)

function Barreiras(altura, largura, abertura, espaco, notificarPonto) {
  this.pares = [
    new ParDeBarreiras(altura, abertura, largura),
    new ParDeBarreiras(altura, abertura, largura + espaco),
    new ParDeBarreiras(altura, abertura, largura + espaco * 2),
    new ParDeBarreiras(altura, abertura, largura + espaco * 3),
  ]

  const deslocamento = 3

  this.animar = () => {
    this.pares.forEach(par => {
      par.setX(par.getX() - deslocamento)
      
      // quando o elemento sair da área do jogo
      if(par.getX() < -par.getLargura()) {
        par.setX(par.getX() + espaco * this.pares.length)
        par.sortearAbertura()
      } 

      const meio = largura / 2
      const cruzouOMeio = par.getX() + deslocamento >= meio && par.getX() < meio
      
      if( cruzouOMeio ) notificarPonto()

    })
  }
}

const barreiras = new Barreiras(700, 1200, 200, 400)
const areaDoJogo = document.querySelector('[flappy-game]')
barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elBarreiras))

setInterval(() => {
  barreiras.animar()
}, 20)



