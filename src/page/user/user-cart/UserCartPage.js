import { Tabs, Tab } from 'antd';
import CartCancel from '../../../part/cart-cancel/CartCancel';
import CartShipping from '../../../part/card-shipping/CardShipping';
import UserCart from '../../../part/user-cart/cart/UserCart';
import ToPay from './topay';
function UserCartPage() {
    const items = [
        {
            key: 1,
            label: "Cart",
            children: <UserCart />
        },
        {
            key: 2,
            label: "To Pay",
            children: <ToPay />
        }
    ]
    return (
        <Tabs
            defaultActiveKey='1'
            items={items}
        />);
}

export default UserCartPage;