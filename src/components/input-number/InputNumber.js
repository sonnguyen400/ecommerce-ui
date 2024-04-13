import React, { useRef } from 'react';
import {ButtonGroup,Button} from 'react-bootstrap';
import style from './style.module.scss';
import clsx from 'clsx';
function InputNumber({className,...props}){
    const ref=useRef();
    function increate(){
        ref.current.stepUp()
    }
    function decreate(){
        ref.current.stepDown();
    }
    return (<ButtonGroup className={clsx(className,style.inputNumber)}>
                <button onClick={decreate}>-</button>
                <input type="number" {...props} ref={ref}></input> 
                <button onClick={increate}>+</button>
            </ButtonGroup>)
}

export default InputNumber;