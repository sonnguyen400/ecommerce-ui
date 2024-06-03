import { Row, Col, Image } from 'antd';
import { Link } from 'react-router-dom';
import style from './style.module.scss';
import clsx from 'clsx';
import InputNumber from '../input-number/InputNumber';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderSlice } from '../../store/order/orderReducer';
import ProductItemSelect from '../../part/product-item-selection/ProductItemSelect';
import APIBase from '../../api/ApiBase';
import { memo } from 'react';
import { deleteCartItem, updateCartItem } from '../../store/cart/cartReducer';
function OrderItem({ data, disabled }) {
    const dispatch = useDispatch();
    const orderItems = useSelector(state => { return state.order });
    const [product, setProduct] = useState(undefined);
    function selectItem(e) {
        if (e.target.checked) {
            dispatch(orderSlice.actions.addItem(data));
        } else {
            dispatch(orderSlice.actions.removeItem(data));
        }
    }
    function deleteItem(e) {
        dispatch(deleteCartItem(data.id));
    }
    const [state, setState] = useState(true);
    function changeVariation() {
        if (state) {
            APIBase.get(`api/v1/product/${data.productItem.product_.id}`)
                .then(payload => {
                    setProduct(payload.data);
                    return payload.data;
                }).then(data => {
                    setState(false)
                })
        } else {
            setState(true);
        }
    }
    function updateQty(value) {
        let object = { ...data };
        object.qty = Number.parseInt(value);
        updateItem(object);
    }
    function updateProductItem(value) {
        let object = { ...data };
        if (value) {
            object.productItem = value
            updateItem(object);
        }


    }
    function updateItem(cartItem) {
        dispatch(updateCartItem(cartItem))
    }

    return (<div>
        {data && <Col>
            <Row className={clsx(style.orderItem, "align-items-center")}>
                {!disabled && <Col sm={1}><input type='checkbox' checked={orderItems && orderItems.some(item => data.id === item.id)} onChange={selectItem} /></Col>}
                <Col md={2}>
                    <Image className='w-100 h-100 rounded' src={data.productItem.product_ && data.productItem.product_.productImage} />
                </Col>
                <Col>
                    <Link to={`/product?id=${data.productItem.product_.id}`} className={clsx(style.productName)}>{data.productItem.product_7 && data.productItem.product_.name}</Link>
                    <span className={clsx(style.price)}>{data.productItem && data.productItem.price}</span>
                    <button className={clsx(style.optionBtn)} onClick={() => disabled ? null : changeVariation()}>
                        <span>{data.productItem.options.map(option => option.value).join(" , ")}</span>
                        <i className="fi fi-rr-angle-small-down"></i>
                    </button>
                    <div className='d-flex justify-content-between'>
                        <InputNumber disabled={disabled} onChange={updateQty} value={data.qty} className={clsx(style.quantityChange)} min={1} />
                        <div className={style.total}>
                            <div className={style.label}>Total</div>
                            <div className={style.value}>{data.qty * data.productItem.price}</div>
                        </div>
                    </div>

                </Col>
                {!disabled && <Col sm={1} className={clsx(style.deleteBtn)} onClick={deleteItem}><i className="fi fi-br-cross-small"></i></Col>}
            </Row>
            <Row className={clsx({ "d-none": state })}>
                {product === undefined ? <div /> : <ProductItemSelect onChange={updateProductItem} productItems={product.productItems} />}
            </Row>
        </Col>}
    </div>);
}

export default memo(OrderItem);