import { CardBody, CardTitle, Col, Row, Card, Image, Button, Figure } from "react-bootstrap";
import style from './style.module.scss';
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { useEffect, useState } from "react";
import APIBase from "../../../api/ApiBase";
import ProductItemSelect from "../../../part/product-item-selection/ProductItemSelect";
import { useDispatch } from "react-redux";
import InputNumber from "../../../components/input-number/InputNumber";
import { useRef } from "react";
import { useMemo } from "react";
import { addCartItem } from "../../../store/cart/cartReducer";

function Product() {
    const [urlParams, setUrlParams] = useSearchParams();
    const [qty,setQty]=useState(1);
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        APIBase.get(`api/v1/product/${urlParams.get("id")}`)
            .then(payload => {
                setProduct(payload.data);
                return payload.data;
            }).catch(err => err)
    }, [])
    
    const [selectedItem, setSelectedItem] = useState(null);
    function addCard() {
        let cardItem = {
            productItem:{
                id:selectedItem.id
            },
            qty: qty
        }
        dispatch(addCartItem(cardItem));
    }
    
    return (product &&
        <Row >
            <Col xl={4}>
                <Card className={style.card}>
                    <CardBody>
                        <Col>
                            <div className={style.productImage}>
                                <Image className="w-100 h-100 " src={product.productImage} alt="" />
                            </div>
                        </Col>

                    </CardBody>
                    <Row className="px-3">
                        {product.productItems.map((item, index) => {
                            if (item.productImage) return <Col className="p-2 rounded border-1 border-primary-600" lg={3} key={index}><Image className="w-100 h-100 ratio-1x1" src={item.productImage} /></Col>
                        })}
                    </Row>
                </Card>
            </Col>
            <Col xl={8} >
                <Card className={clsx(style.card, style.productDetail)}>
                    <CardBody>
                        <CardTitle>
                            {product.name}
                        </CardTitle>
                        <h5 className={style.price}>56728</h5>
                        <div className="d-flex flex-column">
                            <ProductItemSelect onChange={setSelectedItem} productItems={product.productItems} />
                            <InputNumber value={qty} className="py-2" type="number" onChange={setQty}/>
                        </div>
                        
                        <div className="d-flex flex-column w-100">
                            <Button className="mt-2" onClick={addCard}>Add Cart</Button>
                            <Button className="mt-2">Order Now</Button>
                        </div>
                    </CardBody>
                </Card>

            </Col>
        </Row>);
}

export default Product;