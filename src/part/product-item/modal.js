import {Button, Modal, ModalBody, ModalFooter,ModalTitle, ModalHeader } from "react-bootstrap";
import VariationForm from "./variation-form-modal";
import { useEffect, useState } from "react";
import APIBase from "../../api/ApiBase";

function VariationFormModal({show,setState,product}) {
    const [variations,setVariations]=useState(null);
    function onSubmitHandler(data){
        console.log(data);
        var payload= new FormData();
        payload.append("image",data.image);
        payload.append("productItem",JSON.stringify(data));
        console.log(JSON.stringify(data));
    }
    useEffect(()=>{
        APIBase.get(`api/v1/category/${product.category_id}/variation`)
    },[])
    return ( 
        <Modal show={show} backdrop="static" keyboard={false} size='lg'>
        <ModalHeader closeButton>
            <ModalTitle>Modal heading</ModalTitle>
        </ModalHeader>
        <ModalBody>
            {product&&<VariationForm product={product} submitHandler={onSubmitHandler} onCancel={()=>{setState(false)}}/>}
        </ModalBody>
    </Modal>);
}

export default VariationFormModal;