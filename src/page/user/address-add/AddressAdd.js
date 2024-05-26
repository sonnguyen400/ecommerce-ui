import { Card, CardBody } from "react-bootstrap";
import AddressForm from "../../../part/address-form/AddressForm";
import { useDispatch, useSelector } from "react-redux";
import { postNewUserAddress } from "../../../store/address/addressSlide";

function AddressAdd() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    function onSubmit(data) {
        dispatch(postNewUserAddress({
            userId: user.id,
            address: data
        }))
    }
    return (<Card>
        <CardBody>
            <AddressForm onSubmit={onSubmit} />
        </CardBody>
    </Card>);
}

export default AddressAdd;