//fazer com que o tiro seja excluido do array

class Player{
  constructor(x,y){
    this.x=x
    this.y=y
  }
  
  desenhar(){
    image(nave,this.x,this.y,50)
  }
  
  mover(){
    this.desenhar()
    
    if(keyIsPressed && keyCode == RIGHT_ARROW){
      this.x += 2
      
      if(this.x >= width - 50){
         this.x = width - 50
         }
    }
    else if(keyIsPressed && keyCode == LEFT_ARROW){
      this.x -= 2
      
      if(this.x <= 0){
         this.x = 0
         }
            }
  }
  
}

class Tiro{
  constructor(x,y){
    this.x=x
    this.y=y
    this.sumir = false
  }
  
  desenhar(){
    rect(this.x,this.y,4)
  }
  
  mover(){
    if(this.sumir == false){
      this.desenhar()
      this.y -=2
    }
  }
  
  colidiu(enemy){
    if(this.x >= enemy.x && this.x <= enemy.x+40 && this.y <= enemy.y+ 24 && this.y > enemy.y){
      return true
    } else {
      return false
    }
  }
}

class EnemyNave{
  constructor(x,y){
    this.x = x
    this.y = y
    this.morto = false
    this.velocidade = 0.1
  }
  
  desenhar(){
      image(inimigoNave,this.x,this.y,40)
  }
  
  mover(){
    if(this.morto == false){
      this.desenhar()
      this.x += this.velocidade
    }
  }
  
  paraBaixo(){
      this.velocidade *= -1
      this.y += 20
      this.velocidade *= 1.2
  }
}

class EnemyPolvo{
  constructor(x,y){
    this.x = x
    this.y = y
    this.morto = false
    this.velocidade = 0.1
  }
  
  desenhar(){
      image(inimigoPolvo,this.x,this.y,30,30)
  }
  
  mover(){
    if(this.morto == false){
      this.desenhar()
      this.x += this.velocidade
    }
  }
  
  paraBaixo(){
      this.velocidade *= -1
      this.y += 20
      this.velocidade *= 1.2
  }
}

class EnemyPadrao{
  constructor(x,y){
    this.x = x
    this.y = y
    this.morto = false
    this.velocidade = 0.1
  }
  
  desenhar(){
      image(inimigoPadrao,this.x,this.y,30,24)
  }
  
  mover(){
    if(this.morto == false){
      this.desenhar()
      this.x += this.velocidade
    }
  }
  
  paraBaixo(){
      this.velocidade *= -1
      this.y += 20
      this.velocidade *= 1.2
  }
}

function preload(){
  nave = loadImage('assets/nave.png');
  inimigoPadrao = loadImage('assets/inimigo_padrao.png');
  inimigoPolvo = loadImage('assets/inimigo_polvo.png');
  inimigoNave = loadImage('assets/inimigo_nave.png');
  fundo = loadImage('assets/fundo.png');
  titulo = loadImage('assets/titulo.png');
  inicio = loadImage('assets/TelaInicial.png')
  vitoria = loadImage('assets/TelaVitoria.png')
  derrota = loadImage('assets/TelaDerrota.png')
}

let tiros = []
let pontos = 0

let Enave = []
let Epolvo1 = []
let Epolvo2 = []
let Epadrao1 = []
let Epadrao2 = []

let tela = 0

function setup() {
  createCanvas(350, 600);
  textSize(20)
  
  player1 = new Player(150,500)
  
// criando inimigos
  for( i=0; i<8; i++){
    Enave[i] = new EnemyNave(i*40 +3,40)
    Epolvo1[i] = new EnemyPolvo(i*40 +3,80)
    Epolvo2[i] = new EnemyPolvo(i*40 +3,120)
    Epadrao1[i] = new EnemyPadrao(i*40 +3,160)
    Epadrao2[i] = new EnemyPadrao(i*40 +3,200)
  }
}


