import {Row,Col,Image,ButtonGroup,Button,Figure} from 'react-bootstrap';
import image from '../../assets/image/image.png';
import style from './style.module.scss';
import clsx from 'clsx';
import InputNumber from '../input-number/InputNumber';
import { useState } from 'react';
function OrderItem() {
    const [state,setState]=useState(true);
    return ( <div>
       <Col>
            <Row className={clsx(style.orderItem,"align-items-center")}>
                    <Col sm={1}><input type='checkbox'/></Col>
                    <Col md={2}>
                        <Image className='w-100 h-100 rounded' src={image}/>
                    </Col>
                    <Col sm={8}>
                        <span className={clsx(style.productName)}>San pham abc hdfgjhkjfguyihuoqfwvfbqhudyibuhoqegyihygidgghdfgjhkjfguyihuoqfwvfbqhudyibuhoqegyihygidgg</span>
                        <span className={clsx(style.price)}>120000</span>
                        <button className={clsx(style.optionBtn)} onClick={()=>setState(state=>!state)}>
                            <span>Noi dung </span>
                            <i class="fi fi-rr-angle-small-down"></i>
                        </button>
                        <InputNumber className={clsx(style.quantityChange)} min={1} step={1} defaultValue={0}/>
                    </Col>
                    <Col sm={1}><Button variant="outline-danger">Xóa</Button></Col>
            </Row>
            <Row className={clsx({"d-none":state})}>
                hghg
            </Row>
       </Col>
    </div> );
}

export default OrderItem;