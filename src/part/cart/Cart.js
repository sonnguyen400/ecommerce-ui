import { useEffect, useMemo, useState } from "react";
import OrderItem from "../../components/order-item/OrderItem";
import { Row, Col, Card, CardBody, ListGroup, Button, CardTitle } from 'react-bootstrap';
import APIBase from "../../api/ApiBase";
import { orderSlice } from "../../store/order/orderReducer";
import { useDispatch, useSelector } from "react-redux";
import { orderSelector } from "../../store/order/orderSelector";
import { Link } from "react-router-dom";
function Cart() {
    const [cartItems, setCartItems] = useState(undefined);
    const orderItems = useSelector(state => { return state.order });
    const dispatch = useDispatch();
    const total = useMemo(() => {
        return orderItems.reduce((pre, cartItem) => {
            return pre + cartItem.qty * cartItem.productItem.price;
        }, 0)
    }, [orderItems])
    useEffect(() => {
        APIBase.get("api/v1/cart").then(payload => {
            setCartItems(payload.data)
            return payload.data;
        }).catch(console.log)
    }, [])

    return (<Row className="mt-5">
        <Col sm={8}>
            <Card>
                <CardBody>
                    <Card.Title>Cart</Card.Title>
                    <ListGroup className="list-group-flush">
                        {cartItems && cartItems.map((item, key) => <ListGroup.Item key={key}><OrderItem data={item} /></ListGroup.Item>)}
                    </ListGroup>
                </CardBody>
            </Card>
        </Col>
        <Col sm={4}>
            <Card>
                <CardBody>
                    <CardTitle className="opacity-75">Total</CardTitle>
                    <h4>{total}</h4>
                    <Link to={`/order`}><Button>Purchase</Button></Link>
                </CardBody>
            </Card>
        </Col>
    </Row>);
}

export default Cart;