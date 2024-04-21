import { Card, CardBody, Col } from "react-bootstrap";
import SelectAddress from "../../../part/select-address/SelectAddress";

function Order() {
    return (<Card>
        <CardBody>
            <Col>
                <SelectAddress />
            </Col>
        </CardBody>
    </Card>);
}

export default Order;