import { Col, Row, Card, Image, ListGroup } from "react-bootstrap";
import image from '../../../assets/image/image.png';
import { useSelector } from "react-redux";
import LinkListItem from "../../../components/link-list-Item/LinkListItem";
function Personal() {
    const user = useSelector((state) => state.user);
    return (<Row>
        <Col lg={4} md={5}>
            <Card>
                <div className="d-flex flex-column p-5">
                    <Image className="w-100 h-100 ratio-1x1" roundedCircle src={image} />
                    <h3 className="text-center pt-4">{user.firstname + " " + user.firstname}</h3>
                </div>
                <ListGroup variant="flush">
                    <LinkListItem >
                        <LinkListItem.Icon><i className="fi fi-rr-building"></i></LinkListItem.Icon>
                        <LinkListItem.Text>Address</LinkListItem.Text>
                    </LinkListItem>
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