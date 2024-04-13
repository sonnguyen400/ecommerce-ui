import {  CardBody, CardTitle, Col, Row,Card,Image,Button } from "react-bootstrap";
import style from './style.module.scss';
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { useEffect, useState } from "react";
import APIBase from "../../../api/ApiBase";
import ProductItemSelect from "../../../part/product-item-selection/ProductItemSelect";

function Product() {
    const [urlParams,setUrlParams]=useSearchParams();
    const [product,setProduct]=useState(null);
    useEffect(()=>{
        APIBase.get(`api/v1/product/${urlParams.get("id")}`)
            .then(payload=>{
                setProduct(payload.data);
                return payload.data;
            }).catch(err=>err)
    },[])
    const [selectedItem,setSelectedItem]=useState(null);
    
    return ( product&&
    <Row>
        <Col xl={4}>
            <Card className={style.card}>
                <Col>
                    <div className={style.productImage}>
                        <Image className="w-100 h-100 " src={product.productImage} alt=""/>
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
                        {product.name}
                    </CardTitle>
                    <h5 className={style.price}>56728</h5>
                    <Col className={style.options}>
                        <Row> </Row>
                    </Col>
                    <ProductItemSelect onChange={setSelectedItem} productItems={product.productItems}/>
                    <Button>Add Cart</Button>
                    <Button>Order Now</Button>
                </CardBody>
            </Card>
           
        </Col>
    </Row> );
}

export default Product;