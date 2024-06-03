import { Tabs, Tab } from 'antd';
import Cart from '../../../part/cart/Cart';
import CartCancel from '../../../part/cart-cancel/CartCancel';
import CartShipping from '../../../part/card-shipping/CardShipping';
function CardPage() {
    const items = [{
        key: 1,
        label: "Cart",
        children: Cart
    },
    {
        key: 2,
        label: "Cancel",
        children: Cart
    },
    {
        key: 1,
        label: "Delivering",
        children: CartShipping
    },
    ]
    return (
        <Tabs
            defaultActiveKey='1'
            items={items}
        />);
}

export default CardPage;