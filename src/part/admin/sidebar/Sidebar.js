import { Col, ListGroup, ListGroupItem } from "react-bootstrap";
import style from './style.module.scss';
import clsx from "clsx";
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

        </ul>
    </Col> );
}

export default Sidebar;