import { Card, Rate, Col, Row } from "antd";
import style from './style.module.scss';
import clsx from "clsx";
import { Link } from "react-router-dom";
function ProductCard({ children, ...props }) {
    return (
        <div {...props} className={clsx(style.productCard)}>
            <Link to={`/product?id=${children.id}`}>
                <Row>
                    <Col span={24}><img alt="fg" src={children.productImage || "https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lt6j2nuwf2ksf0_tn"} /></Col>
                    <Row className={style.productDetail}>
                        <Col span={24}><p className={style.productName}>{children.name}</p></Col>
                        <Col span={24} className={style.productPrice}>
                            <span className={style.current}>{children?.price}</span>
                            <span className={style.before}>123456</span>
                            <span className={style.percent}>12</span>
                        </Col>
                        <Col span={24} className={style.rate}>
                            <Rate />
                            <Row className={style.buy}>123k</Row>
                        </Col>
                    </Row>
                </Row>
            </Link>
        </div >
    );
}

export default ProductCard;