import { Card, CardBody, CardImg, CardTitle, Row } from "react-bootstrap";
import style from './style.module.scss';
import RatingStars from "../rating-start/RatingStars";
function ProductCard() {
    return ( 
        <Card className={style.productCard}>
            <CardImg src="https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lt6j2nuwf2ksf0_tn"/>
            <CardBody className={style.productDetail}>
                <p className={style.productName}>Kem đanh rang</p>
                <div className={style.productPrice}>
                    <span className={style.current}>123456</span>
                    <span className={style.before}>123456</span>
                    <span className={style.percent}>12</span>
                </div>
                <div className={style.rate}>
                    <RatingStars percent={50}/>
                    <div className={style.buy}>123k</div>
                </div>
                
            </CardBody>
        </Card> 
    );
}

export default ProductCard;