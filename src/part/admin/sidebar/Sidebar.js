import { Col, ListGroup, ListGroupItem } from "react-bootstrap";
import style from './style.module.scss';
import clsx from "clsx";
import { Link } from "react-router-dom";
function Sidebar({...props}) {
    return ( 
    <Col {...props}>
        <ul className={style.sidebar}>
            <li className={style.item} tabIndex={1}>
                <div className={style.line}>
                    <span className={style.icon}><i className="fi fi-rr-dashboard"></i></span>
                    <span className={style.label}>Dashboard</span>
                </div>
                <span className={style.arrow}><i className="fi fi-rr-angle-small-right"></i></span>
            </li>
            <ul
                className={clsx(style.sidebar,style.expanded)}
            >

            </ul>
            <li className={style.item} tabIndex={1}>
                <div className={style.line}>
                    <span className={style.icon}><i className="fi fi-rr-dashboard"></i></span>
                    <span className={style.label}>Product</span>
                </div>
                <span className={style.arrow}><i className="fi fi-rr-angle-small-right"></i></span>
            </li>
            <Link to="/admin/category" className={style.item} tabIndex={1}>
                <div className={style.line}>
                    <span className={style.icon}><i class="fi fi-rr-category-alt"></i></span>
                    <span className={style.label}>Category Manage</span>
                </div>
                <span className={style.arrow}><i className="fi fi-rr-angle-small-right"></i></span>
            </Link>
            <Link to="/admin/product" className={style.item} tabIndex={1}>
                <div className={style.line}>
                    <span className={style.icon}><i class="fi fi-rr-to-do"></i></span>
                    <span className={style.label}>Order Manage</span>
                </div>
                <span className={style.arrow}><i className="fi fi-rr-angle-small-right"></i></span>
            </Link>
            <Link to="/admin/product" className={style.item} tabIndex={1}>
                <div className={style.line}>
                    <span className={style.icon}><i class="fi fi-rr-box-open-full"></i></span>
                    <span className={style.label}>Product Manage</span>
                </div>
                <span className={style.arrow}><i className="fi fi-rr-angle-small-right"></i></span>
            </Link>
            <Link to="/admin/warehouse" className={style.item} tabIndex={1}>
                <div className={style.line}>
                    <span className={style.icon}><i class="fi fi-rr-warehouse-alt"></i></span>
                    <span className={style.label}>Warehouse Manage</span>
                </div>
                <span className={style.arrow}><i className="fi fi-rr-angle-small-right"></i></span>
            </Link>
            <Link to="/admin/product" className={style.item} tabIndex={1}>
                <div className={style.line}>
                    <span className={style.icon}><i class="fi fi-rr-user-check"></i></span>
                    <span className={style.label}>Account Manage</span>
                </div>
                <span className={style.arrow}><i className="fi fi-rr-angle-small-right"></i></span>
            </Link>
        </ul>
    </Col> );
}

export default Sidebar;