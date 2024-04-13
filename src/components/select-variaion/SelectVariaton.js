import {Col,Row} from 'react-bootstrap';
import CheckRadio from '../input-radio/CheckRadio';
import clsx from 'clsx';
import style from './style.module.scss';
import { memo, useEffect, useRef } from 'react';
function SelectVariation({onChange,variation}) {
    const inputGroup=useRef();
    function change(e){
       onChange({
            value:e.target.value,
            variation:variation
       }) 
    }
    useEffect(()=>{
        inputGroup.current.querySelectorAll("input[type=radio]").forEach(element => {
            element.addEventListener("change",change);
        });
    },[])
    return ( 
    <Col>
        <label>{variation.name}</label>
        <Row ref={inputGroup} className={clsx("gx-2",style.inputGroup)}>
            {variation.options.map((option,index)=>{
                return <div key={variation.name+index} className={clsx(style.option)}><CheckRadio onChange={(e)=>{change(e)}} value={option.value} name={variation.name}>{option.value}</CheckRadio></div>
            })}
        </Row>
    </Col> );
}

export default memo(SelectVariation);