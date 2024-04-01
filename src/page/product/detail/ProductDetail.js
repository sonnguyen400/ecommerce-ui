import { useState,useEffect, useLayoutEffect } from "react";
import { Button, CardTitle, Col,Image,ModalBody,ModalDialog,ModalHeader,Row,ModalTitle } from "react-bootstrap";
import { Form, useSearchParams } from "react-router-dom";
import APIBase from "../../../api/ApiBase";
import VariationFormModal from "../../../part/product-item/modal";
import VariationForm from "../../../part/product-item/variation-form-modal";

function ProductDetail() {
    const [urlParams,setUrlParams]=useSearchParams();
    const [data,setData]=useState({});
    const [variationForm,setVariationForm]=useState(false);
    useEffect(()=>{
            fetchProduct()
    },[])
    async function fetchProduct(){
        APIBase.get(`api/v1/product/${urlParams.get("id")}`)
        .then((payload)=>{
            setData(payload.data)
        })
    }
    return ( <Col>
        <Row className="p-3">
            <Col md={4} className="p-3">
                <Image className="w-100" rounded src={data.productImage}/>
            </Col>
            <Col md={8} className="p-3">
                <CardTitle>Detail</CardTitle>
            </Col>
        </Row>
        <Row className="p-3">
            <CardTitle>Variation</CardTitle>
            <Button onClick={()=>{setVariationForm(true)}}>Add variation</Button>
        </Row>
        {data&&<VariationFormModal product={data} show={variationForm} setState={setVariationForm}/>}
    </Col>);
}

export default ProductDetail;