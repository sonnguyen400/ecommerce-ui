import { Col } from 'antd';
import CheckRadio from '../input-radio/CheckRadio';
import clsx from 'clsx';
import style from './style.module.scss';
import { memo, useEffect, useRef } from 'react';
function SelectVariation({ onChange, variation }) {
    const inputGroup = useRef();
    function change(e) {
        onChange({
            value: e.target.value,
            variation: variation
        })
    }
    useEffect(() => {
        inputGroup.current.querySelectorAll("input[type=radio]").forEach(element => {
            element.addEventListener("change", change);
        });
    }, [])
    return (
        <Col>
            <label>{variation.name}</label>
            <div ref={inputGroup} className={clsx("gx-2", style.inputGroup)}>
                {variation.options.map((option, index) => {
                    return <CheckRadio className={clsx(style.option)} key={variation.name + index} onChange={(e) => { change(e) }} value={option.value} name={variation.name}>{option.value}</CheckRadio>
                })}
            </div>
        </Col>);
}

export default memo(SelectVariation);