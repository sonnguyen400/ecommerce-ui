import { Card, Col } from "antd";
import RegisterForm from "../../part/register-form";
import APIBase from "../../api/ApiBase";
import { useContext, useState } from "react";
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
                setError(e);
                globalContext.loader(false);
            });
    }
    return (
        <div fluid>
            <MiddleDiv>
                <Col >
                    <Card>
                        <h2 className="pb-4 text-center">Register</h2>
                        {error && <Error>{error}</Error>}
                        <RegisterForm onSubmit={onSubmit} />
                    </Card>
                </Col>
            </MiddleDiv>
        </div>
    );
}

export default Register;
