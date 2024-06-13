import { Col, Row, Card, Image, Button, Flex, notification } from "antd";
import style from './style.module.scss';
import { useNavigate, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { useEffect, useState } from "react";
import APIBase from "../../../api/ApiBase";
import ProductItemSelect from "../../../part/product-item-selection/ProductItemSelect";
import InputNumber from "../../../components/input-number/InputNumber";
import { addCartItem } from "../../../store/cart/cartReducer";
import PrefixIcon from "../../../components/prefix-icon/PrefixIcon";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { orderLineSlice } from "../../../store/orderline/orderLine";
function ProductPage() {
    console.log("render")
    const navigate = useNavigate();
    const user = useSelector(store => store);
    const dispatch = useDispatch();
    const [urlParams, setUrlParams] = useSearchParams();
    const [context, notifContext] = notification.useNotification();
    const [qty, setQty] = useState(1);
    const [product, setProduct] = useState(null);
    const [selectedItem, setSelectedItem] = useState(undefined);
    useEffect(() => {
        APIBase.get(`api/v1/product/${urlParams.get("id")}`)
            .then(payload => {
                setProduct(payload.data);
                return payload.data;
            }).then(data => {
                setSelectedItem(data.productItems[0])
            }).catch(err => err)
    }, [])


    function addCard() {
        if (selectedItem) {
            let cardItem = {
                productItem: {
                    id: selectedItem.id
                },
                qty: qty
            }
            dispatch(addCartItem(cardItem));
            notification.success({
                message: "Success",
                description: "Add to cart successfully"
            })
        } else {
            notification.info({
                message: "Choose another options",
                description: "This Options isn't available"
            })
        }
    }

    function orderNow() {
        if (selectedItem) {
            const item = new Array()
            item.push({
                qty: qty,
                id: 0,
                productItem: {
                    id: selectedItem.id,
                    product: selectedItem.product,
                    price: selectedItem.price,
                    originalPrice: selectedItem.originalPrice,
                    options: selectedItem.options.map(option_ => ({
                        value: option_.value,
                        variation: {
                            name: option_.name
                        }
                    }))
                }
            })
            dispatch(orderLineSlice.actions.addAll(item))
            navigate("/order")
        } else {
            notification.info({
                message: "Choose another options",
                description: "This Options isn't available"
            })
        }
    }
    return (product &&
        <Row gutter={{ sm: 16, lg: 32 }}>
            <Col span={10}>
                <Card className={style.card}
                    cover={<div className={style.productImage}>
                        <Image className="w-100 h-100 " src={product.picture} alt="" />
                    </div>}
                >
                    <Col>
                    </Col>
                    <Row className="px-3">
                        {product.productItems.map((item, index) => {
                            if (item.picture) return <Col className="p-2 rounded border-1 border-primary-600" lg={3} key={index}><Image className="w-100 h-100 ratio-1x1" src={item.picture} /></Col>
                        })}
                    </Row>
                </Card>
            </Col>
            <Col span={14}>
                <Card title={<span style={{ fontSize: "2rem", padding: "16px 0px", fontWeight: 400 }}>{product.name}</span>} className={clsx(style.productDetail)}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}><span className={style.price}>{selectedItem && selectedItem.originalPrice}</span></Col>
                        <Col span={24}>
                            <ProductItemSelect onChange={setSelectedItem} productItems={product.productItems} />
                        </Col>
                        <Col>
                            <InputNumber value={qty} style={{ fontSize: "1rem" }} type="number" onChange={setQty} />
                        </Col>
                        <Col span={24}>
                            <Flex gap={[16, 16]} justify="end">
                                <Col><Button style={{ backgroundColor: "#333" }} shape="round" icon={<PrefixIcon style={{ color: "white" }}><i className="fi fi-rr-shopping-cart-add"></i></PrefixIcon>} className="mt-2" onClick={addCard} /></Col>
                                <Col><Button type="primary" shape="round" onClick={() => { orderNow() }}>Order Now</Button></Col>
                            </Flex>
                        </Col>
                    </Row>
                </Card>

            </Col>
        </Row>);
}

export default ProductPage;