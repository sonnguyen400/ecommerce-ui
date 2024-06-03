import { Row, Col, Dropdown } from "antd";
import globalStyle from '../../assets/style/base.module.scss';
import style from './style.module.scss';
import clsx from "clsx";
function CategoryBar() {
    return (<div fluid>
        <Row>
            <Col className={style.category}>
                <Dropdown>
                    <div className={clsx(globalStyle.listItem, style.categoryItem)}>
                        <span className={globalStyle.icon}><i className="fi fi-rr-mobile-button"></i></span>
                        <span>Phone</span>
                    </div>
                </Dropdown>
            </Col>
            <Col className={style.category}>
                <div className={clsx(globalStyle.listItem, style.categoryItem)}>
                    <span className={globalStyle.icon}><i className="fi fi-rr-laptop"></i></span>
                    <span>Laptop</span>
                </div>
            </Col>
            <Col className={style.category}>
                <div className={clsx(globalStyle.listItem, style.categoryItem)}>
                    <span className={globalStyle.icon}><i className="fi fi-rr-sparkles"></i></span>
                    <span>Accessories</span>
                </div>
            </Col>
            <Col className={style.category}>
                <div className={clsx(globalStyle.listItem, style.categoryItem)}>
                    <span className={globalStyle.icon}><i className="fi fi-brands-photoshop-camera"></i></span>
                    <span>Software</span>
                </div>
            </Col>
            <Col className={style.category}>
                <div className={clsx(globalStyle.listItem, style.categoryItem)}>
                    <span className={globalStyle.icon}><i className="fi fi-rr-speaker"></i></span>
                    <span>Speaker</span>
                </div>
            </Col>
            <Col className={style.category}>
                <div className={clsx(globalStyle.listItem, style.categoryItem)}>
                    <span className={globalStyle.icon}><i className="fi fi-rr-desktop-wallpaper"></i></span>
                    <span>Display</span>
                </div>
            </Col>

        </Row>
    </div>);
}

export default CategoryBar;