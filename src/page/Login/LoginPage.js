import { Row, Col, Card, Flex } from "antd";
import LoginForm from "../../part/login-form/login-form";
import style from "./style.module.scss";
import { Description } from "../../components";
import { useNavigate } from "react-router-dom";
import useAuth from "../../secure/useAuth";
function LoginPage() {
    const navigate = useNavigate();
    const [state, user, hasRole] = useAuth();
    return (
        <Row justify="center" style={{ height: "100vh" }} align="middle">
            <Col span={24} lg={{ span: 12 }}>
                <Row justify="center" align="center" className={style.formContainer}>
                    <Card>
                        <Col>
                            <Col className={style.header}>
                                <h2>Login</h2>
                                <Description>
                                    Login to your account
                                </Description>
                            </Col>
                            <LoginForm
                                success={() => {
                                    if (navigate("ADMIN")) navigate("/admin");
                                    if (hasRole("USER")) navigate("/");
                                }}
                            />
                        </Col>
                    </Card>
                </Row>
            </Col>
        </Row>
    );
}

export default LoginPage;
