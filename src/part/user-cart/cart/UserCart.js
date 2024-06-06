import { useEffect, useState } from "react";
import OrderItem from "../../../components/order-item/OrderItem";
import { Row, Col, Card, Button, List } from 'antd';
import APIBase from "../../../api/ApiBase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAll } from "../../../store/cart/cartReducer";
import { orderLine } from "../../../store/orderline/orderLine";
function UserCart() {
    const ordersState = useSelector(state => { return state.order });
    const cartItems = useSelector(state => state.cart);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        APIBase.get("api/v1/cart")
            .then(payload => {
                dispatch(addAll(payload.data));
                setLoading(false);
            })
            .catch(console.error)
    }, [dispatch])
    function order() {
        dispatch(orderLine.actions.addAll(ordersState));
        navigate("/order");
    }
    return (<Row gutter={[24, 24]}>
        <Col span={24} md={{ span: 12 }} lg={{ span: 14 }}>
            <Card title="Your Item">
                <List className="list-group-flush">
                    {!loading && cartItems.map((item, key) => <List.Item key={key}><OrderItem data={item} /></List.Item>)}
                </List>
            </Card>
        </Col>
        <Col span={24} md={{ span: 12 }} lg={{ span: 10 }}>
            <Card title="Total">
                <h4>{ordersState.reduce((pre, item) => {
                    var cartItem = cartItems.find(cartItem => item.id === cartItem.id)
                    return pre + cartItem.qty * cartItem.productItem.price;
                }, 0)}</h4>
                <Button onClick={order}>Purchase</Button>
            </Card>
        </Col>
    </Row>);
}

export default UserCart;