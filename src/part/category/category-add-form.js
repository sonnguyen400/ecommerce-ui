import { Field, Form, Formik } from "formik";
import { Button, FormGroup,Row,Col } from "react-bootstrap";
import * as Yup from 'yup';
function CategoryForm({parent,submitHandler}) {
    var initialValues={
        "name":""
    }
    var validationSchema=Yup.object().shape({
        "name":Yup.string().required("Required")
    })
    return ( 
    <Formik onSubmit={submitHandler} initialValues={initialValues} validationSchema={validationSchema}>
        {({errors,touched})=>(
            <Form>
                <FormGroup>
                    <label>Category's name</label>
                    <Field name="name" className="form-control" />
                    {errors.name&&touched.name&&<h6 className="text-sm text-danger" style={{"display":"block"}} type="invalid"><small>{errors.name}</small></h6>}
                </FormGroup>

                <div className="d-flex justify-content-end">
                    <Button type="submit" className="mt-3 ms-auto">Submit</Button>
                </div>
            </Form>
        )}
    </Formik> );
}

export default CategoryForm;