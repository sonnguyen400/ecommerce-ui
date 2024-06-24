import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import UserCart from '../../../part/user-cart/cart/UserCart';
import OrderList from './order-list';
function UserCartPage() {
    const user = useSelector(store => store.user)
    const items = [
        {
            key: 1,
            label: "Cart",
            children: <UserCart />
        },
        {
            key: 2,
            label: "To Pay",
            children: <OrderList state="PENDING" user={user} />
        },
        {
            key: 3,
            label: "Preparing",
            children: <OrderList state="PREPARING" user={user} />
        },
        {
            key: 4,
            label: "Delivering",
            children: <OrderList state="DELIVERING" user={user} />
        },
        {
            key: 5,
            label: "Delivered",
            children: <OrderList state="DELIVERED" user={user} />
        },
        {
            key: 6,
            label: "Completed",
            children: <OrderList state="COMPLETED" user={user} />
        },
        {
            key: 7,
            label: "Cancelled",
            children: <OrderList state="CANCEL" user={user} />
        },
        {
            key: 8,
            label: "Return",
            children: <OrderList state="RETURN" user={user} />
        },

    ]
    return (
        <Tabs
            defaultActiveKey='1'
            items={items}
        />);
}

export default UserCartPage;