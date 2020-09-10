const X_CLASS = "x";
const CIRCLE_CLASS ="circle";
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById("board")
const winningMessagePopup = document.getElementById("winning-Message")
const restartButton = document.getElementById("restartButton")
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

const startGamePopup = document.getElementById("start-game")
const x_button = document.getElementById("x-button")
const circle_button = document.getElementById("circle-button")

// Ici on va verifier si le joueur a choisi commencer avec le X ou le O

x_button.addEventListener("click", ()=>{
    circleTurn = false // X COMMENCE
    startGame()
})

circle_button.addEventListener("click", ()=>{
    circleTurn = true // O COMMENCE
    startGame()

})

// POPUP DE FIN DE JEU, IL ANNONCE LE GAGNEUR
restartButton.addEventListener("click", ()=>{
    startGamePopup.classList.remove("no-show")
    winningMessagePopup.classList.remove("show")

})
function startGame() {
    startGamePopup.classList.add("no-show")
    cellElements.forEach(cell=>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener("click",handleClick)
        cell.addEventListener("click",handleClick, {once:true}) 
        //le (once:true) veut dire qu'il ne peut être appuyé qu'une seule fois
    })
    setBoardHoverClass()
    winningMessagePopup.classList.remove("show")

}



function handleClick(e){
    const cell = e.target
    console.log(e.target)
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else{
        swapTurns()
        setBoardHoverClass()
    }

    //placeMarks
    //check for win
    //check for draw
    //swictch turns
}

function endGame(draw){
    if (draw){
        winningMessageTextElement.innerText = ("Egalité!")
    }else{
        winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} à Gagner!`
    }
    winningMessagePopup.classList.add("show")
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

//Fonction pour placer les X ou les O dans les cases en ajoutant la class "x" ou "circle" dans le Html Div
function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}
//Fonction pour changer de tour, on inverse la valeur de circle turn si True => false et si False => True
function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    //on verifie a qui est le tour pour savoir a qui on met le Hover ( X ou O)
    board.classList.add(`${circleTurn ? CIRCLE_CLASS : X_CLASS }`)
    
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}