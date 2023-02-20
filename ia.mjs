//genere todos los estados posibles

//9 niveles máximos de profundidad

//checar si el estado final tiene más jugadas posibles o si se ha terminado

//elegir entre todas las jugadas la más corta y la que deje el número en menos

//dar una puntuación del movimiento desde abajo hacia arriba que oscile entre 1, 0 y -1

//escoja el resultado más beneficioso

export {evaluate}

const evaluate = (boardStatus, gameEnded)=>{
    gameEnded = gameEnded
    const rowEvaluation = [[],[]]
    const columnEvaluation = [[],[]]
    const diagonalsEvaluation = [[],[]]
    
    const  createColumns  = ()=>{
        const columns = []
        
        for (let column = 0; column < boardStatus[0].length; column++) {
            const currentColumn = []
            
            for (let row = 0; row < boardStatus.length; row++) {
                currentColumn.push(boardStatus[row][column])
            }
            columns.push(currentColumn)
        }
        return columns
    }
    const columns = createColumns()
    
    const createDiagonals = () => {
            const diagonal = [[],[]]

            boardStatus.forEach((row, index) => {
                diagonal[0].push(row[index])
                diagonal[1].push(row[row.length - index - 1])
            })
            return diagonal
    } 
    
    const diagonals = createDiagonals()
    
    const checkAxes = (otherPlayerTurn)=>{
        
        const player = otherPlayerTurn ? 'O' : 'X'
        
        const checkByRow = (player) => {
            boardStatus.forEach((row,index) => {
                rowEvaluation[player === 'X' ? 0 : 1][index] = row.every(square => {
                    return square === (player === 'X' ? 'X' : 'O') 
                })
            })
        }
        
        const checkByColumn = (player) => {
            columns.forEach((column,index) => {
                columnEvaluation[player === 'X' ? 0 : 1][index] = column.every(square => {
                    return square === (player === 'X' ? 'X' : 'O') 
                })
            })
        }
        
        const checkDiagonal = (player) => {
            diagonals.forEach((column,index) => {
                diagonalsEvaluation[player === 'X' ? 0 : 1][index] = column.every(square => {
                    return square === (player === 'X' ? 'X' : 'O') 
                })
            })
        }
        
        checkByRow(player)
        checkByColumn(player)
        checkDiagonal(player)

        if (otherPlayerTurn === true) {
            checkAxes(false)
        }
    }
    
    
    const checkWinner = ()=>{
        checkAxes(true)
        const playerWon = rowEvaluation[0].some(row => row === true) 
                || columnEvaluation[0].some(column => column === true) 
                || diagonalsEvaluation[0].some(diagonal => diagonal === true) 

        const iaWon = rowEvaluation[1].some(row => row === true)
                || columnEvaluation[1].some(column => column === true) 
                || diagonalsEvaluation[1].some(diagonal => diagonal === true)

        const draw = boardStatus.flat().every(square => square !== null) && gameEnded === false
        
        return playerWon ? 1 : 
        iaWon ? -1 :
        draw ? 0 :
        undefined
    }
    
    return checkWinner()
    
}

const getPossiblePlays = (actualPosition, turn)=>{
    //Array of objects of possible plays
    let possiblePlays = []
    let possiblePlaysCount = 0
    
    let nextPosition = []

    //iterates on each possible movement
    for (let i = 0; i < actualPosition.length; i++) {
        for (let j = 0; j < actualPosition[i].length; j++) {
            if (actualPosition[i][j] === null){
                //creates a new blank coordinate to be modified next
                possiblePlays.push({x:0,y:0})
                
                //returns coordinates of the play
                possiblePlays[possiblePlaysCount].x = i
                possiblePlays[possiblePlaysCount].y = j
                
                nextPosition.push({index: possiblePlaysCount, board: JSON.parse(JSON.stringify(actualPosition))})
                nextPosition[possiblePlaysCount].board[i][j] = turn
                
                possiblePlaysCount++
            }
        }
    }
    
    return {nextPosition, possiblePlays}
}

let sampleBoard = [ 
    [null,'X','O'],
    ['X',null,null],
    ['X',null, null]
    ]


const minimax = (actualPosition, isComputerturn, parent)=>{
    const turn = isComputerturn ? 'X' : 'O' 
    
    const possiblePlays = getPossiblePlays(actualPosition, turn)
    
    if (possiblePlays.possiblePlays.length === 0) {
        return evaluate(actualPosition)
    }

    if (isComputerturn) {
        let maxValue = -Infinity
        possiblePlays.nextPosition.forEach(each =>{
                maxValue = Math.max(maxValue, minimax(each.board, false))
                return maxValue
            })
            
    } else {
        let minValue = Infinity
        possiblePlays.nextPosition.forEach(each => {
            minValue = Math.min(minValue, minimax(each.board, true))
            return minValue
        })
    }
}

console.log(minimax(sampleBoard, true))