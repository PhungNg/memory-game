let imageArray = [
    'https://res.cloudinary.com/beumsk/image/upload/v1547980025/memory/Pokemon/Bulbasaur.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980083/memory/Pokemon/Charmander.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980101/memory/Pokemon/Squirtle.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980116/memory/Pokemon/Pikachu.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980129/memory/Pokemon/Mewtwo.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980142/memory/Pokemon/Mew.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980154/memory/Pokemon/Articuno.png',
    'https://res.cloudinary.com/beumsk/image/upload/v1547980164/memory/Pokemon/Zapdos.png',
]
const gameBoard = document.querySelector(".gameBoard")
const gameoverCard = document.querySelector('.gameoverCard')
const numberOfCards = 16
let click = 0
let firstPick = ''
let secondPick = ''
let playing = false

const drawGameboard = () => {
    let tempArray = [...imageArray,...imageArray]
    gameBoard.innerHTML = `
        <div class="topBar">
            <p><span class="timer">0</span> sec</p>
            <p><span class="moves">0</span> Moves</p>
        </div>
    `
    for(let i = 0; i < numberOfCards; i++){
        let rng = Math.floor(Math.random() * tempArray.length)
        gameBoard.innerHTML += `
            <div class="box" 
            style="background-image:url(${tempArray[rng]})"
            onclick="checkCards(this)"/>`
        tempArray.splice(rng, 1)
    }
}
let moves = (function(reset){
    let count = 0
    return reset=>reset ? count = 0 : count += 1
})()
const checkCards = (e) => {
    if(!playing){
        playing = true
        clock()
    }
    val = e.style.backgroundImage
    e.classList.toggle('show')
    click++
    click == 1 ? firstPick = val : secondPick = val

    if(click == 2){
        document.querySelector('.moves').innerHTML = moves()
        if(firstPick == secondPick){
            document.querySelectorAll('.show').forEach(e=>{
                e.classList.toggle('.show')
                e.classList.add('correct')
            })
        }else{
            toggleClickable()
            setTimeout(()=>{
                document.querySelectorAll('.show').forEach(e=>e.classList.toggle('show'))
                toggleClickable()
            },300)
        }
        click = 0
    }
}
const toggleClickable = () => {
    document.querySelectorAll('.box').forEach(e=>e.classList.toggle('unclickable'))
}
const clock = () => {
    let sec = 1
    let timer = setInterval(() => {
        if(document.querySelectorAll('.correct').length != numberOfCards){
            document.querySelector('.timer').innerHTML = sec++
        }else{
            clearInterval(timer)
            gameOver(sec)
        }}, 1000);
}
const gameOver = (sec) => {
    playing = false
    toggleClickable()
    gameoverCard.innerHTML += `
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">YOU WON</h5>
              <p class="card-text">Time: <span class="finalTime">${sec-1}</span></p>
              <p class="card-text">Moves: <span class="finalMoves">${moves()-1}</span></p>
              <button onclick="resetGame()" type="button" class="btn btn-primary btn-lg">Play again</button>
              </div>
        </div>
    `
}
const resetGame = () => {
    gameoverCard.innerHTML = ''
    gameBoard.innerHTML = ''
    moves(true)
    drawGameboard()
}
drawGameboard()