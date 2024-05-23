import React, { useRef, useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import style from './style.module.scss';
import clsx from 'clsx';
function InputNumber({ className,onChange,...props }) {
    const ref = useRef();
    function increate() {
        ref.current.stepUp()
        onChange(ref.current.value)
    }
    function decreate() {
        ref.current.stepDown();
        onChange(ref.current.value)
    }
    function changing(e){
        onChange(e.target.value);
    }
    return (<ButtonGroup className={clsx(className, style.inputNumber)}>
        <button onClick={decreate}>-</button>
        <input type="number" onChange={onChange} {...props} ref={ref}></input>
        <button onClick={increate}>+</button>
    </ButtonGroup>)
}

export default InputNumber;