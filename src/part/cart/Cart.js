import { useEffect, useMemo, useState } from "react";
import OrderItem from "../../components/order-item/OrderItem";
import { Row, Col, Card, CardBody, ListGroup, Button, CardTitle } from 'react-bootstrap';
import APIBase from "../../api/ApiBase";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addAll } from "../../store/cart/cartReducer";
import axios, { Axios } from "axios";
function Cart() {
    const ordersState = useSelector(state => { return state.order });
    const cartItems = useSelector(state => state.cart);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const total = useMemo(() => {
        return ordersState.reduce((pre, cartItem) => {
            return pre + cartItem.qty * cartItem.productItem.price;
        }, 0)
    }, [ordersState])
    useEffect(() => {
        APIBase.get("api/v1/cart")
            .then(payload => {
                dispatch(addAll(payload.data));
                setLoading(false);
            })
            .catch(console.error)
    }, [dispatch])
    return (<Row className="mt-5">
        <Col sm={8}>
            <Card>
                <CardBody>
                    <Card.Title>Cart</Card.Title>
                    <ListGroup className="list-group-flush">
                        {!loading && cartItems.map((item, key) => <ListGroup.Item key={key}><OrderItem data={item} /></ListGroup.Item>)}
                    </ListGroup>
                </CardBody>
            </Card>
        </Col>
        <Col sm={4}>
            <Card>
                <CardBody>
                    <CardTitle className="opacity-75">Total</CardTitle>
                    <h4>{ordersState.reduce((pre, item) => {
                        var cartItem = cartItems.find(cartItem => item.id === cartItem.id)
                        return pre + cartItem.qty * cartItem.productItem.price;
                    }, 0)}</h4>
                    <Link to={`/order`}><Button>Purchase</Button></Link>
                </CardBody>
            </Card>
        </Col>
    </Row>);
}

export default Cart;