import { useDispatch, useSelector } from "react-redux";
import SelectCustom from "../../components/select-custom/SelectCustom";
import { useEffect } from "react";
import { findAllByUserId } from "../../store/address/addressSlide";
import AddressTag from "../../components/address-tag/AddressTag";

function SelectAddress() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const address = useSelector(state => state.userAddress);
    useEffect(() => {
        if (address.length === 0) {
            if (user && user.id) dispatch(findAllByUserId({
                userId: user.id
            }))
        }
        console.log(address)
    }, [dispatch, user, address])
    return (<SelectCustom>
        {address && address.map((item, index) => <SelectCustom.Option key={index}><AddressTag data={item.address} /></SelectCustom.Option>)}
    </SelectCustom>);
}

export default SelectAddress;