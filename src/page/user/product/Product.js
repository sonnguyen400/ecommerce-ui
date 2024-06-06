import { Col, Row, Card, Image, Button, Flex } from "antd";
import style from './style.module.scss';
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { useEffect, useState } from "react";
import APIBase from "../../../api/ApiBase";
import ProductItemSelect from "../../../part/product-item-selection/ProductItemSelect";
import { useDispatch } from "react-redux";
import InputNumber from "../../../components/input-number/InputNumber";
import { addCartItem } from "../../../store/cart/cartReducer";
import PrefixIcon from "../../../components/input-prefix-icon/PrefixIcon";

function Product() {
    const [urlParams, setUrlParams] = useSearchParams();
    const [qty, setQty] = useState(1);
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
            productItem: {
                id: selectedItem.id
            },
            qty: qty
        }
        dispatch(addCartItem(cardItem));
    }

    return (product &&
        <Row gutter={{ sm: 16, lg: 32 }}>
            <Col span={10}>
                <Card className={style.card}
                    cover={<div className={style.productImage}>
                        <Image className="w-100 h-100 " src={product.productImage} alt="" />
                    </div>}
                >
                    <Col>
                    </Col>
                    <Row className="px-3">
                        {product.productItems.map((item, index) => {
                            if (item.productImage) return <Col className="p-2 rounded border-1 border-primary-600" lg={3} key={index}><Image className="w-100 h-100 ratio-1x1" src={item.productImage} /></Col>
                        })}
                    </Row>
                </Card>
            </Col>
            <Col span={14}>
                <Card title={<span style={{ fontSize: "2rem", padding: "16px 0px", fontWeight: 400 }}>{product.name}</span>} className={clsx(style.productDetail)}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}><span className={style.price}>56728</span></Col>
                        <Col span={24}>
                            <ProductItemSelect onChange={setSelectedItem} productItems={product.productItems} />
                        </Col>
                        <Col>
                            <InputNumber value={qty} style={{ fontSize: "1rem" }} type="number" onChange={setQty} />
                        </Col>
                        <Col span={24}>
                            <Flex gap={[16, 16]} justify="end">
                                <Col><Button style={{ backgroundColor: "#333" }} shape="round" icon={<PrefixIcon style={{ color: "white" }}><i class="fi fi-rr-shopping-cart-add"></i></PrefixIcon>} className="mt-2" onClick={addCard} /></Col>
                                <Col><Button type="primary" shape="round" className="mt-2">Order Now</Button></Col>
                            </Flex>
                        </Col>
                    </Row>
                </Card>

            </Col>
        </Row>);
}

export default Product;