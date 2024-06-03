
import { useFormik } from "formik";
import * as Yup from "yup";
import APIBase from "../../api/ApiBase";
import clsx from "clsx";
import { Error, Input, Button } from "../../components/form-component";
import google from "../../assets/image/google.png";
import facebook from "../../assets/image/facebook.png";
import apple from "../../assets/image/apple.png";
import github from "../../assets/image/github.png";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
import { Description } from "../../components/description";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context";
import { Form } from "antd";

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
            <Form noValidate onSubmit={formik.handleSubmit}>
                {loginMessage && <Error>{loginMessage}</Error>}
                <div>
                    <label>Username</label>
                    <Input
                        danger={formik.errors.username}
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    ></Input>
                    {formik.errors.username && (
                        <Error>{formik.errors.username}</Error>
                    )}
                </div>
                <div>
                    <label>Password</label>
                    <Input
                        danger={formik.errors.password}
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    ></Input>
                    {formik.errors.password && (
                        <Error>{formik.errors.password}</Error>
                    )}
                </div>
                <div className="pt-3 w-full d-flex flex-row justify-content-end">
                    <Button type="submit">Login</Button>
                </div>
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
            </Form>
            <Button onClick={refresh}> refresh</Button>
            <Button onClick={logout}> Logout</Button>
            {/* 
                    <Button onClick={getUser}> user</Button>
                     */}
        </div>
    );
}

export default LoginForm;
