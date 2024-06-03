import { Col, Form, Row } from "antd";
import { Button, Error, Input, Select } from "../../components/form-component";
import * as Yup from "yup";
import { useFormik } from "formik";
function RegisterForm({ onSubmit }) {
    const schema = Yup.object().shape({
        username: Yup.string().required().min(6, "Username can't be blank"),
        password: Yup.string().required().min(6, "Password must at least 6 characters in length"),
        user: Yup.object().shape({
            firstname: Yup.string().required("first name cant be blank"),
            lastname: Yup.string().required(),
            dateOfBirth: Yup.date(),
            gender: Yup.string().required(),
            phoneNumber: Yup.string().required().length(10, "Phone number is invalid"),
            email: Yup.string().email()
        })
    });
    const initvalue = {
        username: '',
        password: '',
        user: {
            firstname: "",
            lastname: "",
            dateOfBirth: "",
            gender: "Male",
            phoneNumber: "",
            email: ""
        },
    }
    function submitHandler(data) {
        onSubmit(data)
    }
    const formik = useFormik({
        initialValues: initvalue,
        onSubmit: submitHandler,
        validationSchema: schema
    })
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Row>
                <Col>
                    <Form.Item>
                        <Form.Label>First name</Form.Label>
                        <Input
                            $danger={formik.touched.user && formik.errors.user && formik.errors.user.firstname}
                            type="text"
                            id="firstname"
                            name="user.firstname"
                            onChange={formik.handleChange}
                            value={formik.values.user.firstname}
                        />
                        <Error>{formik.errors.user && formik.errors.user.firstname}</Error>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item>
                        <Form.Label>Last name</Form.Label>
                        <Input
                            $danger={formik.touched.user && formik.errors.user && formik.errors.user.lastname}
                            type="text"
                            id="lastname"
                            name="user.lastname"
                            onChange={formik.handleChange}
                            value={formik.values.user.lastname}
                        />
                        <Error>{formik.errors.user && formik.errors.user.lastname}</Error>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Input
                            $danger={formik.touched.user && formik.errors.user && formik.errors.user.email}
                            type="text"
                            id="email"
                            name="user.email"
                            onChange={formik.handleChange}
                            value={formik.values.user.email}
                        />
                        <Error>{formik.errors.user && formik.errors.user.email}</Error>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Phone number</Form.Label>
                        <Input
                            $danger={formik.touched.user && formik.errors.user && formik.errors.user.phoneNumber}
                            type="text"
                            id="phoneNumber"
                            name="user.phoneNumber"
                            onChange={formik.handleChange}
                            value={formik.values.user.phoneNumber}
                        />
                        <Error>{formik.errors.user && formik.errors.user.phoneNumber}</Error>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Gender</Form.Label>
                        <Select
                            name="user.gender"
                            value={formik.values.user.gender}
                            onChange={e => formik.setFieldValue('user.gender', e.target.value)}
                        >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </Select>
                        <Error>{formik.errors.user && formik.errors.user.gender}</Error>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Date of birth</Form.Label>
                        <Input
                            $danger={formik.touched.user && formik.errors.user && formik.errors.user.dateOfBirth}
                            type='date'
                            id="dateOfBirth"
                            name="user.dateOfBirth"
                            onChange={formik.handleChange}
                            value={formik.values.user.dateOfBirth}
                        />
                        <Error>{formik.errors.user && formik.errors.user.dateOfBirth}</Error>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Input
                            $danger={formik.touched.password && formik.errors.user && formik.errors.username}
                            type="text"
                            name="username"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />
                        <Error>{formik.errors.username && formik.errors.username}</Error>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Input
                            $danger={formik.touched.password && formik.errors.user && formik.errors.password}
                            type="text"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />

                        <Error>{formik.errors.password && formik.errors.password}</Error>
                    </Form.Group>
                </Col>
            </Row>
            <div className="pt-3 w-full d-flex flex-row justify-content-end">
                <Button className="mt-2" type="submit">Register</Button>
            </div>
        </Form >
    );
}

export default RegisterForm;
