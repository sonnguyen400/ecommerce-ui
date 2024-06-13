import { Row, Col, Card, Flex } from "antd";
import LoginForm from "../../part/login-form/login-form";
import image from "../../assets/image/signupBg.jpg";
import style from "./style.module.scss";
import clsx from "clsx";
import { Description } from "../../components/description";
import { useNavigate } from "react-router-dom";
import { Container } from "../../components/Container/Container";
function LoginPage() {
    const navigate = useNavigate();
    return (
        <Row>
            <Col span={24} lg={{ span: 12 }}>
                <Row justify="center" align="center" className={style.formContainer}>
                    <Col
                        sm={{ flex: "0 0 0" }}
                        md={{ flex: "1 0 30%" }}
                        className={clsx(style.formBg, "col-xs-0")}
                    >
                        <img src={image} alt="bg" />
                    </Col>
                    <Col
                        sm={{ flex: "1 0 100%" }}
                        md={{ flex: "1 0 60%" }}
                        className="m-0 p-0"
                    >
                        <Card className="h-100">
                            <Col>
                                <Col className={style.header}>
                                    <h2>Login</h2>
                                    <Description className="d-block w-100 text-center">
                                        Login to your account
                                    </Description>
                                </Col>
                                <LoginForm
                                    success={() => {
                                        navigate("/");
                                    }}
                                />
                            </Col>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default LoginPage;
