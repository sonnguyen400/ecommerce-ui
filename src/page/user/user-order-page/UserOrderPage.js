import { Button, Card, Col, Flex, Input, List, Row, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../../../components/order-item/OrderItem.js";
import { useEffect, useState } from "react";
import APIBase from "../../../api/ApiBase.js";
import { findAllByUserId } from "../../../store/address/addressSlide.js";
import AddressTag from "../../../components/address-tag/AddressTag.js";
import PrefixIcon from "../../../components/prefix-icon/PrefixIcon.js";
function UserOrderPage() {
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
    }, [dispatch])

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
            productItem: {
                id: line.productItem.id
            },
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
        <Row gutter={16}>
            <Col span={24} lg={{ span: 14 }}>
                <Row gutter={[8, 16]}>
                    <Col span={24}>
                        <Card title={<Row align="middle"><PrefixIcon><i className="fi fi-rr-marker"></i></PrefixIcon><span>Delivery Address</span></Row>}>
                            <Select onChange={setAddress} style={{ width: "100%", height: "fit-content" }}>
                                {address && address.map((item, index) => <Select.Option key={index} value={item.id.addressId}><AddressTag data={item.address} /></Select.Option>)}
                            </Select>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card title={<Row align="middle"><PrefixIcon><i className="fi fi-rr-marker"></i></PrefixIcon><span>Order Lines</span></Row>}>
                            <List className="list-group-flush">
                                {orderLines.map((item, index) => (<List.Item key={item}>
                                    <OrderItem data={item} disabled />
                                </List.Item>))}
                            </List>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col span={24} lg={{ span: 10 }}>
                <Row gutter={[8, 16]}>
                    <Col span={24}>
                        <Card title={<Row align="middle"><PrefixIcon><i className="fi fi-rr-ticket"></i></PrefixIcon><span>Voucher</span></Row>}>
                            <Row >
                                <Input placeholder="Enter your voucher code" />
                                <Button type="success" className="mx-1">Apply</Button>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={24} >
                        <Card title={<Row align="middle"><PrefixIcon><i class="fi fi-rr-wallet"></i></PrefixIcon><span>Purchase Method</span></Row>}>
                            <Select style={{ width: "100%", height: "fit-content" }}>
                                <Select.Option>Test</Select.Option>
                            </Select>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card title={<Row align="middle"><PrefixIcon><i class="fi fi-rr-shipping-fast"></i></PrefixIcon><span>Delivery Method</span></Row>}>
                            <Select style={{ width: "100%", height: "fit-content" }} onChange={setShipMethod}>
                                {shipMethods && shipMethods.map((item, index) =>
                                    <Select.Option key={index} data-value={item.id}>
                                        <div>
                                            <div className=" text-body-emphasis">{item.name}</div>
                                            <small>{item.price}</small>
                                        </div>
                                    </Select.Option>
                                )}
                            </Select>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card title="Total">
                            <h5>{total}</h5>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Button style={{ width: "100%" }} type="primary" onClick={order}>Order</Button>
                    </Col>
                </Row>
            </Col>
        </Row >
    );
}

export default UserOrderPage;