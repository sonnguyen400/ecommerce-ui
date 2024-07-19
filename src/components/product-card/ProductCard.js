import { Card, Col, Row } from "antd";
import style from './style.module.scss';
import clsx from "clsx";
import { Link } from "react-router-dom";
import RateStar from "../rate-start/RateStar";
function ProductCard({ data, ...props }) {
    return (
        <div {...props} className={clsx(style.productCard)}>
            <Link to={`/product?id=${data.id}`}>
                <Row>
                    <Col span={24}><img alt="fg" src={data.picture || "https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lt6j2nuwf2ksf0_tn"} /></Col>
                    <Row className={style.productDetail}>
                        <Col span={24}><p className={style.productName}>{data.name}</p></Col>
                        <Col span={24} className={style.productPrice}>
                            <span className={style.current}>{data?.price}</span>
                            <span className={style.before}>123456</span>
                            <span className={style.percent}>12</span>
                        </Col>
                        <Col span={24} className={style.rate}>
                            <RateStar fontSize={15} />
                            <Row className={style.buy}>123k</Row>
                        </Col>
                    </Row>
                </Row>
            </Link>
        </div >
    );
}

export default ProductCard;