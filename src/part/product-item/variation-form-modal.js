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
} from "antd";
import { GlobalContext } from "../../context";
import APIBase from "../../api/ApiBase";
import PrefixIcon from "../../components/input-prefix-icon/PrefixIcon";
function VariationOptionSelect({ variations, formik, option, index, arrayHelpers, setVariations }) {
    let [selectedVariation, setSelectedVariation] = useState(variations[0]);
    function addVariation(e) {
        var name = e.target.parentElement;
        while (!name.classList.contains("addVariation")) {
            name = name.parentElement;
        }
        APIBase.post(`/api/v1/variation`, { name: name.querySelector('input').value }).then(payload => payload.data).then(data => {
            setVariations(variations => [...variations, data])
        })
    }


    function addOption(e) {
        var name = e.target.parentElement;
        while (!name.classList.contains("addVariation")) {
            name = name.parentElement;
        }

        APIBase.post(`/api/v1/variation/${selectedVariation.id}/option`, { value: name.querySelector('input').value }).then(payload => payload.data).then(data => {
            setVariations(variations => {
                setSelectedVariation(selected => {
                    selected.options = [...(selected.options ? (selected.options) : []), data]
                    setVariations(variations_ => {
                        for (var i = 0; i < variations_.length; i++) {
                            if (variations_[i].id == selectedVariation.id) variations_[i] = selectedVariation;
                            return variations_;
                        }
                    })
                    return selected;
                })
                return variations;
            })
        })

    }
    return (<>
        <Col span={10}>
            <Select
                style={{ width: "100%" }}
                defaultValue={selectedVariation.id}
                name={`options.${index}.variation.id`}
                onChange={value => {
                    setSelectedVariation(variations.find(variation_ => variation_.id == value));
                    option.variation.id = value
                }}
                dropdownRender={menu => <>
                    {menu}
                    <Divider style={{ margin: "8px 0px" }} />
                    <Row gutter={4} className="addVariation">
                        <Col span={18}><Input /></Col>
                        <Button type="primary" onClick={addVariation}>Add</Button>
                    </Row>
                </>}
                options={variations.map(variation => ({
                    label: variation.name,
                    value: variation.id
                }))}
            />
        </Col>
        <Col span={12}>
            <Select
                style={{ width: "100%" }}
                defaultValue={(selectedVariation.options && selectedVariation.options[0]) ? selectedVariation.options[0].id : false}
                name={`options[${index}].id`}
                onChange={value => { option.id = value }}
                dropdownRender={menu => <>
                    {menu}
                    <Divider style={{ margin: "8px 0px" }} />
                    <Row gutter={4} className="addVariation">
                        <Col span={18}><Input /></Col>
                        <Button type="primary" onClick={addOption}>Add</Button>
                    </Row>
                </>}
                options={selectedVariation.options && selectedVariation.options.map(option_ => ({
                    label: option_.value,
                    value: option_.id
                }))}
            />
        </Col>
        <Col span={2}>
            <Button
                variant=""
                type="button"
                onClick={() => arrayHelpers.remove(index)}
            >
                <i className="fi fi-rr-cross-small"></i>
            </Button>
        </Col>
    </>)
}
function VariationForm({ submitHandler, loading, onCancel, product }) {
    const [variations, setVariations] = useState([]);

    useEffect(() => {
        APIBase.get(`/api/v1/variation`).then(payload => { setVariations(payload.data) });
    }, [])


    const validateSchema = Yup.object().shape({
        price: Yup.number(),
    });

    const formik = useFormik({
        initialValues: {
            image: "",
            options: []
        },
        validationSchema: validateSchema,
        onSubmit: (values) => {
            var payload = new FormData();
            payload.append("image", values.image);
            payload.append("productItem", new Blob([JSON.stringify(values)], { type: "application/json" }));
            submitHandler(payload);
        },
    });
    function addMoreVariationInput(arrayHelpers) {
        let options = formik.values.options;
        let isDuplicate = false;
        for (let i = options.length - 2; i >= 0; i--) {
            if (options[i].variation.id === options[options.length - 1].variation.id) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) arrayHelpers.push({ variation: { id: 1 }, id: 1 });
        else {
            // setToast("Duplicate variation identifier");
        }
    }
    return (
        <FormikProvider value={formik}>
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
                            name="price"
                            type="number"
                            min={1}
                            onChange={e => { formik.setFieldValue("price", e.target.value) }}
                            onBlur={e => { formik.setFieldValue("price", e.target.value) }}
                        />
                    </Col>
                    <Col span={24}>
                        <Col><p>Variations</p></Col>
                        <FieldArray
                            name="options"
                            render={(arrayHelpers) => (
                                <>
                                    {formik.values.options.map((option, index) => (
                                        <Row className="my-3" key={index} gutter={16} style={{ paddingTop: "16px" }}>
                                            <VariationOptionSelect setVariations={setVariations} variations={variations} formik={formik} option={option} key={index} arrayHelpers={arrayHelpers} />
                                        </Row>
                                    ))}
                                    <Space style={{ marginTop: "16px" }}>
                                        <Button
                                            loading={loading}
                                            type="primary"
                                            icon={<PrefixIcon><i className="fi fi-br-plus" style={{ color: "white" }}></i></PrefixIcon>}
                                            onClick={() => addMoreVariationInput(arrayHelpers)}
                                            className="d-flex align-items-center mt-5"
                                        >
                                            <span>Add variation</span>
                                        </Button>
                                    </Space>
                                </>
                            )}
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
        </FormikProvider>
    );
}

export default VariationForm;