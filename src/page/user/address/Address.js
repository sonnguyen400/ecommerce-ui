import { Card, CardBody, CardTitle, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import AddressTag from "../../../components/address-tag/AddressTag";
import style from './style.module.scss';
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import APIBase from "../../../api/ApiBase";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findAllByUserId, setDefaultUserAddress } from "../../../store/address/addressSlide";
function Address() {
    const address = useSelector(state => state.userAddress);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const selectDefaultAddress = useRef();
    const [editable, setEditable] = useState(false);
    function onChange(e) {
        // let checked = selectDefaultAddress.current.querySelector("input[type='radio'][name='address']:checked");
        if (e.target.checked) {
            dispatch(setDefaultUserAddress({
                userId: user.id,
                addressId: e.target.value
            }))
        }
    }
    useEffect(() => {
        if (user !== null && user.id !== undefined) {
            dispatch(findAllByUserId({ userId: user.id }));
        }
        const elements = selectDefaultAddress.current.querySelectorAll("input[type='radio'][name='address']");
        for (var element of elements) {
            element.addEventListener("change", onChange);
        }
        return () => {
            for (var element of elements) {
                element.removeEventListener("change", onChange);
            }
        }
    }, [user]);
    return (<Card>
        <CardBody>
            <div className="d-flex flex-row">
                <Col><CardTitle>Address</CardTitle></Col>
                <button onClick={() => { setEditable(false) }} className={clsx(style.disableEdit, { "d-none": !editable })}>Save</button>
            </div>
            <ListGroup variant="flush" ref={selectDefaultAddress}>
                {
                    address && address.map((item, index) =>
                    (<ListGroupItem key={index} variant="flush" className={style.addressTag}>
                        <input type="radio" checked={item.isDefault} onChange={onChange} value={item.id.addressId} name="address" />
                        <div className={clsx(style.address)}>
                            <AddressTag data={item.address} />
                            <button className={clsx("text-danger", style.deleteBtn, { "d-none": !editable })}><i className="fi fi-sr-minus-circle"></i></button>
                        </div>
                    </ListGroupItem>))
                }
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