import { Card, CardBody, Col } from "react-bootstrap";
import SelectAddress from '../../../part/select-address/SelectAddress.js';
function Order() {
    return (<Card>
        <CardBody>
            <SelectAddress />
        </CardBody>
    </Card>);
}

export default Order;