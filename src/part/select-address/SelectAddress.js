import { Card, CardBody, Col, DropdownItem, ListGroup, ListGroupItem, Nav, NavDropdown, Row } from "react-bootstrap";
import style from './style.module.scss';
import AddressTag from "../../components/address-tag/AddressTag";
import clsx from "clsx";
function SelectAddress() {
    return (
        <div className={clsx(style.dropdown)}>
            <div className="d-flex flex-row align-items-center">
                <AddressTag sm={1} className="flex-grow-1" />
                <i className="fi fi-rr-caret-down"></i>
            </div>
            <input type="hidden" />
            <div className={clsx(style.menu)}>
                <Card>
                    <CardBody>
                        <ListGroup variant="flush">
                            <ListGroupItem className={clsx(style.item)}><AddressTag /></ListGroupItem>
                            <ListGroupItem className={clsx(style.item)}><AddressTag /></ListGroupItem>
                            <ListGroupItem className={clsx(style.item)}><AddressTag /></ListGroupItem>
                            <ListGroupItem className={clsx(style.item)}><AddressTag /></ListGroupItem>

                        </ListGroup>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default SelectAddress;