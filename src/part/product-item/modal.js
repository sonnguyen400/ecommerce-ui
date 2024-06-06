import { Modal, notification } from "antd";
import VariationForm from "./variation-form-modal";
import { useContext, useEffect, useState } from "react";
import APIBase from "../../api/ApiBase";
import { GlobalContext } from "../../context";
function VariationFormModal({ product, setProduct, ...props }) {
    const [variations, setVariations] = useState(null);
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    function onSubmitHandler(data) {
        APIBase.post(`api/v1/product/${product.id}/item`, data)
            .then((payload) => {
                setProduct(product => {
                    product.productItems.push(payload.data);
                    return product;
                });
                notification.success({
                    message: "Success",
                    description: "Added Product Item",
                    duration: 1
                })
                return payload.data;
            }).error((err) => {
                notification.err({
                    message: "Failure",
                    description: "Failure when add new Product Item",
                    duration: 1
                })
            })

    }
    useEffect(() => {
        APIBase.get(`api/v1/variation`).then(payload => payload.data).then(data => {
            setVariations(data);
        })
    }, [])
    return (
        <Modal title="Add variation" {...props} width={800}>
            {product && <VariationForm loading={loading} product={product} submitHandler={onSubmitHandler} />}
        </Modal>);
}

export default VariationFormModal;