const make2DArrayOf = (number1,number2)=>{ return new Array(number1).fill(null).map(()=>new Array(number2).fill(null)) }

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
        checkStatus(square)

        const position = {
            x: square.dataset.x,
            y: square.dataset.y
        };

        const isEmpty = gameStatus[position.y][position.x] === null

        if (isEmpty && gameEnded === false) {
            gameStatus[position.y][position.x] = 'X'
            checkStatus(square)
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

    const checkStatus = (square) => {
        const position = {
            x: square.dataset.x,
            y: square.dataset.y
        }

        const checkRow = () => {
            const youWonByRow = gameStatus[position.y].every((square) => { return square === 'X'})
            const youLostByRow =  gameStatus[position.y].every((square) => { return square === 'O'}) 

            if( youWonByRow ){
                resultMessage('You Won!')
                gameEnded = true
            } else if( youLostByRow ){
                resultMessage('You Lost!')
                gameEnded = true
            }
        }
        
        const checkColumn = () => {
            const youWonByColumn = gameStatus.every((row) => {return row[position.x] === 'X'})
            const youLostByColumn = gameStatus.every((row) => {return row[position.x] === 'O'})
            
            if( youWonByColumn ){
                resultMessage('You Won!')
                gameEnded = true
            } else if( youLostByColumn ){
                resultMessage('You lost!')
                gameEnded = true
            }
        }
        
        const checkDiagonal = () => {
            const diagonal = [gameStatus[0][0], gameStatus[1][1], gameStatus[2][2]]
            const diagonalReverse = [gameStatus[0][2], gameStatus[1][1], gameStatus[2][0]]
            
            const youWon = diagonal.every((square) => { return square === 'X'}) || diagonalReverse.every((square) => { return square === 'X'})
            const youLost = diagonal.every((square) => { return square === 'O'}) || diagonalReverse.every((square) => { return square === 'O'})
            
            if (youWon){
                resultMessage('You Won!')
                gameEnded = true
            } else if (youLost){
                resultMessage('You Lost!')
                gameEnded = true
            }
        }
        
        const checkDraw = () => {
            const plays = gameStatus.flat()
            const isBlocked = plays.every(square => square !== null)
            
            if (isBlocked && gameEnded === false) {
                resultMessage('Its a Draw!')
                gameEnded = true
            }
        }

        checkDraw()
        checkRow()
        checkColumn()
        checkDiagonal()
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