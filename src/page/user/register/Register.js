import { Alert, Card, Col, Row } from "antd";
import RegisterForm from "../../../part/user/register-form";
import APIBase from "../../../api/ApiBase";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../context";
function Register() {
    const [error, setError] = useState(false);
    const globalContext = useContext(GlobalContext);
    const navigate = useNavigate();
    function onSubmit(data) {
        globalContext.loader(true)
        APIBase.post("/register", data)
            .then((payload) => {
                globalContext.message.success("Registered successfully")
                navigate("/login");
            })
            .catch(e => {
                globalContext.message.error(e.response.data.message)
            }).finally(() => {
                globalContext.loader(false)
            });
    }
    return (
        <Row justify={"center"} align="center" style={{ height: "100vh" }} >
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
