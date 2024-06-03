import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Button,
    Form,
} from "antd";

export default function ProductAddForm({ submitHandler, defaultCategory }) {
    const validateSchema = Yup.object().shape({
        name: Yup.string()
            .max(45, "Must be 45 characters or less")
            .required("Required"),
        description: Yup.string().required()
    })
    const formik = useFormik({
        initialValues: {
            name: "",
            category: (defaultCategory && defaultCategory.id) || 1
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
            <div>
                <Form onSubmit={formik.handleSubmit}>
                    <div>
                        <label>Image</label>
                        <Form.Item
                            type="file"
                            name="image"
                            onChange={(e) => {
                                formik.setFieldValue("image", e.target.files[0]);
                            }}
                        />
                    </div>

                    <div>
                        <label>Product's name</label>
                        <Form.Item
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
                    </div>

                    <div>
                        <label>Description</label>
                        <Form.Item
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
                    </div>

                    <div>
                        <label>category</label>
                        <Form.Item
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
                            {defaultCategory && <option value={defaultCategory?.id || null}>{defaultCategory.name || "default"}</option>}
                        </Form.Item>
                        {formik.touched.category && formik.errors.category ? (
                            <small className="text-danger">{formik.errors.category}</small>
                        ) : (
                            ""
                        )}
                    </div>

                    <Button
                        variant="primary"
                        type="submit"
                        className="mt-3"
                    >
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}
