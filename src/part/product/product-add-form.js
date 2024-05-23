import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Button,
    Container,
    Form,
    FormLabel,
    FormControl,
} from "react-bootstrap";
import { AppLoader } from "../../context";

export default function ProductAddForm({submitHandler,defaultCategory}) {
    const validateSchema = Yup.object().shape({
        name: Yup.string()
            .max(45, "Must be 45 characters or less")
            .required("Required"),
        description: Yup.string().required()
    })
    const formik = useFormik({
        initialValues: {
            name: "",
            category:(defaultCategory&&defaultCategory.id)||1
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
                            onChange={(e) =>
                                formik.setFieldValue(
                                    "category",
                                    e.target.options[e.target.selectedIndex].value
                                )
                            }
                            value={formik.values.category}
                        >
                            {defaultCategory&&<option value={defaultCategory?.id||null}>{defaultCategory.name||"default"}</option>}
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
                        className="mt-3"
                    >
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
}
