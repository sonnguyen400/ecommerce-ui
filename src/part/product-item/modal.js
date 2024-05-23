import {Button, Modal, ModalBody, ModalFooter,ModalTitle, ModalHeader } from "react-bootstrap";
import VariationForm from "./variation-form-modal";
import { useContext, useEffect, useState } from "react";
import APIBase from "../../api/ApiBase";
import { GlobalContext } from "../../context";
function VariationFormModal({show,setShow,setState,product,setProduct}) {
    const globalContext=useContext(GlobalContext);
    const [variations,setVariations]=useState(null);
    function onSubmitHandler(data){
        globalContext.loader("   ");
        APIBase.post(`api/v1/product/${product.id}/item`,data)
        .then((payload)=>{
            setProduct(product=>{
                product.productItems.push(payload.data);
                return product;
            });
            return payload.data;
        }).error((err)=>{
            return err;
        }).finally(()=>{
            globalContext.loader(false);
            setShow(false)
        })

    }
    useEffect(()=>{
        APIBase.get(`api/v1/category/${product.category_id}/variation`)
    },[])
    return ( 
        <Modal onHide={()=>{setShow(false)}} show={show} backdrop="static" keyboard={false} size='lg'>
        <ModalHeader closeButton>
            <ModalTitle>Add variation</ModalTitle>
        </ModalHeader>
        <ModalBody>
            {product&&<VariationForm product={product} submitHandler={onSubmitHandler} onCancel={()=>{setState(false)}}/>}
        </ModalBody>
    </Modal>);
}

export default VariationFormModal;