function draw() {
  if(tela == 0){
    image(inicio,0,0,350,600)
  }
  
  else if(tela == 1){
  let chegouPonta = false

  // criando player
    image(fundo,0,0,350,600)
    player1.mover()

  //pontos
    fill(255)
    text('pontos: ' + pontos, 135, 590)


  // chamando a movimentação dos aliens
    for( i=0; i< Enave.length; i++){
      Enave[i].mover()
      Epolvo1[i].mover()
      Epolvo2[i].mover()
      Epadrao1[i].mover()
      Epadrao2[i].mover()

      // teste se os inimigos batem os cantos da tela
      if(Enave[i].x + 40 > width || Enave[i].x < 3 || Epolvo1[i].x + 30 > width || Epolvo1[i].x < 3 || Epolvo2[i].x + 30 > width || Epolvo2[i].x < 3 || Epadrao1[i].x + 30 > width || Epadrao1[i].x < 3 || Epadrao2[i].x + 30 > width || Epadrao2[i].x < 3){
        chegouPonta = true
      }
    
    // teste se os inimigos passar do Y da nave para ir para a tela de derrota
      if(Enave[i].y > player1.y || Epolvo1[i].y > player1.y || Epolvo2[i].y > player1.y || Epadrao1[i].y > player1.y || Epadrao2[i].y > player1.y ){
        tela = 3
      }
    }

    MoverBaixo(chegouPonta)

    TiroGeral()
    
    if(pontos == 40){
       tela = 2
       }
  }
  
  if(tela == 2){
    image(vitoria,0,0,350,600)
  }
  
  if(tela == 3){
    image(derrota,0,0,350,600)
  }

}


// criando tiro
function keyPressed(){
  
  if(tela == 0){
     tela = 1
     }
  
  if (key == ' ' && tela == 1){
    let tiro = new Tiro(player1.x + 22,player1.y)
    tiros.push(tiro)
  }

}

function TiroGeral(){
  // chamdo os tiros e checando a colisão
  for(i=0; i<tiros.length ;i++){
    tiros[i].mover()
    
    // excluindo o tiro e o inimigo quando ocorre colisão
    for(j=0; j< Enave.length; j++){
      if(tiros[i].colidiu(Enave[j]) && Enave[j].morto == false){
        tiros[i].sumir = true
        Enave[j].morto = true
        tiros[i].x = -10
        Enave[j].y = -50
        pontos++
      }
      else if(tiros[i].colidiu(Epolvo1[j]) && Epolvo1[j].morto == false){
        tiros[i].sumir = true
        Epolvo1[j].morto = true
        tiros[i].x = -10
        Epolvo1[j].y = -50
        pontos++
      }
      else if(tiros[i].colidiu(Epolvo2[j]) && Epolvo2[j].morto == false){
        tiros[i].sumir = true
        Epolvo2[j].morto = true
        tiros[i].x = -10
        Epolvo2[j].y = -50
        pontos++
      }
      else if(tiros[i].colidiu(Epadrao1[j]) && Epadrao1[j].morto == false){
        tiros[i].sumir = true
        Epadrao1[j].morto = true
        tiros[i].x = -10
        Epadrao1[j].y = -50
        pontos++
      }
      else if(tiros[i].colidiu(Epadrao2[j]) && Epadrao2[j].morto == false){
        tiros[i].sumir = true
        Epadrao2[j].morto = true
        tiros[i].x = -10
        Epadrao2[j].y = -50
        pontos++
      }
    }
  }
}

// movimentando as naves para baixo e mudando a direção
function MoverBaixo(chegouPonta){
  if (chegouPonta){
      for(i=0; i< Enave.length; i++){
        Enave[i].paraBaixo()
        Epolvo1[i].paraBaixo()
        Epolvo2[i].paraBaixo()
        Epadrao1[i].paraBaixo()
        Epadrao2[i].paraBaixo()
      }
      }
}
