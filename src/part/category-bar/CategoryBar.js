import { Row, Col, Dropdown } from "antd";
import globalStyle from '../../assets/style/base.module.scss';
import style from './style.module.scss';
import clsx from "clsx";
import { Link } from "react-router-dom";
function CategoryBar() {
    const phones = [
        {
            key: "3",
            label: <Link>
                Apple
            </Link>
        }
    ]

    return (

        <Row justify="center" className={style.container}>
            <Row className={style.category}>
                <Col span={8} md={{ span: 6 }} lg={{ span: 4 }} className={style.category}>
                    <Dropdown menu={{ items: phones }}>
                        <div className={clsx(globalStyle.listItem, style.categoryItem)}>
                            <span className={globalStyle.icon}><i className="fi fi-rr-mobile-button"></i></span>
                            <span>Phone</span>
                        </div>
                    </Dropdown>
                </Col>
                <Col span={8} md={{ span: 6 }} lg={{ span: 4 }} className={style.category}>
                    <div className={clsx(globalStyle.listItem, style.categoryItem)}>
                        <span className={globalStyle.icon}><i className="fi fi-rr-laptop"></i></span>
                        <span>Laptop</span>
                    </div>
                </Col>
                <Col span={8} md={{ span: 6 }} lg={{ span: 4 }} className={style.category}>
                    <div className={clsx(globalStyle.listItem, style.categoryItem)}>
                        <span className={globalStyle.icon}><i className="fi fi-rr-sparkles"></i></span>
                        <span>Accessories</span>
                    </div>
                </Col>
                <Col span={8} md={{ span: 6 }} lg={{ span: 4 }} className={style.category}>
                    <div className={clsx(globalStyle.listItem, style.categoryItem)}>
                        <span className={globalStyle.icon}><i className="fi fi-brands-photoshop-camera"></i></span>
                        <span>Software</span>
                    </div>
                </Col>
                <Col span={8} md={{ span: 6 }} lg={{ span: 4 }} className={style.category}>
                    <div className={clsx(globalStyle.listItem, style.categoryItem)}>
                        <span className={globalStyle.icon}><i className="fi fi-rr-speaker"></i></span>
                        <span>Speaker</span>
                    </div>
                </Col>
                <Col span={8} md={{ span: 6 }} lg={{ span: 4 }} className={style.category}>
                    <div className={clsx(globalStyle.listItem, style.categoryItem)}>
                        <span className={globalStyle.icon}><i className="fi fi-rr-desktop-wallpaper"></i></span>
                        <span>Display</span>
                    </div>
                </Col>

            </Row>
        </Row>
    );
}

export default CategoryBar;