import { Col, Row, Input, Button, Select } from "antd";
import { Error } from "../../components/form-component";
import * as Yup from "yup";
import { useFormik } from "formik";
import PrefixIcon from "../../components/prefix-icon/PrefixIcon";
function RegisterForm({ onSubmit, ...props }) {
    const schema = Yup.object().shape({
        username: Yup.string().required().min(6, "Username can't be blank"),
        password: Yup.string().required().min(6, "Password must at least 6 characters in length"),
        user: Yup.object().shape({
            firstname: Yup.string().required("first name cant be blank"),
            lastname: Yup.string().required("required"),
            dateOfBirth: Yup.string().required("required"),
            phoneNumber: Yup.string().required(),
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
        }
    }
    function submitHandler(data) {
        if (onSubmit) {
            onSubmit(data)
        }
    }
    const formik = useFormik({
        initialValues: initvalue,
        onSubmit: submitHandler,
        validationSchema: schema
    })
    return (
        <form onSubmit={formik.handleSubmit} >
            <Row gutter={[16, 32]}>
                <Col span={24} md={{ span: "12" }}>
                    <Input
                        size="large"
                        status={(formik.errors.user && formik.errors.user.firstname) ? "error" : ""}
                        type="text"
                        id="firstname"
                        name="user.firstname"
                        placeholder="First Name"
                        onChange={formik.handleChange}
                        value={formik.values.user.firstname}
                    />
                    <Error>{formik.errors.user && formik.errors.user.firstname}</Error>
                </Col>
                <Col span={24} md={{ span: "12" }}>
                    <Input
                        size="large"
                        status={(formik.errors.user && formik.errors.user.lastname) ? "error" : ""}
                        type="text"
                        id="lastname"
                        name="user.lastname"
                        placeholder="Last Name"
                        onChange={formik.handleChange}
                        value={formik.values.user.lastname}
                    />
                    <Error>{formik.errors.user && formik.errors.user.lastname}</Error>
                </Col>
                <Col span={24}>
                    <Input
                        prefix={<PrefixIcon><i className="fi fi-rr-envelope"></i></PrefixIcon>}
                        size="large"
                        status={(formik.errors.user && formik.errors.user.email) ? "error" : ""}
                        type="text"
                        id="email"
                        name="user.email"
                        placeholder="email"
                        onChange={formik.handleChange}
                        value={formik.values.user.email}
                    />
                    <Error>{formik.errors.user && formik.errors.user.email}</Error>
                </Col>
                <Col span={24}>
                    <Input
                        size="large"
                        prefix={<PrefixIcon><i className="fi fi-rr-phone-office"></i></PrefixIcon>}
                        status={(formik.errors.user && formik.errors.user.phoneNumber) ? "error" : ""}
                        type="text"
                        id="phoneNumber"
                        placeholder="Phone Number"
                        name="user.phoneNumber"
                        onChange={formik.handleChange}
                        value={formik.values.user.phoneNumber}
                    />
                    <Error>{formik.errors.user && formik.errors.user.phoneNumber}</Error>
                </Col>
                <Col span={24} md={{ span: "12" }}>
                    <Row>
                        <Select
                            size="large"
                            style={{ width: "100%" }}
                            name="user.gender"
                            placeholder="Gender"
                            value={formik.values.user.gender}
                            onChange={e => formik.setFieldValue('user.gender', e)}
                        >
                            <Select.Option value="Male"></Select.Option>
                            <Select.Option value="Female"></Select.Option>
                            <Select.Option value="Other"></Select.Option>
                        </Select>
                    </Row>
                    <Error>{formik.errors.user && formik.errors.user.gender}</Error>
                </Col>
                <Col span={24} md={{ span: "12" }} >
                    <Input
                        type="date"
                        size="large"
                        name="user.dateOfBirth"
                        placeholder="Date of Birth"
                        value={formik.values.user.dateOfBirth}
                        status={(formik.errors.user && formik.errors.user.dateOfBirth) ? "error" : ""}
                        onChange={(e) => { formik.setFieldValue('user.dateOfBirth', e.target.value) }}
                    />

                    <Error>{formik.errors.user && formik.errors.user.dateOfBirth}</Error>
                </Col>
                <Col span={24} md={{ span: "12" }}>
                    <Input
                        prefix={<PrefixIcon><i className="fi fi-rr-user"></i></PrefixIcon>}
                        size="large"
                        status={(formik.errors.user && formik.errors.username) ? "error" : ""}
                        type="text"
                        name="username"
                        placeholder="User Name"
                        onChange={formik.handleChange}
                    />
                    <Error>{formik.errors.username && formik.errors.username}</Error>
                </Col>
                <Col span={24} md={{ span: "12" }}>
                    <Input
                        prefix={<PrefixIcon><i className="fi fi-rr-lock"></i></PrefixIcon>}
                        size="large"
                        status={(formik.errors.user && formik.errors.password) ? "error" : ""}
                        type="text"
                        name="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />

                    <Error>{formik.errors.password && formik.errors.password}</Error>
                </Col>
                <Col span={24}>
                    <Row justify="end">
                        <Col><Button htmlType="submit" type="primary" className="mt-2">Register</Button></Col>
                    </Row>
                </Col>
            </Row>
        </form >
    );
}

export default RegisterForm;
