import { useFormik } from "formik";
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import * as Yup from 'yup';
import { Error } from '../../components/form-component';
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
            <FormGroup>
                <FormLabel>Building</FormLabel>
                <FormControl name="building" onChange={formik.handleChange} value={formik.values.building} />
            </FormGroup>
        </Col>
        <Row>
            <Col>
                <FormGroup>
                    <FormLabel>City</FormLabel>

                    <FormControl name="city" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} />
                    {formik.errors.city && <Error>{formik.errors.city}</Error>}

                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl name="postalCode" onChange={formik.handleChange} value={formik.values.postalCode} />
                    {formik.errors.postalCode && <Error>{formik.errors.postalCode}</Error>}
                </FormGroup>
            </Col>
        </Row>
        <FormGroup>
            <FormLabel>Region</FormLabel>
            <FormControl name="region" onChange={formik.handleChange} value={formik.values.region} />
        </FormGroup>
        <FormGroup>
            <FormLabel>Line 1</FormLabel>
            <FormControl as="textarea" rows={3} name="addressLine1" onChange={formik.handleChange} value={formik.values.addressLine1} />
            {formik.errors.addressLine1 && <Error>{formik.errors.addressLine1}</Error>}
        </FormGroup>
        <FormGroup>
            <FormLabel>Line 2</FormLabel>
            <FormControl as="textarea" rows={3} name="addressLine2" onChange={formik.handleChange} value={formik.values.addressLine2} />
        </FormGroup>
        <FormGroup>
            <FormLabel>Country</FormLabel>
            <FormControl value={formik.values.country.id} onChange={e => formik.setFieldValue("country.id", Number.parseInt(e.target.value))} as="select">
                <option value="1">Viet Nam</option>
                <option value="2">America</option>
            </FormControl>
        </FormGroup>
        <Button type="submit" className=" float-end mt-4">Submit</Button>
    </Form>);
}

export default AddressForm;