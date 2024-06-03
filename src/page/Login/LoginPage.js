import { Row, Col, Card } from "antd";
import LoginForm from "../../part/login-form/login-form";
import image from "../../assets/image/signupBg.jpg";
import style from "./style.module.scss";
import clsx from "clsx";
import { Description } from "../../components/description";
import { useNavigate } from "react-router-dom";
function LoginPage() {
    const navigate = useNavigate();
    return (
        <Row align="center">
            <div className={style.formContainer}>
                <Col
                    sm={0}
                    lg={3}
                    className={clsx(style.formBg, "col-xs-0")}
                >
                    <img src={image} alt="bg" />
                </Col>
                <Col sm={1} lg={9} className="m-0 p-0">
                    <Card className="h-100">
                        <h2 className="text-center pb-2">Login</h2>
                        <Description className="d-block w-100 text-center">
                            Login to your account
                        </Description>
                        <LoginForm
                            success={() => {
                                navigate("/");
                            }}
                        />
                    </Card>
                </Col>
            </div>
        </Row>
    );
}

export default LoginPage;
