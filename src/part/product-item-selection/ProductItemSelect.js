import { useMemo, useState } from 'react';
import {Col} from 'react-bootstrap';
import SelectVariation from '../../components/select-variaion/SelectVariaton';
import CheckRadio from '../../components/input-radio/CheckRadio';
import clsx from 'clsx';
import style from './style.module.scss';
function ProductItemSelect({productItems,onChange}) {
    const variations=useMemo(()=>{
        if(productItems&&Array.isArray(productItems)){
            var productOptions=productItems.reduce((pre,cur)=>{
                return [...pre,...cur.options];
            },[]);
            return  productOptions.map(option=>option.variation)
            .reduce((pre,cur)=>{
                if(pre.find(variation=>variation.id===cur.id)){
                    return pre;
                }
                pre.push(cur);
                return pre;
            },[]).map(variation=>{
                variation.options=productOptions.reduce((pre,cur)=>{
                    if(cur.variation.id===variation.id&&!pre.find(option=>option.value===cur.value)){
                        return [...pre,cur];
                    }
                    return pre;
                },[]);
                return variation;
            })
        }
        return []
    },[productItems]);
    const productItem=useMemo(()=>{
        var initialObject={};
        return Object.assign({
            options:[]
        },initialObject);
        
    });
    function update(value){
        if(!productItem.options.find(option=>option.variation.name==value.variation.name)){
            productItem.options.push(value);
        }else{
            productItem.options.forEach(element => {
                if(element.variation.name===value.variation.name){
                    element.value=value.value;
                }
            });
        }
        if(onChange){

            onChange(productItems.find(item=>item.options.every(option=>productItem.options.some(option_=>option_.value==option.value))));
        }
    }
    return ( <Col>
        {variations.map((variation,index)=>
            <SelectVariation onChange={update} variation={variation} key={index} label={variation.name}/>
        )}
    </Col> );
}

export default ProductItemSelect;