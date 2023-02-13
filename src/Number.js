import './Number.css';
import React, {useState, useEffect} from 'react';

const Number = ({num, activeNum, changeActiveNum}) => {
    const [className, setClassName] = useState("")

    useEffect(() => {
        if (num === activeNum)
        {
            setClassName("number-active")
        }
        else
        {
            setClassName("number-regular")
        }
    },[num, activeNum])

    return (
        <div className={className} onClick={() => changeActiveNum(num)}>
            {num}
        </div>
    );
}

export default Number;