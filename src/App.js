import './App.css';
import React, {useState, useEffect} from 'react';
import { startingBoard, completeBoard,  } from './startingBoard';
import Square from './Square';
import Number from './Number'

const App = () => {
  const [board, setBoard] = useState(JSON.parse(JSON.stringify(startingBoard)))
  const [status, setStatus] = useState("")
  const [gameOver, setGameOver] = useState(false)
  const [activeNum, setActiveNum] = useState(1)

  const changeNum = (rowIndex, index, num) => {
    // console.log(rowIndex, index, num)
    let copy = [...board]
    copy[rowIndex][index] = num
    setBoard(copy)
  }

  const changeActiveNum = (num) => {
    setActiveNum(num)
  }

  const checkAnswers = () => {
    if(rowError() || columnError() || gridError())
    {
      setStatus("Error")
    }
    else if(incompleteBoard())
    {
      setStatus("")
    }
    else if (checkComplete())
    {
      setGameOver(true)
      setStatus("Completed!")
    }
    
  }

  const checkComplete = () => {
    // console.log(board.length)
    for(let i = 0; i < board.length; i++)
    {
      let row = board[i]
      for(let j = 0; j < row.length; j++)
      {
        let num = row[j]
        if (num !== completeBoard[i][j])
          return false
      }
    }
    return true
  }

  const rowError = () => {
    // console.log("Checking rows")
    for(let i = 0; i < board.length; i++)
    {
      // console.log("New row")
      let row = board[i]
      let rowNums = []
      for(let j = 0; j < row.length; j++)
      {
        let num = row[j]
        // console.log(num)
        if (rowNums.includes(num))
        {
          return true
        }
        else
        {
          if(num !== 0)
            rowNums.push(num)
        }
      }
    }

    return false
  }

  const columnError = () => {
    // console.log("Checking columns")
    for(let i = 0; i < 9; i++)
    {
      // console.log("New column")
      let columnNums = []
      for(let j = 0; j < 9; j++)
      {
        let num = board[j][i]
        // console.log(num)
        if (columnNums.includes(num))
        {
          return true
        }
        else
        {
          if(num !== 0)
            columnNums.push(num)
        }
      }
    }

    return false
  }

  const gridError = () => {
    // console.log("Checking grids")
    for(let i = 0; i < 9; i += 3)
    {
      for(let j = 0; j < 9; j += 3)
      {
        // console.log("New grid")
        let gridNums = []
        for(let k = i; k < i + 3; k++)
        {
          for(let l = j; l < j + 3; l++)
          {
              let num = board[k][l]
              // console.log(num)
              if (gridNums.includes(num))
              {
                return true
              }
              else
              {
                if(num !== 0)
                  gridNums.push(num)
              }
          }
        }
      }
    }

    return false
  }

  const incompleteBoard = () => {
    let incomplete = false
    board.forEach((row, rowIndex) => {
      row.forEach((num, index) => {
        if (num === 0)
          incomplete = true
      })
    });

    return incomplete
  }

  const autoComplete = () => {
    setBoard(JSON.parse(JSON.stringify(completeBoard)))
  }

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  const numberSelectorDiv = <div id="number-selector-div">
      Select:
      {numbers.map((num, index) => {
        return (
          <Number key={index} num={num} activeNum={activeNum} changeActiveNum={changeActiveNum} />
        )
      })}
    </div>

  let gameBoard = startingBoard.map((row, rowIndex) => {
    return (
      <div className='row' key={rowIndex}>
          {row.map((num, index) => (
            <Square rowIndex={rowIndex} index={index} board={board} changeAble={startingBoard[rowIndex][index] === 0 ? true : false}
            changeNum={changeNum} gameOver={gameOver} activeNum={activeNum} key={index}/>
          ))}
      </div>
    );
  })

  return (
    <div id="App">
      <div>
        <button onClick={checkAnswers}>Check answers</button>
        <button onClick={autoComplete}>Auto complete</button>
        {numberSelectorDiv}
        {gameBoard}
        {status}
      </div>
    </div>
  );
}

export default App;
