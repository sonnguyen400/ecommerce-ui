import { Row, Col, Button } from "react-bootstrap";
import ProductAddForm from "../../../part/product/product-add-form";
import ProductItemForm from "../../../part/product/product-item-form";
import { useContext, useRef, useState } from "react";
import clsx from "clsx";
import APIBase from "../../../api/ApiBase";
import { GlobalContext } from "../../../context";
function AddProduct() {
    const globalContext = useContext(GlobalContext);
    function submit(formdata) {
        globalContext.loader("Uploading product");
        APIBase.post("/api/v1/product", formdata)
            .then((data) => {
                alert("ok");
            })
            .errors(() => {
            })
            .finally(() => {
                globalContext(false);
            })
    }
    return (<Col>
        <ProductAddForm submitHandler={submit} />

    </Col>);
}

export default AddProduct;