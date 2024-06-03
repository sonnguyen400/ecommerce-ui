import { Field, useFormik } from "formik";
import { Button, Col, Form, Input, Row } from "antd";
import * as Yup from 'yup';
import { Error } from '../../components/form-component';
import FormItemInput from "antd/es/form/FormItemInput";
function AddressForm({ onSubmit }) {
    const validateSchema = Yup.object({
        city: Yup.string().required(),
        postalCode: Yup.string().required(),
        addressLine1: Yup.string().required()
    })
    var formik = useFormik({
        initialValues: {
            city: " ",
            country: {
                id: 1
            }
        },
        validationSchema: validateSchema
        ,
        onSubmit: (value) => {
            if (onSubmit) {
                onSubmit(value)
            }
        }
    })
    return (<Form onSubmit={formik.handleSubmit}>
        <Col>
            <Form.Item>
                <label>Building</label>
                <FormItemInput name="building" onChange={formik.handleChange} value={formik.values.building} />
            </Form.Item>
        </Col>
        <Row>
            <Col>
                <Form.Item>
                    <label>City</label>

                    <FormItemInput name="city" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} />
                    {formik.errors.city && <Error>{formik.errors.city}</Error>}

                </Form.Item>
            </Col>
            <Col>
                <Form.Item>
                    <label>Postal Code</label>
                    <input name="postalCode" onChange={formik.handleChange} value={formik.values.postalCode} />
                    {formik.errors.postalCode && <Error>{formik.errors.postalCode}</Error>}
                </Form.Item>
            </Col>
        </Row>
        <Form.List>
            <label>Region</label>
            <Input name="region" onChange={formik.handleChange} value={formik.values.region} />
        </Form.List>
        <div>
            <label>Line 1</label>
            <Field as="textarea" rows={3} name="addressLine1" onChange={formik.handleChange} value={formik.values.addressLine1} />
            {formik.errors.addressLine1 && <Error>{formik.errors.addressLine1}</Error>}
        </div>
        <div>
            <label>Line 2</label>
            <Field as="textarea" rows={3} name="addressLine2" onChange={formik.handleChange} value={formik.values.addressLine2} />
        </div>
        <div>
            <label>Country</label>
            <Field value={formik.values.country.id} onChange={e => formik.setFieldValue("country.id", Number.parseInt(e.target.value))} as="select">
                <option value="1">Viet Nam</option>
                <option value="2">America</option>
            </Field>
        </div>
        <Button type="submit" className=" float-end mt-4">Submit</Button>
    </Form>);
}

export default AddressForm;