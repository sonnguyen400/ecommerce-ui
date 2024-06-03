import { Modal } from "antd";
import VariationForm from "./variation-form-modal";
import { useContext, useEffect, useState } from "react";
import APIBase from "../../api/ApiBase";
import { GlobalContext } from "../../context";
function VariationFormModal({ show, setShow, setState, product, setProduct }) {
    const globalContext = useContext(GlobalContext);
    console.log(product)
    const [variations, setVariations] = useState(null);
    function onSubmitHandler(data) {
        globalContext.loader("   ");
        APIBase.post(`api/v1/product/${product.id}/item`, data)
            .then((payload) => {
                setProduct(product => {
                    product.productItems.push(payload.data);
                    return product;
                });
                return payload.data;
            }).error((err) => {
                console.log(err)
            }).finally(() => {
                globalContext.loader(false);
                setShow(false)
            })

    }
    useEffect(() => {
        APIBase.get(`api/v1/category/${product.categoryId}/variation`)
    }, [])
    return (
        <Modal title="Add variation" onHide={() => { setShow(false) }} show={show} backdrop="static" keyboard={false} size='lg'>
            {product && <VariationForm product={product} submitHandler={onSubmitHandler} onCancel={() => { setState(false) }} />}
        </Modal>);
}

export default VariationFormModal;