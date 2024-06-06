
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
import PrefixIcon from "../../components/input-prefix-icon/PrefixIcon";

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

                <Row gutter={[0, 24]}>
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
                </Row>

                <Row justify="end">
                    <Col className={style.loginBtn}><Button htmlType="submit" type="primary">Login</Button></Col>
                </Row>
                <div className="pt-5">
                    <Description>Login with</Description>
                </div>
                <div className={style.loginWith}>
                    <div>
                        <img src={google} alt="Login with google" />
                    </div>
                    <div>
                        <img src={facebook} alt="Login with facebook" />
                    </div>
                    <div>
                        <img src={github} alt="Login with github" />
                    </div>
                    <div>
                        <img src={apple} alt="Login with apple" />
                    </div>
                </div>
                <Description className="">
                    Don't have an account yet? <Link to='/register'>Register</Link>
                </Description>
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
