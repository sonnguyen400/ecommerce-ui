import { Button, Card, Col, FormControl, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../../../components/order-item/OrderItem.js";
import { useEffect, useMemo, useState } from "react";
import APIBase from "../../../api/ApiBase.js";
import SelectCustoms from "../../../components/select-custom/SelectCustoms.js";
import CustomOption from "../../../components/select-custom/CustomOption.js";
import { findAllByUserId } from "../../../store/address/addressSlide";
import AddressTag from "../../../components/address-tag/AddressTag.js";
function Order() {
    const [orderInfor, setOrderInfor] = useState({});
    const orderLines = useSelector(state => state.orderLines);
    const user = useSelector(state => state.user);
    const address = useSelector(state => state.userAddress);
    const dispatch = useDispatch();
    const [shipMethods, setShipMethods] = useState(null);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        if (address.length === 0) {
            if (user && user.id) dispatch(findAllByUserId({
                userId: user.id
            }))
        }

        APIBase.get("api/v1/shipmethod")
            .then(payload => payload.data)
            .then((data) => {
                setShipMethods(data);
                return data;
            }).then(data => {
                setOrderInfor(infor => {
                    infor.shipMethod = data[0];
                    return infor;
                })
                setOrderInfor(infor => {
                    infor.address = address && address.find(address => address.isDefault);
                    if ((!infor.address) && address.length > 0) infor.address = address[0];
                    return infor;
                })
            }).then(() => {
                setTotal(total => calculateTotal());
            });
    }, [dispatch, user, address])

    function setAddress(id) {
        setOrderInfor(infor => {
            infor.address = address.find(item => item.id.addressId == id);
            return infor;
        })
    }
    function setShipMethod(id) {
        setOrderInfor(infor => {
            infor.shipMethod = shipMethods.find(item => item.id == id);
            return infor;
        })
        setTotal(total => calculateTotal());
    }
    function buildOrder() {
        var orderLinesInfor = orderLines.map(line => ({
            productItemId: line.productItem.id,
            qty: line.qty,
            total: line.productItem.price * line.qty
        }))
        return {
            orderLines: orderLinesInfor,
            user: {
                id: user.id
            },
            shippingMethod: {
                id: orderInfor.shipMethod.id
            },
            address: {
                id: orderInfor.address.id.addressId
            },
            total: calculateTotal()
        }
    }
    function calculateTotal() {
        return orderLines.reduce((pre, item) => {
            return pre + item.productItem.price * item.qty;
        }, 0) + (orderInfor.shipMethod ? orderInfor.shipMethod.price : 0);
    }
    function order() {
        APIBase.post('/api/v1/order', buildOrder()).then(payload => payload.data).then(console.log).catch(console.log)
    }
    return (
        <Row>
            <Col lg={7}>
                <Card className="my-2">
                    <Card.Body>
                        <h6><span className="pt-1 px-2"><i className="fi fi-rr-marker"></i></span>Delivery Address</h6>
                        <SelectCustoms onChange={setAddress}>
                            {address && address.map((item, index) => <CustomOption key={index} data-value={item.id.addressId} data-selected={item.isDefault}><AddressTag data={item.address} /></CustomOption>)}
                        </SelectCustoms>
                    </Card.Body>
                </Card>
                <Card className="my-2">
                    <Card.Body>
                        <h6><span className="pt-1 px-2"><i className="fi fi-rr-marker"></i></span>Your order</h6>
                        <ListGroup className="list-group-flush">
                            {orderLines.map((item, index) => (<ListGroup.Item key={item}>
                                <OrderItem data={item} disabled />
                            </ListGroup.Item>))}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>

            <Col lg={5}>
                <Card className="my-2">
                    <Card.Body>
                        <h6><span className="pt-1 px-2"><i className="fi fi-rr-ticket"></i></span>Vouchers</h6>
                        <div className="d-flex flex-row w-100">
                            <FormControl placeholder="Enter your voucher code" />
                            <Button variant="success" className="mx-1">Apply</Button>
                        </div>
                    </Card.Body>
                </Card>
                <Card className="my-2">
                    <Card.Body>
                        <h6><span className="pt-1 px-2"><i className="fi fi-rr-ticket"></i></span>Purchase Method</h6>
                        <div className="d-flex flex-row w-100">

                        </div>
                    </Card.Body>
                </Card>
                <Card className="my-2">
                    <Card.Body>
                        <h6><span className="pt-1 px-2"><i className="fi fi-rr-ticket"></i></span>Delivery Method</h6>
                        <SelectCustoms onChange={setShipMethod}>
                            {shipMethods && shipMethods.map((item, index) =>
                                <CustomOption key={index} data-value={item.id}>
                                    <div>
                                        <div className=" text-body-emphasis">{item.name}</div>
                                        <small>{item.price}</small>
                                    </div>
                                </CustomOption>
                            )}
                        </SelectCustoms>
                    </Card.Body>
                </Card>
                <Card className="my-2">
                    <Card.Body>
                        <h6>Total</h6>
                        <h5>{total}</h5>
                    </Card.Body>
                </Card>
                <Button onClick={order}>Order</Button>
            </Col>
        </Row >
    );
}

export default Order;