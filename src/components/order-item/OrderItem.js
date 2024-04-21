import { Row, Col, Image, ButtonGroup, Button, Figure } from 'react-bootstrap';
import image from '../../assets/image/image.png';
import { Link } from 'react-router-dom';
import style from './style.module.scss';
import clsx from 'clsx';
import InputNumber from '../input-number/InputNumber';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderSlice } from '../../store/order/orderReducer';
function OrderItem({ data }) {
    const dispatch = useDispatch();
    const orderItems = useSelector(state => { return state.order });
    function selectItem(e) {
        if (e.target.checked) {
            dispatch(orderSlice.actions.addItem(data));
        } else {
            dispatch(orderSlice.actions.removeItem(data));
        }
    }
    const [state, setState] = useState(true);
    return (<div>
        {data && <Col>
            <Row className={clsx(style.orderItem, "align-items-center")}>
                <Col sm={1}><input type='checkbox' checked={orderItems && orderItems.some(item => data.id === item.id)} onChange={selectItem} /></Col>
                <Col md={2}>
                    <Image className='w-100 h-100 rounded' src={data.productItem.product_.productImage} />
                </Col>
                <Col sm={8}>
                    <Link to={`/product?id=${data.productItem.product_.id}`} className={clsx(style.productName)}>{data.productItem.product_.name}</Link>
                    <span className={clsx(style.price)}>{data.productItem.price}</span>
                    <button className={clsx(style.optionBtn)} onClick={() => setState(state => !state)}>
                        <span>{data.productItem.options.map(option => option.value).join(" , ")}</span>
                        <i className="fi fi-rr-angle-small-down"></i>
                    </button>
                    <InputNumber value={data.qty} className={clsx(style.quantityChange)} min={1} step={1} defaultValue={0} />
                </Col>
                <Col sm={1}><Button variant="outline-danger">Xóa</Button></Col>
            </Row>
            <Row className={clsx({ "d-none": state })}>
                hghg
            </Row>
        </Col>}
    </div>);
}

export default OrderItem;