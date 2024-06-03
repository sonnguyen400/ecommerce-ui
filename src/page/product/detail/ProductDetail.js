import { useState, useEffect, useLayoutEffect } from "react";
import { Button, Card, Col, Image, Row } from "antd";
import { Form, useSearchParams } from "react-router-dom";
import APIBase from "../../../api/ApiBase";
import VariationFormModal from "../../../part/product-item/modal";
import VariationForm from "../../../part/product-item/variation-form-modal";
import ProductItemView from "../../../part/product-item/productItemView";
import clsx from "clsx";
import style from './style.module.scss';
function ProductDetail() {

    const [urlParams, setUrlParams] = useSearchParams();
    const [data, setData] = useState(null);
    const [variationForm, setVariationForm] = useState(false);
    useLayoutEffect(() => {
        fetchProduct()
    }, [])
    async function fetchProduct() {
        APIBase.get(`api/v1/product/${urlParams.get("id")}`)
            .then((payload) => {
                setData(payload.data)
            }).catch(console.log)
    }
    return (
        data && <Card title={data.name}>
            <Col>
                <Row className="p-3">
                    <Col md={4} className="p-3">
                        {data && <Image className="w-100" rounded src={data.productImage} />}
                    </Col>
                    <Col md={8} className="p-3">
                        <div>
                            <p>{data.description}</p>
                        </div>
                    </Col>
                </Row>
                <Row className="p-3 justify-content-between">
                    <h4 className="col mb-0 d-inline-block">Variation</h4>
                    <Col sm={4}><Button className="align-self-end" onClick={() => { setVariationForm(true) }}>Add variation</Button></Col>
                </Row>
                {data && <VariationFormModal setProduct={setData} product={data} show={variationForm} setShow={setVariationForm} setState={setVariationForm} />}
                <table className={clsx(style.productItemTable)}>
                    <thead>
                        <tr>
                            <td>Image</td>
                            <td>Properties</td>
                            <td>Value</td>
                            <td>Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data && Array.isArray(data.productItems) && data.productItems.map((item, index) => <ProductItemView key={index} productItem={item} />)}
                    </tbody>
                </table>
            </Col>
        </Card>
    );
}

export default ProductDetail;