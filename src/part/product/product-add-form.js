import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Button,
    Container,
    Row,
    Form,
    FormLabel,
    FormControl,
} from "react-bootstrap";
import { AppLoader } from "../../context/loader";
import APIBase from "../../api/ApiBase";

export default function ProductAddForm({submitHandler}) {
    const [formState, setFormState] = useState(true);
    const loader=useContext(AppLoader);
    const validateSchema = Yup.object().shape({
        name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        description: Yup.string().required(),
    });
    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: validateSchema,
        onSubmit: (values) => {
            let formdata = new FormData();
            Object.keys(values).forEach((key) => {
                formdata.append(key, values[key]);
            });
            submitHandler(formdata);
        },
    });
    return (
        <div>
            <Container>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group>
                        <FormLabel>Image</FormLabel>
                        <FormControl
                            type="file"
                            name="image"
                            onChange={(e) => {
                                formik.setFieldValue("image", e.target.files[0]);
                            }}
                        />
                    </Form.Group>

                    <Form.Group>
                        <FormLabel>Product's name</FormLabel>
                        <FormControl
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <small className="text-danger">{formik.errors.name}</small>
                        ) : (
                            ""
                        )}
                    </Form.Group>

                    <Form.Group>
                        <FormLabel>Description</FormLabel>
                        <FormControl
                            as="textarea"
                            rows={10}
                            name="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                        />
                        {formik.touched.description && formik.errors.description ? (
                            <small className="text-danger">{formik.errors.description}</small>
                        ) : (
                            ""
                        )}
                    </Form.Group>

                    <Form.Group>
                        <FormLabel>category</FormLabel>
                        <FormControl
                            as="select"
                            rows={10}
                            name="category"
                            onBlur={(e) =>
                                formik.setFieldValue(
                                    "category",
                                    e.target.options[e.target.selectedIndex].value
                                )
                            }
                            onChange={(e) =>
                                formik.setFieldValue(
                                    "category",
                                    e.target.options[e.target.selectedIndex].value
                                )
                            }
                            value={formik.values.category}
                        >
                            <option value={1}>Red</option>
                        </FormControl>
                        {formik.touched.category && formik.errors.category ? (
                            <small className="text-danger">{formik.errors.category}</small>
                        ) : (
                            ""
                        )}
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        onClick={(values) => setFormState(values)}
                    >
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
}
