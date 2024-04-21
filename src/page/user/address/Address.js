import { Card, CardBody, CardTitle, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import AddressTag from "../../../components/address-tag/AddressTag";
import style from './style.module.scss';
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import APIBase from "../../../api/ApiBase";
import { Link } from "react-router-dom";
function Address() {
    const selectDefaultAddress = useRef();
    const [editable, setEditable] = useState(false);
    function onChange(e) {
        let checked = selectDefaultAddress.current.querySelector("input[type='radio'][name='address']:checked");
    }
    useEffect(() => {
        const elements = selectDefaultAddress.current.querySelectorAll("input[type='radio'][name='address']");
        for (var element of elements) {
            element.addEventListener("change", onChange);
        }
        return () => {
            for (var element of elements) {
                element.removeEventListener("change", onChange);
            }
        }
    }, []);
    return (<Card>
        <CardBody>
            <div className="d-flex flex-row">
                <Col><CardTitle>Address</CardTitle></Col>
                <button onClick={() => { setEditable(false) }} className={clsx(style.disableEdit, { "d-none": !editable })}>Save</button>
            </div>
            <ListGroup variant="flush" ref={selectDefaultAddress}>
                <ListGroupItem variant="flush" className={style.addressTag}>
                    <input type="radio" value={1} name="address" />
                    <div className={clsx(style.address)}>
                        <AddressTag />
                        <button className={clsx("text-danger", style.deleteBtn, { "d-none": !editable })}><i className="fi fi-sr-minus-circle"></i></button>
                    </div>
                </ListGroupItem>

            </ListGroup>
            <Link to="/user/address/add" className="p-3">
                <button className={clsx(style.addAddressButton)}>
                    <div className={clsx(style.content)}>
                        <span className={clsx(style.icon)}>+</span>
                        <span>Add Address</span>
                    </div>
                </button>
            </Link>
            <div className="d-flex justify-content-center w-100"><button onClick={() => { setEditable(true) }} className={clsx(style.editEnable, { "d-none": editable })}>Edit</button></div>
        </CardBody>


    </Card>);
}

export default Address;