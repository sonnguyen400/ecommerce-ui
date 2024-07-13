import { Button, Col, Divider, Card, Form, Input, Modal, Row, Space } from "antd";
import { useContext, useState } from "react";
import style from './style.module.scss';
import OrderItem from "../../../components/order-item/OrderItem";
import APIBase from "../../../api/ApiBase";
import { GlobalContext } from "../../../context";
import clsx from "clsx";
import { Link } from "react-router-dom";
import useAuth from "../../../secure/useAuth";
function UserOrder({ data, ...props }) {
    const [state, user, hasRole] = useAuth();
    const [modal, setModal] = useState(false);
    const globalContext = useContext(GlobalContext);
    function cancelOrder(data) {
        APIBase.post(`/api/v1/order/{${data.id}}/status/CANCEL`, data)
            .then(() => {
                globalContext.message.success("Cancel order successfully");
            }).catch(() => {
                globalContext.message.error("Can't cancel this order right now");
            })
    }
    return (
        <>
            <Modal footer={null} title="Are you sure?" open={modal} onCancel={() => { setModal(false) }}>
                <h4>Please let's we your advise </h4>
                <Form onFinish={cancelOrder}>
                    <Row>
                        <Col span={24}>
                            <Form.Item name="note">
                                <Input.TextArea placeholder="Your compliment" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="detail">
                                <Input.TextArea placeholder="Your advise" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Row justify="end">
                                <Space>
                                    <Button danger htmlType="submit" type="primary">Continue</Button>
                                </Space>
                            </Row>
                        </Col>
                    </Row>

                </Form>
            </Modal>
            <Card {...props} className={clsx(style.container)}>
                {data.orderLines.map((item_, key) => <><Col key={key} span={24}><OrderItem disabled data={item_} /> </Col><Divider /></>)}
                {data.status[data.status.length - 1].status <= 2 && <Col span={24}>
                    <Row justify="end" style={{ paddingTop: "16px" }}>
                        <Space>
                            <Link to={hasRole("ADMIN") ? `/admin/order?id=${data.id}` : `/order/detail?id=${data.id}`}><Button type="link">Details</Button></Link>
                            <Button type="primary" onClick={() => { setModal(true) }} danger>Cancel</Button>
                        </Space>

                    </Row>
                </Col>}
            </Card>
        </>);
}

export default UserOrder;