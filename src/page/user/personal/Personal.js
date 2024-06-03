import { Col, Row, Card, Image, List } from "antd";
import image from '../../../assets/image/image.png';
import { useSelector } from "react-redux";
import LinkListItem from "../../../components/link-list-Item/LinkListItem";
import { Link } from "react-router-dom";
function Personal() {
    const user = useSelector((state) => state.user);
    return (<Row>
        <Col lg={4} md={5}>
            <Card>
                <div className="d-flex flex-column p-5 align-items-center">
                    <Image className="w-75 h-75 ratio-1x1" roundedCircle src={image} />
                    <h3 className="text-center pt-4">{user ? `${user.lastname} ${user.firstname}` : <Link to="/login">Login</Link>}</h3>
                </div>

                {user && <List variant="flush">
                    <LinkListItem >
                        <LinkListItem.Icon><i className="fi fi-rr-envelope"></i></LinkListItem.Icon>
                        <LinkListItem.Text>Email</LinkListItem.Text>
                        <LinkListItem.Content>{user.email}</LinkListItem.Content>
                    </LinkListItem>
                    <LinkListItem >
                        <LinkListItem.Icon><i className="fi fi-rr-phone-call"></i></LinkListItem.Icon>
                        <LinkListItem.Text>Phone</LinkListItem.Text>
                        <LinkListItem.Content>{user.phoneNumber}</LinkListItem.Content>
                    </LinkListItem>
                    <LinkListItem >
                        <LinkListItem.Icon><i className="fi fi-rr-venus-mars"></i></LinkListItem.Icon>
                        <LinkListItem.Text>Gender</LinkListItem.Text>
                        <LinkListItem.Content>{user.gender}</LinkListItem.Content>
                    </LinkListItem>
                    <LinkListItem >
                        <LinkListItem.Icon><i className="fi fi-rr-cake-birthday"></i></LinkListItem.Icon>
                        <LinkListItem.Text>Birthday</LinkListItem.Text>
                        <LinkListItem.Content>{user.dateOfBirth}</LinkListItem.Content>
                    </LinkListItem>
                    <LinkListItem to={`/user/address`}>
                        <LinkListItem.Icon><i className="fi fi-rr-building"></i></LinkListItem.Icon>
                        <LinkListItem.Text>Address</LinkListItem.Text>
                    </LinkListItem>
                    <LinkListItem >
                        <LinkListItem.Icon><i className="fi fi-sr-credit-card"></i></LinkListItem.Icon>
                        <LinkListItem.Text>Payment</LinkListItem.Text>
                    </LinkListItem>
                </List>}
            </Card>
        </Col>
        <Col lg={8} md={7}></Col>
    </Row>);
}

export default Personal;