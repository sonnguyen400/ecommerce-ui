import { Col, Row, Card, Image, ListGroup, ListGroupItem } from "react-bootstrap";
import image from '../../../assets/image/image.png';
import global from '../../../global.module.scss';
import clsx from "clsx";
import LinkListItem from "../../../components/link-list-Item/LinkListItem";
function Personal() {
    return (<Row>
        <Col lg={4} md={5}>
            <Card>
                <div className="d-flex flex-column p-5">
                    <Image className="w-100 h-100 ratio-1x1" roundedCircle src={image} />
                    <h3 className="text-center pt-4">hdgh</h3>
                </div>
                <ListGroup variant="flush">
                    <LinkListItem to={`/user/address`}>
                        <LinkListItem.Icon><i className="fi fi-rr-building"></i></LinkListItem.Icon>
                        <LinkListItem.Text>Address</LinkListItem.Text>
                    </LinkListItem>
                    <LinkListItem >
                        <LinkListItem.Icon><i className="fi fi-sr-credit-card"></i></LinkListItem.Icon>
                        <LinkListItem.Text>Payment</LinkListItem.Text>
                    </LinkListItem>
                </ListGroup>
            </Card>
        </Col>
        <Col lg={8} md={7}></Col>
    </Row>);
}

export default Personal;