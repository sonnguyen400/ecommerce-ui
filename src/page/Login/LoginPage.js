import { Container,Row,Col } from "react-bootstrap";
import LoginForm from "../../part/login-form/login-form";


function LoginPage() {
    return ( <>
        <Container>
            <Row>
                <Col md={4}>
                    <LoginForm/>
                </Col>
            </Row>
        </Container>
    </> );
}

export default LoginPage;