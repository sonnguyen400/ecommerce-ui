import { Alert, Card, Col, Row, message } from "antd";
import RegisterForm from "../../part/register-form";
import APIBase from "../../api/ApiBase";
import { useContext, useEffect, useState } from "react";
import { Error } from "../../components/form-component";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import styled from "styled-components";
const MiddleDiv = styled.div`
    width: 100%;
    height: 100vh;
    display:flex;
    align-items: center;
    justify-content: center;
`
function Register() {
    const [error, setError] = useState(false);
    const globalContext = useContext(GlobalContext);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    function onSubmit(data) {
        globalContext.loader("")
        APIBase.post("/register", data)
            .then((payload) => {
                navigate("/login");
            })
            .catch(e => {
                setError(e.response.data.message)
            }).finally(() => {
                globalContext.loader(false)
            });
    }
    return (
        <Row justify={"center"} style={{ margin: "5rem 0px" }}>
            <Col span={24} md={16} lg={{ span: 10 }}>
                <Card>
                    <Row justify={"center"} gutter={[24, 24]}>
                        <Col span={24}><h2 style={{ textAlign: "center" }}>Register</h2></Col>
                        {error && <Col span={24}><Alert type="error" description={error}></Alert></Col>}
                        <Col span={24}><RegisterForm onSubmit={onSubmit} /></Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
}

export default Register;
