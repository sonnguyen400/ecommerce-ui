import { Card, CardBody, CardImg, CardTitle, Row } from "react-bootstrap";
import style from './style.module.scss';
import RatingStars from "../rating-start/RatingStars";
import clsx from "clsx";
import { Link } from "react-router-dom";
function ProductCard({children,...props}) {
    console.log(children)
    return ( 
        <Card {...props} className={clsx(style.productCard)}>
            <Link to={`/product?id=${children.id}`}>
                <CardImg src={children.productImage||"https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lt6j2nuwf2ksf0_tn"}/>
                <CardBody className={style.productDetail}>
                    <p className={style.productName}>{children.name}</p>
                    <div className={style.productPrice}>
                        <span className={style.current}>{children?.price}</span>
                        <span className={style.before}>123456</span>
                        <span className={style.percent}>12</span>
                    </div>
                    <div className={style.rate}>
                        <RatingStars percent={50}/>
                        <div className={style.buy}>123k</div>
                    </div>
                </CardBody>
            </Link>
        </Card> 
    );
}

export default ProductCard;