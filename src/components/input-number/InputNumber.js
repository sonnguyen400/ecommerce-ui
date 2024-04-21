import React, { useRef, useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import style from './style.module.scss';
import clsx from 'clsx';
function InputNumber({ className, onChange, value, defaultValue, ...props }) {
    const [numbervalue, setValue] = useState(value || defaultValue);
    const ref = useRef();

    function increate() {
        ref.current.stepUp()
    }
    function decreate() {
        ref.current.stepDown();
    }
    function changeValue(e) {
        setValue(e.target.value)
    }
    return (<ButtonGroup className={clsx(className, style.inputNumber)}>
        <button onClick={decreate}>-</button>
        <input onChange={changeValue} value={numbervalue} type="number" {...props} ref={ref}></input>
        <button onClick={increate}>+</button>
    </ButtonGroup>)
}

export default InputNumber;