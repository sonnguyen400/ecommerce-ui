import Form from "react-bootstrap/Form";
import  Card from "react-bootstrap/Card";
import  CardBody from "react-bootstrap/CardBody";
import { FormControl, FormGroup, FormLabel,Button,Stack } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import APIBase from "../../api/ApiBase";
import axios from "axios";
import { API_CONTEXT } from "../../api/constant";
function LoginForm() {
    function refresh(){
        APIBase.get("refresh")
        .catch(console.log)
        .then(console.log)
    }
    function getUser(){
        APIBase.get("auth/user", { headers: { credentials: 'include'} }).then(console.log)
    }
    function logout(){
        APIBase.post("/logout").catch(console.log).then(console.log)
    }
    const authObject=Yup.object().shape({
        username:Yup.string().required("Username can be blank"),
        password:Yup.string().min(4,"Password is too short").required("Required")
    })
    const formik=useFormik({
        validateOnBlur:true,
        initialValues:{
            username:"",
            password:""
        },
        onSubmit:values=>{
            APIBase.post("login",JSON.stringify(values), {withCredentials: true , headers: { 'Content-Type': 'application/json' ,credentials: 'include'} }).then(
                
            ).catch(error=>{

            }).then((value)=>{
                
            });
        },
        validationSchema:authObject

    });
    return ( 
    <Card>
        <CardBody>
            <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Username" 
                        name="username" 
                        onChange={formik.handleChange} 
                        value={formik.values.username} 
                        isInvalid={formik.touched.username&&formik.errors.username}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                </Form.Group>
                <FormGroup>
                    <FormLabel>Password</FormLabel>
                    <FormControl 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        onChange={formik.handleChange} 
                        value={formik.values.password}
                        isInvalid={formik.touched.username&&formik.errors.password}
                    ></FormControl>
                    <FormControl.Feedback type="invalid">{formik.errors.password}</FormControl.Feedback>
                </FormGroup>
                <Stack className="my-3">
                    <Button type="submit">Login</Button>
                </Stack>
            </Form>
            <Button onClick={refresh} > refresh</Button>
            <Button onClick={getUser} > user</Button>
            <Button onClick={logout} > Logout</Button>
        </CardBody>
    </Card> );
}

export default LoginForm;