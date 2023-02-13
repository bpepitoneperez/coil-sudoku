import './Square.css';
import React, {useState, useEffect} from 'react';

const Square = ({rowIndex, index, board, changeAble, changeNum, gameOver, activeNum}) => {
    const [className, setClassName] = useState('square')

    const tryChangeNum = () =>
    {
        // console.log(changeAble)
        // console.log(gameOver)
        if (changeAble && !gameOver)
        {
            changeNum(rowIndex, index, activeNum)
        }
    }

    useEffect(() => {
        //console.log(changeAble)
        if (!changeAble)
        {
            setClassName('square-default')
        }
    }, [changeAble])

    return (
        <div className={className} onClick={tryChangeNum}>
            {board[rowIndex][index] === 0 ? "" : board[rowIndex][index]}
        </div>
    );
}

export default Square;