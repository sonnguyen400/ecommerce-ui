import { Field, Form, Formik } from "formik";
import { Button, FormGroup,FormControl } from "react-bootstrap";
import * as Yup from 'yup';
function CategoryForm() {
    var initialValues={
        "name":""
    }
    var validationSchema=Yup.object().shape({
        "name":Yup.string().required("Required")
    })
    return ( 
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {({errors,touched})=>(
            <Form>
                <FormGroup>
                    <label>Category's name</label>
                    <Field name="name" className="form-control" />
                    {errors.name&&touched.name&&<h6 className="text-sm text-danger" style={{"display":"block"}} type="invalid"><small>{errors.name}</small></h6>}
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
        )}
    </Formik> );
}

export default CategoryForm;