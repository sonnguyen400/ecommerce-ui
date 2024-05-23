import { Card, CardBody, Col, Container } from "react-bootstrap";
import RegisterForm from "../../part/register-form";
import APIBase from "../../api/ApiBase";
import { useContext, useState } from "react";
import { Error } from "../../components/form-component";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import styled from "styled-components";
const MiddleDiv = styled.div`
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
`
function Register() {
    const [error, setError] = useState(false);
    const globalContext = useContext(GlobalContext);
    const navigate = useNavigate();
    function onSubmit(data) {
        globalContext.loader("")
        APIBase.post("/register", data)
            .then((payload) => {
                globalContext.loader("Register successfully<br>Redirect in 3 seconds");
                setTimeout(() => {
                    navigate("/login")
                    globalContext.loader(false);

                }, 3000)
            })
            .catch(e => {
                console.log(e);
                setError("Error while loading")
            });
    }
    return (
        <Container fluid>
            <MiddleDiv className="col col-sm-1 col-md-6 col-lg-4">
                <Card className="col">
                    <CardBody>
                        <h2 className="pb-4 text-center">Register</h2>
                        {error && <Error>{error}</Error>}
                        <RegisterForm onSubmit={onSubmit} />
                    </CardBody>
                </Card>
            </MiddleDiv>
        </Container>
    );
}

export default Register;
