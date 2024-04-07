import { Row } from "react-bootstrap";
import ProductCard from "../../components/product-card/ProductCard";
import style from './style.module.scss';
import clsx from "clsx";
function ProductListBigIcon({children}) {
    return ( 
    <Row>
        {children&&Array.isArray(children)&&children.map((item,index)=><ProductCard key={index} className={clsx(style.productCard)}  md={3}>{item}</ProductCard>)}
    </Row> );
}

export default ProductListBigIcon;