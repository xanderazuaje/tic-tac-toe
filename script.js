const make2DArrayOf = (number1,number2)=>{ return new Array(number1).fill(null).map(()=>new Array(number2).fill(null)) }

let gameStatus = make2DArrayOf(3,3)

const game = () => {
    const setPosition = (square) => {
        position = {
            x: square.dataset.x,
            y: square.dataset.y
        };
        if (gameStatus[position.y][position.x] === null) {
            gameStatus[position.y][position.x] = 'X'
            aiPlay()
        }
    } ;
    
    const aiPlay = () => {
        const getRandomIndex = (number) => { return Math.floor(Math.random() * number ) }
        position = {
            x: getRandomIndex(3),
            y: getRandomIndex(3)
        };
        if (gameStatus[position.y][position.x] === null) {
            gameStatus[position.y][position.x] = 'O'
        } else {
            aiPlay()
        }
    }
    
    const play = (square) => {
        setPosition(square)
        console.log(gameStatus)
    }

    const clearPosition = () => gameStatus = make2DArrayOf(3,3);

    return { clearPosition, play }
}
let currentGame = game()

const DOMEvents = () => {
    const squares = Array.from(document.querySelectorAll('.square'))
    squares.forEach(square => square.addEventListener('click', (e)=>{
        currentGame.play(e.target)
    }))
}
DOMEvents()