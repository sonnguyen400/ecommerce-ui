import { Card, Form, Input, Modal } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AddressForm from "../address-form/AddressForm";
import { postNewUserAddress } from "../../store/address/addressSlide";
import { useContext, useRef } from "react";
import { GlobalContext } from "../../context";
function AddressAddModal({ ...props }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const globalContext = useContext(GlobalContext);
    const phoneNumberInp = useRef();
    function onSubmit(data) {

        if (user) {
            globalContext.message.success("Add new address successfully");
            dispatch(postNewUserAddress({
                user: {
                    id: user.id
                },
                phoneNumber: phoneNumberInp.current.value,
                address: data
            }))
        }
    }
    return (<Modal footer={null} {...props}>
        <Card title="Add new Address">
            <Form.Item name="phoneNumber">
                <Input name="phoneNumber" ref={phoneNumberInp} />
            </Form.Item>
            <AddressForm onSubmit={onSubmit} />
        </Card>
    </Modal>);
}

export default AddressAddModal;