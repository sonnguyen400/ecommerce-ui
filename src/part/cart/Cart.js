import OrderItem from "../../components/order-item/OrderItem";
import {Row,Col,Card,CardBody,ListGroup,Button} from 'react-bootstrap';
function Cart() {
    return ( <Row>
        <Col sm={8}>
            <Card>
                <CardBody>
                    <Card.Title>Cart</Card.Title>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item><OrderItem/></ListGroup.Item>
                        <ListGroup.Item><OrderItem/></ListGroup.Item>
                    </ListGroup>
                </CardBody>
            </Card>
        </Col>
        <Col sm={4}>
            <Card>
                <CardBody>

                </CardBody>
            </Card>
        </Col>
    </Row> );
}

export default Cart;