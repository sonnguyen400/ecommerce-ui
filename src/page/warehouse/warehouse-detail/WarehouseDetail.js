import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import APIBase from "../../../api/ApiBase";
import { Button, Card, CardBody, CardSubtitle, CardTitle, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useFormik } from "formik";
function WarehouseDetail() {
    const {id}=useParams();
    const [data,setData]=useState();
    const formik=useFormik({
        initialValues:{
        },
        onSubmit:(value)=>{
            APIBase.post(`api/v1/warehouse/${id}/item/${value.productItemId}`,value).then(payload=>{
                console.log(payload.value);
                return payload.value;
            }).catch(console.log);
        }
    })
    useEffect(()=>{
        APIBase.get(`api/v1/warehouse/${id}`)
                .then(payload=>{
                    setData(payload.data);
                    return data;
                }).catch(console.log);
    },[]);
    

    return ( <div>

        
        {data&&<Card>
        <CardBody>
            <CardTitle>{data.name}</CardTitle>
            <CardSubtitle>{data.detail}</CardSubtitle>
            <small className="opacity-75">{data.address.addressLine1}</small>
            <CardBody>
            <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <FormLabel>Product Item id</FormLabel>
                    <FormControl name="productItemId" value={formik.values.productItemId} type="number" onChange={formik.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Product Item id</FormLabel>
                    <FormControl name="SKU" value={formik.values.SKU} type="text" onChange={formik.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl name="qty" value={formik.values.qty} type="number" onChange={formik.handleChange}/>
                </FormGroup>
                <div className="d-flex justify-content-end pt-4">
                    <Button type="submit">Add</Button>
                </div>
            </Form>
        </CardBody>
        </CardBody>
        
    </Card>}
    </div> );
}

export default WarehouseDetail;