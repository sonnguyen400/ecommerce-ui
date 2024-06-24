import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import APIBase from "../../../api/ApiBase";
import { Row, Col, Button } from "antd";
function UserOrderPurchase() {
    const [urlParams, setUrlParams] = useSearchParams();
    const [orderInfo, setOrderInfo] = useState(undefined);
    useEffect(() => {
        APIBase.get(`/api/v1/order/${urlParams.get("id")}`)
            .then(payload => {
                setOrderInfo(payload.data);
            }).catch(console.log)
    }, [])
    function purchase() {
        APIBase.get(`/api/v1/order/${orderInfo.id}/purchase`).then(payload => payload.data).then(console.log).catch(console.log);
    }
    return (<Row>
        <Col><Button onClick={purchase}>Purchase</Button></Col>
    </Row>);
}

export default UserOrderPurchase;