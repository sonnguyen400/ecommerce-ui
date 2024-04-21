import { useFormik } from "formik";
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import * as Yup from 'yup';
function AddressForm({ onSubmit }) {
    const validateSchema = Yup.object({
        city: Yup.string().required()
    })
    var formik = useFormik({
        initialValues: {
            city: " "
        },
        validationSchema: validateSchema
        ,
        onSubmit: (value) => {
            console.log(value)
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
                    {formik.errors.city && <small>{formik.errors.city}</small>}
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl name="postalCode" onChange={formik.handleChange} value={formik.values.postalCode} />
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
        </FormGroup>
        <FormGroup>
            <FormLabel>Line 2</FormLabel>
            <FormControl as="textarea" rows={3} name="addressLine2" onChange={formik.handleChange} value={formik.values.addressLine2} />
        </FormGroup>
        <FormGroup>
            <FormLabel>Country</FormLabel>
            <FormControl onChange={e => formik.setFieldValue("country", e.target.options[e.target.options.selectedIndex].value)} as="select">
                <option value="Viet Nam">Viet Nam</option>
                <option value="America">America</option>
            </FormControl>
        </FormGroup>
        <Button type="submit" className=" float-end mt-4">Submit</Button>
    </Form>);
}

export default AddressForm;