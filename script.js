import { evaluate } from "./ia.mjs"

const make2DArrayOf = (number1,number2) => new Array(number1).fill(null).map(()=>new Array(number2).fill(null))

let gameStatus = make2DArrayOf(3,3)
let gameEnded = false

const resultMessage = (text) => {
    const p = document.createElement('p')
    p.textContent = text
    p.id = 'resultMsg'
    document.body.append(p)
}

const squaresUI = document.querySelectorAll('.square')

const game = () => {
    const play = (square) => {
        checkStatus()

        const position = {
            x: square.dataset.x,
            y: square.dataset.y
        };

        const isEmpty = gameStatus[position.y][position.x] === null

        if (isEmpty && gameEnded === false) {
            gameStatus[position.y][position.x] = 'X'
            checkStatus()
            showPlay(square, 'X')
            if(gameEnded === false){
                aiPlay()
            }
        }
    } ;
    
    const aiPlay = () => {
        const getRandomIndex = (number) => { return Math.floor(Math.random() * number ) }
        const position = {
            dataset:{
                x: getRandomIndex(3),
                y: getRandomIndex(3)
            }
        };
        
        const square = document.querySelector(`[data-x="${position.dataset.x}"][data-y="${position.dataset.y}"]`)
        
        const isEmpty = gameStatus[position.dataset.y][position.dataset.x] === null

        if (isEmpty) {
            gameStatus[position.dataset.y][position.dataset.x] = 'O'
            checkStatus(position)
            showPlay(square, 'O')
        } else {
            aiPlay()
        }
    }

    const showPlay = (square, player) => {
        const play = document.createElement('p')
        play.textContent = player
        square.append(play)
    }

    const checkStatus = () => {

        if (gameEnded === true) return

        const result = evaluate(gameStatus)
        
        switch (result) {
            case 1:
                resultMessage('You Won!')
                gameEnded = true
                break;
            case -1:
                resultMessage('You Lost!')
                gameEnded = true
                break;
            case -0:
                resultMessage('Draw!')
                gameEnded = true
                break;
        
            default:
                break;
        }

    const clearPosition = () => {
        const results = document.querySelector('#resultMsg')

        gameStatus = make2DArrayOf(3,3)
        gameEnded = false
        
        if (results !== null) {
            results.remove()
        }

        squaresUI.forEach(square => square.innerHTML = '')
    };

    return { clearPosition, play }
    }
}
let currentGame = game()

const DOMEvents = () => {
    
    squaresUI.forEach(square => square.addEventListener('click', (e)=>{
            currentGame.play(e.target)
    }))
    const restartBtn = document.querySelector('button')

    restartBtn.addEventListener('click', ()=>{
        currentGame.clearPosition()
    })
}

thisPlay = DOMEvents()