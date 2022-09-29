function novoElemento(tagName, className) {
  const elem = document.createElement(tagName)
  elem.classList.add(className)
  return elem
}

// substituir por classes ao refatorar
function Barreira(reversa = false) {
  this.elemento = novoElemento('div', 'barreira')

  const borda = novoElemento('div', 'borda')
  const corpo = novoElemento('div', 'corpo')
  this.elemento.appendChild(reversa ? corpo : borda)
  this.elemento.appendChild(reversa ? borda : corpo)

  this.setAltura = altura => corpo.style.height = `${altura}px`
}

// const b = new Barreira(true)
// b.setAltura(50)
// document.querySelector('[flappy-game]').appendChild(b.elemento)

function ParDeBarreiras(altura, abertura, x) {
  this.elBarreiras = novoElemento('div', 'par-de-barreiras')

  this.superior = new Barreira(true)
  this.inferior = new Barreira(false)

  this.elBarreiras.appendChild(this.superior.elemento)
  this.elBarreiras.appendChild(this.inferior.elemento)

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

const b = new ParDeBarreiras(700, 200, 400)
document.querySelector('[flappy-game]').appendChild(b.elBarreiras)
