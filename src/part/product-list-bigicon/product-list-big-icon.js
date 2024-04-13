import { Row ,Col} from "react-bootstrap";
import ProductCard from "../../components/product-card/ProductCard";
import style from './style.module.scss';
import ProductDetailItem from "../../components/admin/product-list-item/ProductDetailItem";
import clsx from "clsx";
function ProductListBigIcon({children}) {
    return ( 
    <Row>
        {children&&Array.isArray(children)&&children.map((item,index)=><ProductDetailItem className={clsx(style.productCard)}  md={3}>{item}</ProductDetailItem>)}
    </Row> );
}

export default ProductListBigIcon;