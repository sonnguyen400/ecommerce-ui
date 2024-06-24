import React, { useEffect, useState } from "react";
import { FieldArray, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import {
    Button,
    Row,
    Col,
    Upload,
    Input,
    Space,
    Select,
    Divider,
    notification,
    Form,
    Flex,
    InputNumber,
} from "antd";
import APIBase from "../../api/ApiBase";
import PrefixIcon from "../../components/prefix-icon/PrefixIcon.js";
function VariationOptionSelect({ name, variations, setVariations, remove, props }) {
    let [selectedVariation, setSelectedVariation] = useState((Array.isArray(variations) && variations.length > 0) ? variations[0] : undefined);
    let [change, setChange] = useState(true);
    function addVariation(data) {
        APIBase.post(`/api/v1/variation`, data)
            .then(payload => payload.data)
            .then(data => {
                setVariations(variations => [...variations, data])
            })
    }
    function addOption(data) {
        APIBase.post(`/api/v1/variation/${selectedVariation.id}/option`, data)
            .then(payload => payload.data)
            .then(data => {
                setSelectedVariation(variation => {
                    variation.options = [data, ...(Array.isArray(variation.options) ? variation.options : [])];
                    return variation
                })
                setVariations(variations => {
                    for (var i = 0; i < variations.length; i++) {
                        if (variations[i].id == data.variation.id) variations[i].options = [data, ...(Array.isArray(variations[i].options) ? variations[i].options : [])];
                        break;
                    }
                    return variations;
                })
                setChange(state => !state)
            })

    }
    return (<>
        <Col span={10}>
            <Form.Item
                rules={[{ required: "Required" }]}
                name={[name, "variation"]} {...props}>
                <Select options={variations && variations.map(variation_ => ({ label: variation_.name, value: variation_.id }))}
                    value={selectedVariation}
                    onChange={value => {
                        setSelectedVariation(variations.find(variation_ => variation_.id == value))
                        setChange(change => !change);
                    }}
                    dropdownRender={(menu) => <>
                        {menu}
                        <Divider />
                        <Form onFinish={addVariation}>
                            <Space.Compact style={{ width: "100%" }}>
                                <Form.Item style={{ padding: 0 }} name="name"><Input name="name" placeholder="Variation" /></Form.Item>
                                <Button htmlType="submit" type="primary">Add</Button>
                            </Space.Compact>
                        </Form>
                    </>}
                />
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item
                rules={[{ required: "Required" }]}
                name={[name, "id"]} {...props}>
                <Select
                    options={selectedVariation && Array.isArray(selectedVariation.options) && selectedVariation.options.map(option_ => ({ label: option_.value, value: option_.id }))}
                    dropdownRender={menu => <>
                        {menu}
                        <Form onFinish={addOption}>
                            <Space.Compact style={{ width: "100%" }}>
                                <Form.Item style={{ padding: 0 }} name="value"><Input placeholder="Value" /></Form.Item>
                                <Button htmlType="submit" type="primary">Add</Button>
                            </Space.Compact>
                        </Form>
                    </>}
                />
            </Form.Item>
        </Col>
        <Col span={2}>
            <Space style={{ paddingBottom: "24px" }}><Button type="text" icon={<PrefixIcon><i className="fi fi-rr-cross-small"></i></PrefixIcon>} onClick={() => remove(name)}></Button></Space>
        </Col>
    </>)
}



function VariationForm({ submitHandler, loading, onCancel, product }) {
    const [variations, setVariations] = useState([]);

    useEffect(() => {
        APIBase.get(`/api/v1/variation`).then(payload => { setVariations(payload.data) });
    }, [])

    function buildFormData(data) {
        var formData = new FormData();
        if (data.picture) formData.append("image", data.picture.file.originFileObj)
        var productItem = {
            originalPrice: data.originalPrice,
            price: data.price,
            options: data.options.map(option_ => ({
                id: option_.id,
                variation: {
                    id: option_.variation.id
                }
            }))
        }
        formData.append("productItem", new Blob([JSON.stringify(productItem)], { type: "application/json" }))
        if (submitHandler) {
            submitHandler(formData)
        }
    }
    return (
        <Form onFinish={buildFormData}>
            <Row gutter={14}>
                <Col span={24}>
                    <Row><label>Picture</label></Row>
                    <Form.Item name="picture">
                        <Upload type="file" name="picture">
                            <Button icon={<PrefixIcon><i className="fi fi-rr-inbox-out"></i></PrefixIcon>}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Row><label>Original Price</label></Row>
                    <Form.Item name="originalPrice" rules={[{ required: true, message: "Required" }]}><InputNumber style={{ width: "100%" }} /></Form.Item>
                </Col>
                <Col span={12}>
                    <Row><label>Price</label></Row>
                    <Form.Item name="price" rules={[{ required: true, message: "Required" }]}><InputNumber style={{ width: "100%" }} /></Form.Item>
                </Col>
                <Form.List name="options">
                    {(fields, { add, remove }) => <>
                        {
                            fields.map(({ key, name, ...props }) => (
                                <Row style={{ width: "100%" }} align="baseline" span={24} key={key}>
                                    <VariationOptionSelect variations={variations} setVariations={setVariations} name={name} remove={remove} props={props} />
                                </Row>))
                        }
                        <Col span={24}><Button icon={<PrefixIcon><i className="fi fi-rr-plus"></i></PrefixIcon>} type="dashed" block onClick={() => add()}>Add options</Button></Col>
                    </>}
                </Form.List>
                <Col span={24}>
                    <Flex style={{ paddingTop: "24px" }} justify="end"><Button htmlType="submit" type="primary">Submit</Button></Flex>
                </Col>
            </Row>

        </Form >
    );
}

export default VariationForm;


{/* <FormikProvider value={formik}>
<form onSubmit={formik.handleSubmit}>
    <Row gutter={18}>
        <Col span={12}>
            <Row><label>Image</label></Row>
            <Upload
                type="file"
                name="image"
                onChange={({ file }) => {
                    formik.setFieldValue("image", file.originFileObj);
                }}
            >
                <Button icon={<PrefixIcon><i className="fi fi-rr-inbox-out"></i></PrefixIcon>}>Click to Upload</Button>
            </Upload>
        </Col>
        <Col span={12}>
            <label>Price</label>
            <Input
                name="originalPrice"
                type="number"
                min={1}
                onChange={e => { formik.setFieldValue("originalPrice", e.target.value) }}
                onBlur={e => { formik.setFieldValue("originalPrice", e.target.value) }}
            />
        </Col>
       

        <Col span={24}>

            <Row justify="end">
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Save
                </Button>
            </Row>

        </Col>
    </Row>
</form>
</FormikProvider> */}