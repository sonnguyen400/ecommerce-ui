import { useEffect, useState } from "react";
import OrderItem from "../../../components/order-item/OrderItem";
import { Row, Col, Card, Button, List } from 'antd';
import APIBase from "../../../api/ApiBase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAll } from "../../../store/cart/cartReducer";
import { orderLineSlice } from "../../../store/orderline/orderLine";
import useAuth from "../../../secure/useAuth";
function UserCart() {
    const [state, user] = useAuth();
    const ordersState = useSelector(state => state.order);
    const cartItems = useSelector(state => state.cart);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            APIBase.get("api/v1/cart?userId=" + user.id)
                .then(payload => {
                    dispatch(addAll(payload.data));
                    setLoading(false);
                })
                .catch(console.error)
        }

    }, [user, state])
    function order() {
        dispatch(orderLineSlice.actions.addAll(ordersState));
        navigate("/order");
    }
    return (<Row gutter={[24, 24]}>
        <Col span={24} md={{ span: 12 }} lg={{ span: 14 }}>
            <Card title="Your Item">
                <List>
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