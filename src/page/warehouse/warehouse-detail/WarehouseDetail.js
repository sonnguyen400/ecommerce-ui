import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIBase from "../../../api/ApiBase";
import { Button, Card, Form } from "antd";
import { useFormik } from "formik";
import { Description } from "../../../components/description";
import FormItemInput from "antd/es/form/FormItemInput";
function WarehouseDetail() {
    const { id } = useParams();
    const [data, setData] = useState();
    const formik = useFormik({
        initialValues: {
        },
        onSubmit: (value) => {
            APIBase.post(`api/v1/warehouse/${id}/item/${value.productItemId}`, value).then(payload => {
                console.log(payload.value);
                return payload.value;
            }).catch(console.log);
        }
    })
    useEffect(() => {
        APIBase.get(`api/v1/warehouse/${id}`)
            .then(payload => {
                setData(payload.data);
                return data;
            }).catch(console.log);
    }, []);


    return (<div>


        {data && <Card title={data.name}>
            <Description>{data.detail}</Description>
            <small className="opacity-75">{data.address.addressLine1}</small>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Item>
                    <label>Product Item id</label>
                    <FormItemInput name="productItemId" value={formik.values.productItemId} type="number" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item>
                    <label>Product Item id</label>
                    <FormItemInput name="SKU" value={formik.values.SKU} type="text" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item>
                    <label>Quantity</label>
                    <FormItemInput name="qty" value={formik.values.qty} type="number" onChange={formik.handleChange} />
                </Form.Item>
                <div className="d-flex justify-content-end pt-4">
                    <Button type="submit">Add</Button>
                </div>
            </Form>


        </Card>}
    </div>);
}

export default WarehouseDetail;