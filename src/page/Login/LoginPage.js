import { Container, Row, Col, Card, CardBody } from "react-bootstrap";
import LoginForm from "../../part/login-form/login-form";
import image from "../../assets/image/signupBg.jpg";
import styled from "styled-components";
import style from "./style.module.scss";
import clsx from "clsx";
import { Description } from "../../components/description";
import { useNavigate } from "react-router-dom";
function LoginPage() {
    const navigate = useNavigate();
    return (
        <Container fluid className="vh-100">
            <Row className="justify-content-center h-100 align-items-center">
                <Col md={8} lg={6} className="align-items-center h-xs-full">
                    <Row className={clsx(style.formContainer, "p-0 m-0 w-0")}>
                        <Col
                            sm={0}
                            lg={3}
                            className={clsx(style.formBg, "col-xs-0")}
                        >
                            <img src={image} alt="bg" />
                        </Col>
                        <Col sm={1} lg={9} className="m-0 p-0">
                            <Card className="h-100">
                                <CardBody>
                                    <h2 className="text-center pb-2">Login</h2>
                                    <Description className="d-block w-100 text-center">
                                        Login to your account
                                    </Description>
                                    <LoginForm
                                        success={() => {
                                            navigate("/");
                                        }}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;
