const make2DArrayOf = (number1,number2)=>{ return new Array(number1).fill(null).map(()=>new Array(number2).fill(null)) }

let gameStatus = make2DArrayOf(3,3)

const game = () => {
    const setPosition = (square) => {
        const position = {
            x: square.dataset.x,
            y: square.dataset.y
        };

        const isEmpty = gameStatus[position.y][position.x] === null

        if (isEmpty) {
            gameStatus[position.y][position.x] = 'X'
            aiPlay()
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

        const isEmpty = gameStatus[position.dataset.y][position.dataset.x] === null

        if (isEmpty) {
            gameStatus[position.dataset.y][position.dataset.x] = 'O'
            checkStatus(position)
        } else {
            aiPlay()
        }
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
                console.log('You won')
            } else if( youLostByRow ){
                console.log('You lost')
            }
        }

        const checkColumn = () => {
            const youWonByColumn = gameStatus.every((row) => {return row[position.x] === 'X'})
            const youLostByColumn = gameStatus.every((row) => {return row[position.x] === 'O'})

            if( youWonByColumn ){
                console.log('You won')
            } else if( youLostByColumn ){
                console.log('You lost')
            }
        }

        checkRow()
        checkColumn()
    }
    
    const play = (square) => {
        setPosition(square)
        checkStatus(square)
        console.log(gameStatus)
    }

    const clearPosition = () => gameStatus = make2DArrayOf(3,3);

    return { clearPosition, play }
}
let currentGame = game()

const DOMEvents = () => {
    const addClickListener = () => { 
        const squares = Array.from(document.querySelectorAll('.square'))
        squares.forEach(square => square.addEventListener('click', (e)=>{
            currentGame.play(e.target)
        }))
    }

    return {addClickListener}
}
thisPlay = DOMEvents()

thisPlay.addClickListener()