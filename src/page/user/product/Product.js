import {  CardBody, CardTitle, Col, Row,Card } from "react-bootstrap";
import style from './style.module.scss';
import clsx from "clsx";
function Product() {
    return ( <Row>

        <Col xl={4}>
            <Card className={style.card}>
                <Col>
                    <div className={style.productImage}>
                        <img src="https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lt6j2nuwf2ksf0_tn" alt/>
                    </div>
                    <div>
                        <Row></Row>
                    </div>
                </Col>
            </Card>
        </Col>
        <Col xl={8} >
            <Card className={clsx(style.card,style.productDetail)}>
                <CardBody>
                    <CardTitle>
                        Example product 1
                    </CardTitle>
                    <h5 className={style.price}>56728</h5>
                    <Col className={style.options}>
                        <Row> </Row>
                    </Col>
                </CardBody>
            </Card>
        </Col>
    </Row> );
}

export default Product;