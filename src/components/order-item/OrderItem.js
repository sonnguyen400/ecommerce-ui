import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import style from './style.module.scss';
import clsx from 'clsx';
import InputNumber from '../input-number/InputNumber';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderSlice } from '../../store/order/orderReducer';
import ProductItemSelect from '../../part/product-item-selection/ProductItemSelect';
import APIBase from '../../api/ApiBase';
import { memo } from 'react';
import { deleteCartItem, updateCartItem } from '../../store/cart/cartReducer';
import { GlobalContext } from '../../context';
function OrderItem({ data, disabled }) {
    const dispatch = useDispatch();
    const orderItems = useSelector(state => state.order);
    const [product, setProduct] = useState(undefined);
    const [item, setItem] = useState(undefined);
    const globalContext = useContext(GlobalContext);
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
    const [state, setState] = useState(false);
    function changeVariation() {
        if (!product) {
            APIBase.get(`api/v1/product/${data.productItem.product.id}`)
                .then(payload => {
                    setProduct(payload.data);
                    return payload.data;
                }).then(data => {
                    setState(true)
                }).catch(e => {
                    globalContext.message.error("Error while fetching options");
                })
        } else {
            setState(state_ => !state_);
        }

    }
    function updateQty(value) {
        let object = { ...data };
        object.qty = Number.parseInt(value);
        updateItem(object);
    }

    function saveItem() {
        if (item) {
            let object = { ...data };
            object.productItem = {
                id: item.id
            };
            updateItem(object)
        } else {

            globalContext.message.warning("This option isn't available! Select another");
        }
    }
    function updateProductItem(value) {
        setItem(value)
    }

    function updateItem(cartItem) {
        dispatch(updateCartItem(cartItem))
    }

    return (<div>
        {data && <Row>
            <Col span={24}>
                <Row align="middle" gutter={12} className={clsx(style.orderItem)}>
                    {!disabled && <Col span={1}><input type='checkbox' checked={orderItems && orderItems.some(item => data.id === item.id)} onChange={selectItem} /></Col>}
                    <Col span={6} className={style.image}>
                        <img src={data.productItem.product && data.productItem.product.picture} />
                    </Col>
                    <Col span={16} className={style.productDetail}>
                        <Row>
                            <Col span={24}>
                                <Link to={`/product?id=${data.productItem.product.id}`} className={clsx(style.productName)}>{data.productItem.product && data.productItem.product.name}</Link>
                            </Col>
                            <Col span={24}>
                                <span className={clsx(style.price)}>{data.productItem && data.productItem.price}</span>
                            </Col>
                            <Col span={24}>
                                <button disabled={disabled} className={clsx(style.optionBtn)} onClick={() => changeVariation()}>
                                    <span>{data.productItem.options.map(option => option.value).join(" , ")}</span>
                                    <i className="fi fi-rr-angle-small-down"></i>
                                </button>
                            </Col>
                            <Row justify="space-between">
                                <Col span={4}>
                                    <InputNumber disabled={disabled} onChange={updateQty} value={data.qty} className={clsx(style.quantityChange)} min={1} />
                                </Col>
                                <Col span={8} className={style.total}>
                                    <div className={style.label}>Total</div>
                                    <div className={style.value}>{data.qty * data.productItem.price}</div>
                                </Col>
                            </Row>
                        </Row>

                    </Col>
                    {!disabled && <Col span={1} className={clsx(style.deleteBtn)} onClick={deleteItem}><i className="fi fi-br-cross-small"></i></Col>}
                </Row>
            </Col>
            {(product && state) && <Col span={state ? 24 : 0}>
                <Row justify="space-between">
                    <Col span={20}><ProductItemSelect onChange={updateProductItem} productItems={product.productItems} /></Col>
                    <Col span={4}><Button onClick={saveItem} type='text' style={{ color: "#006dee", fontWeight: 500 }}>Save</Button></Col>
                </Row>
            </Col>}
        </Row >}
    </div >);
}

export default memo(OrderItem);