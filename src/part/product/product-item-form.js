import { FieldArray, Formik, useFormik, Field } from "formik";
import { useRef } from "react";
import { Col, Row, Form, Button } from "antd";
import * as Yup from 'yup';
import APIBase from "../../api/ApiBase";
import clsx from "clsx";
function ProductItemForm({ name, value, price, className, ...props }) {
    const initialValues = {

        variation: [
            {
                name: "",
                value: ""
            }
        ]
    }
    const form = useRef();
    function formSubmit(value) {
        console.log(value)
        // console.log(value)
        // var data = new FormData();
        // var elements = form.current.querySelectorAll("input[type='file']");
        // for (var element of elements) {
        //     data.append("images", element.files[0]);
        // }
        // var $productItems = value.variation.map(item => ({
        //     "price": item.price,
        //     "variationOption": {
        //         "value": item.value,
        //         "variation": {
        //             "name": item.name
        //         }
        //     }
        // }))
        // data.append("product",)
        // APIBase.post("/test/productItems", data).then(console.log)
    }
    return (
        <Col className={clsx(className)}>
            <Formik initialValues={initialValues} onSubmit={formSubmit}>
                {({ values, setFieldValue }) =>
                    <Form ref={form} >
                        <Row>
                            <Col>
                                <div>
                                    <Form.Item
                                        className="p-4" type="file" name="image"
                                        onChange={(e) => setFieldValue("image", e.target.files[0])}
                                    />
                                    <label className="text-center">Variation Image</label>
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    <label>Price</label>
                                    <Field className="form-control"
                                        type="text"
                                        name="price"
                                        onChange={(e) => setFieldValue("price", e.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>

                        <FieldArray name="variation">
                            {({ insert, remove, push }) => (
                                <div>
                                    {values.variation.length > 0 && values.variation.map((value, idx) => (
                                        <div key={idx} className="p-3 my-3 border-top border-bottom">
                                            <Row>
                                                <Col>
                                                    <Form.Item as="select">
                                                        <option value={0}>Custom</option>
                                                        <option></option>
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <div>
                                                        <label>Variation</label>
                                                        <Field className="form-control"
                                                            type="text"
                                                            name={`variation.${idx}.name`}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div>
                                                        <label>Value</label>
                                                        <Field className="form-control"
                                                            type="text"
                                                            name={`variation.${idx}.value`}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                    <button type="button" className="secondary" onClick={() => push({ name: '', email: '', price: '' })}>
                                        Add Friend
                                    </button>
                                </div>
                            )}
                        </FieldArray>
                        <Button type="submit">Submit</Button>
                    </Form>
                }
            </Formik>
        </Col>);
}

export default ProductItemForm;