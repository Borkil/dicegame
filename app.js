const stateGame = {
  player01Count : 0,
  countCurrentPlayer01 : 0,
  player02Count : 0,
  countCurrentPlayer02 : 0,
  turnCount : 0,
  objectifGame: 100,
  muteSong: true
}

const holdButton = document.querySelector('#holdButton')
const rollButton = document.querySelector('#rollButton');
const newGameButton = document.querySelector('#newGameButton')
const songButton = document.querySelector('#songButton i')
const currentCountPlayer = document.querySelectorAll('.current p') //index 0 = player01 et index 1 = player02
const playersCount = document.querySelectorAll('.playerCount')
const selectPlayer = document.querySelectorAll('.selectPlayer')
const songs = document.querySelectorAll('audio')



function showModal (player) {
  const modalWrap = document.createElement('div')
  modalWrap.innerHTML=`
    <div class="modal" tabindex="-1" id="mymodal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content ">     
          <div class="modal-body bg-color-06">
            <p class="fc-02 fs-2 fw-bolder mb-0 ">${player} qui gagne !</p>
          </div>
        </div>
      </div>
    </div>
  `
  document.body.append(modalWrap)

  const myModal = new bootstrap.Modal(document.querySelector('#mymodal'))

  myModal.show()
  setTimeout(()=>{
    myModal.hide()
    document.body.removeChild(modalWrap)
  },3000)
}

function checkWinner (count, objectif, player) {

  if(count >= objectif){

    showModal(player)
    playSong(songs[1], stateGame.muteSong)    
    addNoClickClass(holdButton)
    addNoClickClass(rollButton)
    removeNoClickClass(newGameButton)

  }

}

function addActiveClass (arr,index) {
  arr[index].classList.add("active")
}

function removeActiveClass (arr) {
  arr.forEach(elem => elem.classList.remove('active'))
}

function addNoClickClass (element) {
  element.classList.add('noclick')
}

function removeNoClickClass (element) {
  element.classList.remove('noclick')
}

function playSong (song, boolean) {
  if(boolean){
    song.play()
  }
}


function addAnimationStack (index, number) {
  const containerCount = document.querySelectorAll('.containerCount')
  const span = document.createElement('span')
  span.innerHTML = `+${number}`
  span.classList.add('float')
  span.classList.add('fs-1')
  span.classList.add('addNumber')
  containerCount[index].appendChild(span)
  setTimeout(() => {
    containerCount[index].removeChild(span)
  },1500)
}




newGameButton.addEventListener('click', (event) => {

  stateGame.player01Count = 0
  stateGame.player02Count = 0
  stateGame.playerCurrentPlayer01 = 0
  stateGame.playerCurrentPlayer02 = 0
  stateGame.turnCount = Math.round(Math.random())

  currentCountPlayer[0].innerHTML = 0
  currentCountPlayer[1].innerHTML = 0
  playersCount[0].innerHTML = 0
  playersCount[1].innerHTML = 0

  removeActiveClass(selectPlayer)
  addActiveClass(selectPlayer, stateGame.turnCount)

  addNoClickClass(event.target)

  removeNoClickClass(holdButton)
  removeNoClickClass(rollButton)
  
})



rollButton.addEventListener('click', (e) =>{

  const dice = document.querySelector('#diceModel')
  const classIndex = dice.classList.length -1
  const randomNumber = Math.round(Math.random()*(6-1)+1)
  const diceClasslistNumber = dice.classList[classIndex].slice(-1)
  const newClass = dice.classList[classIndex].replace(diceClasslistNumber, randomNumber)

  dice.classList.remove(dice.classList[classIndex])
  dice.classList.add(newClass)

  playSong(songs[0], stateGame.muteSong )

  if(stateGame.turnCount % 2 != 0){

    if(randomNumber != 1){
      stateGame.countCurrentPlayer02 += randomNumber
      currentCountPlayer[1].innerHTML = stateGame.countCurrentPlayer02    
      
    }else{
      stateGame.countCurrentPlayer02 = 0        
      stateGame.turnCount += 1
      currentCountPlayer[1].innerHTML = stateGame.countCurrentPlayer02
      removeActiveClass(selectPlayer)
      addActiveClass(selectPlayer,0)
      playSong(songs[2], stateGame.muteSong)
    }

  }else{

    if(randomNumber != 1){
      stateGame.countCurrentPlayer01 += randomNumber
      currentCountPlayer[0].innerHTML = stateGame.countCurrentPlayer01
            
    }else{
      stateGame.countCurrentPlayer01 = 0        
      stateGame.turnCount += 1
      currentCountPlayer[0].innerHTML = stateGame.countCurrentPlayer01
      removeActiveClass(selectPlayer)
      addActiveClass(selectPlayer,1)
      playSong(songs[2], stateGame.muteSong)
    }

  }

})


holdButton.addEventListener('click', (e) =>{

    if(stateGame.turnCount % 2 != 0){ // si impair alors joueur02

      stateGame.player02Count += stateGame.countCurrentPlayer02   
      addAnimationStack(1,stateGame.countCurrentPlayer02)
      playersCount[1].innerHTML = stateGame.player02Count
      stateGame.countCurrentPlayer02 = 0
      currentCountPlayer[1].innerHTML = stateGame.countCurrentPlayer02
      stateGame.turnCount+=1
      
      checkWinner(stateGame.player02Count, stateGame.objectifGame, "player02")
      removeActiveClass(selectPlayer)
      addActiveClass(selectPlayer,0)
      playSong(songs[3], stateGame.muteSong)
      

    }else{ // si pair alors joueur01

      stateGame.player01Count += stateGame.countCurrentPlayer01
      addAnimationStack(0,stateGame.countCurrentPlayer01)
      playersCount[0].innerHTML = stateGame.player01Count
      stateGame.countCurrentPlayer01 = 0
      currentCountPlayer[0].innerHTML = stateGame.countCurrentPlayer01
      stateGame.turnCount += 1
      
      checkWinner(stateGame.player01Count, stateGame.objectifGame, "player01")
      removeActiveClass(selectPlayer)
      addActiveClass(selectPlayer,1)
      playSong(songs[3], stateGame.muteSong)
      

    }

})

songButton.addEventListener('click', () => {
  if(stateGame.muteSong){
    stateGame.muteSong = false
    songButton.classList.remove('bi-volume-up')
    songButton.classList.add('bi-volume-mute')
    
  }else {
    stateGame.muteSong = true
    songButton.classList.remove('bi-volume-mute')
    songButton.classList.add('bi-volume-up')
  }
})



