
import { useFormik } from "formik";
import * as Yup from "yup";
import APIBase from "../../api/ApiBase";
import clsx from "clsx";
import { Error } from "../../components/form-component";
import google from "../../assets/image/google.png";
import facebook from "../../assets/image/facebook.png";
import apple from "../../assets/image/apple.png";
import github from "../../assets/image/github.png";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
import { Description } from "../../components/description";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context";
import { Col, Row, Input, Button } from "antd";
import PrefixIcon from "../../components/prefix-icon/PrefixIcon.js";
const handleGoogleLogin = async () => {
    try {
        // Make a request to the backend server to initiate the Google OAuth2 flow
        const response = await APIBase.get('/auth/google');
        window.location.href = response.data.redirectUrl;
    } catch (error) {
        console.error('Error initiating Google login:', error);
    }
};
function LoginForm({ className, success }) {
    const globalContext = useContext(GlobalContext);
    const [loginMessage, setLoginMessage] = useState(undefined);
    function refresh() {
        APIBase.get("refresh").catch(console.log).then(console.log);
    }
    function getUser() {
        return APIBase.get("auth/user", {
            headers: { credentials: "include" },
        });
    }
    function logout() {
        APIBase.post("/logout").catch(console.log).then(console.log);
    }
    const authObject = Yup.object().shape({
        username: Yup.string().required("Username can be blank"),
        password: Yup.string()
            .min(6, "Password is too short")
            .required("Required"),
    });
    const formik = useFormik({
        validateOnBlur: true,
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: (values) => {
            globalContext.loader("");
            APIBase.post("login", JSON.stringify(values), {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    credentials: "include",
                },
            })
                .then(() => getUser())
                .then((payload) => payload.data)
                .then((data) => {
                    globalContext.authentication = data;
                    success();
                })
                .catch((error) => {
                    setLoginMessage("Error");
                })
                .finally(() => {
                    globalContext.loader(false);
                });
        },
        validationSchema: authObject,
    });
    return (
        <div className={clsx("w-100", className)}>
            <form noValidate onSubmit={formik.handleSubmit}>
                {loginMessage && <Error>{loginMessage}</Error>}

                <Row gutter={[0, 24]} justify={"center"}>
                    <Col span={24} >
                        <Input
                            prefix={<PrefixIcon><i className="fi fi-rr-user"></i></PrefixIcon>}
                            size="large"
                            status={(formik.errors.user && formik.errors.username) ? "error" : ""}
                            type="text"
                            name="username"
                            placeholder="User Name"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            onBlur={formik.handleBlur}
                        />
                        <Error>{formik.errors.username && formik.errors.username}</Error>
                    </Col>
                    <Col span={24} >
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
                            <Col className={style.loginBtn}><Button htmlType="submit" type="primary">Login</Button></Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Description className="">
                            Don't have an account yet? <Link to='/register'>Register</Link>
                        </Description>
                    </Col>
                    <Col span={24}><Description>Or login with</Description></Col>
                    <Col span={16}>
                        <Row>
                            <Col span={6}>
                                <Button type="text"
                                    icon={<PrefixIcon><img style={{ width: "100%" }} src={google} alt="Login with google" /></PrefixIcon>}
                                    href="http://localhost:8085/oauth2/authorize/google" />
                            </Col>

                            <Col span={6}>
                                <Button type="text"
                                    icon={<PrefixIcon> <img style={{ width: "100%" }} src={facebook} alt="Login with facebook" /></PrefixIcon>}
                                    href="http://localhost:8085/oauth2/authorize/google" />

                            </Col>
                            <Col span={6}>
                                <Button type="text"
                                    icon={<PrefixIcon> <img style={{ width: "100%" }} src={github} alt="Login with github" /></PrefixIcon>}
                                    href="http://localhost:8085/oauth2/authorize/google" />
                            </Col>
                            <Col span={6}>
                                <Button type="text"
                                    icon={<PrefixIcon><img style={{ width: "100%" }} src={apple} alt="Login with apple" /></PrefixIcon>}
                                    href="http://localhost:8085/oauth2/authorize/google" />
                            </Col>
                        </Row>
                    </Col>
                </Row>





            </form>
            <Button type="primary" onClick={refresh}> refresh</Button>
            <Button onClick={logout}> Logout</Button>
            {/* 
                    <Button onClick={getUser}> user</Button>
                     */}
        </div>
    );
}

export default LoginForm;
