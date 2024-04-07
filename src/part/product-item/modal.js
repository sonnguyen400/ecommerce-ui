import {Button, Modal, ModalBody, ModalFooter,ModalTitle, ModalHeader } from "react-bootstrap";
import VariationForm from "./variation-form-modal";
import { useContext, useEffect, useState } from "react";
import APIBase from "../../api/ApiBase";
import { AppLoader } from "../../context/loader";
function VariationFormModal({show,setShow,setState,product,setProduct}) {
    const loader=useContext(AppLoader);
    const [variations,setVariations]=useState(null);
    function onSubmitHandler(data){
        APIBase.post(`api/v1/product/${product.id}/item`,data)
        .then((payload)=>{
            setProduct(product=>{
                product.productItems.push(payload.data);
                return product;
            });
        }).error((err)=>{
            loader("");
        }).finally(()=>{
            loader("");
            setShow(false)
        })

    }
    useEffect(()=>{
        APIBase.get(`api/v1/category/${product.category_id}/variation`)
    },[])
    return ( 
        <Modal onClose={()=>{show=false}} show={show} backdrop="static" keyboard={false} size='lg'>
        <ModalHeader closeButton>
            <ModalTitle>Modal heading</ModalTitle>
        </ModalHeader>
        <ModalBody>
            {product&&<VariationForm product={product} submitHandler={onSubmitHandler} onCancel={()=>{setState(false)}}/>}
        </ModalBody>
    </Modal>);
}

export default VariationFormModal;