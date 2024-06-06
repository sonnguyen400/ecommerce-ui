import { Tabs, Tab } from 'antd';
import CartCancel from '../../../part/cart-cancel/CartCancel';
import CartShipping from '../../../part/card-shipping/CardShipping';
import UserCart from '../../../part/user-cart/cart/UserCart';
function UserCartPage() {
    const items = [{
        key: 1,
        label: "Cart",
        children: <UserCart />
    }
    ]
    return (
        <Tabs
            defaultActiveKey='1'
            items={items}
        />);
}

export default UserCartPage;
// ,
//     {
//         key: 2,
//         label: "Cancel",
//         children: Cart
//     },
//     {
//         key: 1,
//         label: "Delivering",
//         children: CartShipping
//     },