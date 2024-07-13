
import { Link } from "react-router-dom";
import { Menu } from "antd";
import PrefixIcon from "../../../components/prefix-icon/PrefixIcon.js";
function Sidebar({ ...props }) {
    return (
        <Menu style={{ height: "100%" }}>
            <Menu.Item icon={<PrefixIcon><i className="fi fi-rr-dashboard"></i></PrefixIcon>}>
                <Link to="/admin">Dashboard</Link>
            </Menu.Item>

            <Menu.Item icon={<PrefixIcon><i className="fi fi-rr-category-alt"></i></PrefixIcon>}>
                <Link to="/admin/category">
                    Category Management
                </Link>
            </Menu.Item>
            <Menu.Item icon={<PrefixIcon><i className="fi fi-rr-to-do"></i></PrefixIcon>}>
                <Link to="/admin/order-manage">
                    Order Management
                </Link>
            </Menu.Item>
            <Menu.Item icon={<PrefixIcon><i className="fi fi-rr-box-open-full"></i></PrefixIcon>}>
                <Link to="/admin/product-manage">
                    Product Manage
                </Link>
            </Menu.Item>
            <Menu.Item icon={<PrefixIcon><i className="fi fi-rr-warehouse-alt"></i></PrefixIcon>}>
                <Link to="/admin/warehouse">
                    Warehouse Manage
                </Link>
            </Menu.Item>
            <Menu.Item icon={<PrefixIcon><i className="fi fi-rr-user-check"></i></PrefixIcon>}>
                <Link to="/admin/user/manage">
                    User Manage
                </Link>
            </Menu.Item>
        </Menu>);
}

export default Sidebar;