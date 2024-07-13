import { Row, Col, Card, List } from 'antd';
import { useState, useEffect } from 'react';
import APIBase from '../../../../api/ApiBase';
import UserOrder from '../../../../part/user/user-order/UserOrder';
function OrderList({ state, user }) {
    const [data, setData] = useState(null);
    useEffect(() => {
        APIBase.get(`/api/v1/order?status=${state}&userId=${user.id}`)
            .then(payload => payload.data)
            .then(data_ => {
                setData(data_)
            })
            .then(() => {

            })
            .catch(console.log)
    }, [state])
    return (<Row justify="center">
        <Col span={16}>
            {data && data.map((item, index) => <UserOrder key={index} data={item} />)}
        </Col>
    </Row>);
}

export default OrderList;