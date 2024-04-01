import { Row,Col, Button } from "react-bootstrap";
import ProductAddForm from "../../../part/product/product-add-form";
import ProductItemForm from "../../../part/product/product-item-form";
import { useContext, useRef, useState } from "react";
import clsx from "clsx";
import APIBase from "../../../api/ApiBase";
import { AppLoader } from "../../../context/loader";
import VariationFormModal from "../../../part/product-item/modal";
function AddProduct() {
    const loader=useContext(AppLoader);
    function submit(formdata) {  

        loader("Uploading product");
            APIBase.post("/api/v1/product",formdata)
                .then((data)=>{
                    loader("");
                    alert("ok");
                })
                .errors(()=>{
                    loader("");
                })
                .finally(()=>{
                    loader("")
                })
    }
    return ( <Col>
        <ProductAddForm submitHandler={submit}/>
        
    </Col> );
}

export default AddProduct;