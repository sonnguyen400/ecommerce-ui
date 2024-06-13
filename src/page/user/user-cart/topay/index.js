import { useEffect, useState } from "react";
import APIBase from "../../../../api/ApiBase";
import { useSelector } from "react-redux";
import { Card, Col, Row, List } from "antd";
import OrderItem from "../../../../components/order-item/OrderItem";
function ToPay() {
    const user = useSelector(store => store.user)
    const [data, setData] = useState(undefined);
    useEffect(() => {
        APIBase.get(`/api/v1/order?status=PENDING&userId=${user.id}`)
            .then(payload => payload.data)
            .then(data => {
                setData(data.reduce((pre, order) => [...pre, ...order.orderLines], []))
            })
            .then(() => {

            })
            .catch(console.log)
    }, [])
    return (<Row justify="center">
        <Col span={16}>
            <Card>
                <List>
                    {data && data.map((item, index) => <OrderItem disabled data={item} />)}
                </List>
            </Card>
        </Col>

    </Row>);
}

export default ToPay;