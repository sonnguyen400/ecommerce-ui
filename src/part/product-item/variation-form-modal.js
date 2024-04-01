import React, { lazy, useContext, useEffect, useRef, useState } from "react";
import { FieldArray, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import {
    Button,
    Container,
    Row,
    Form,
    FormLabel,
    FormControl,
    Col,
    FormGroup,
    CardTitle,
    Toast,
    ToastContainer
} from "react-bootstrap";
import { AppLoader } from "../../context/loader";
import APIBase from "../../api/ApiBase";
function VariationForm({submitHandler,onCancel,product}) {
    const [formState, setFormState] = useState(true);
    const [variations,setVariations]=useState({});
    const loader=useContext(AppLoader);
    const [toastContent,setToast]=useState("");
    
    useEffect(()=>{
        APIBase.get(`/api/v1/category/${product.categoryId}/variation`).then(payload=>{setVariations(payload.data)});
    },[])
    // &&v?.variation?.name?.trim()!=null
    const validateSchema = Yup.object().shape({
        price:Yup.number(),
    });
    const formik = useFormik({
        initialValues: {
            image: "",
            variationOption:[]
        },
        validationSchema: validateSchema,
        onSubmit: (values) => {
            values.variationOption.forEach(variation_param=>{
                var match=variations.find(variation=>variation.name.trim().toLowerCase()===variation_param.variation.name.trim().toLowerCase())
                if(match) {
                    variation_param.variation.id=match.id;
                    variation_param.variation.name=match.name;
                    var matchOption=match.options.find(option=>{
                        return variation_param.value.trim().toLowerCase()===option.value.trim().toLowerCase()
                    });
                    if(matchOption) {
                        variation_param.id=matchOption.id;
                        variation_param.value=matchOption.value;
                    }
                }else{
                    Object.assign(variation_param,{
                        "category":{
                            "id":product.categoryId
                        }
                    })
                }
            })
            submitHandler(values);
        },
    });
    function addMoreVariationInput(arrayHelpers){
        let options=formik.values.variationOption;
        let isDuplicate=false;
        for(let i=options.length-2;i>=0;i--){
            if(options[i].variation.name.trim().toLowerCase()===options[options.length-1].variation.name.trim().toLowerCase()){
                isDuplicate=true;
                break;
            }
        }
        if(!isDuplicate) arrayHelpers.push({ variation:{name:""}, value: "" });
        else{
            setToast("Duplicate variation identifier");
        }
    }
    return (
        <div>
            <Container>
            <Toast onClose={()=>setToast("")} show={(!toastContent=="")} delay={3000} autohide >
                    <Toast.Header closeButton>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>{toastContent}</Toast.Body>
                </Toast>
                <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                    <h6 >
                        Product Item
                    </h6>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FormLabel>Image</FormLabel>
                                <FormControl
                                    type="file"
                                    name="image"
                                    onChange={(e) => {
                                        formik.setFieldValue("image", e.target.files[0]);
                                    }}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <FormLabel>Price</FormLabel>
                                <FormControl
                                    name="price"
                                    type="number"
                                    min={1}
                                    onChange={e=>{formik.setFieldValue("price",e.target.value)}}
                                    onBlur={e=>{formik.setFieldValue("price",e.target.value)}}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <h6 className="mt-5">
                        Variation
                    </h6>
                    <FieldArray
                        name="variationOption"
                        render={(arrayHelpers) => (
                            <div>
                                {formik.values.variationOption.map((option, index) => (
                                    <Row className="my-3" key={index}>
                                        <Col>
                                            <input
                                                className="form-control"
                                                type="text"
                                                list="variation"
                                                name={`variationOption[${index}].variation.name`}
                                                value={formik.values.variationOption[index].variation.name}
                                                onChange={e=>formik.setFieldValue(`variationOption[${index}]['variation']name`,e.target.value)}
                                            />
                                            <datalist id="variation">
                                                {variations.map((variation,idx)=><option key={idx} value={variation.name}/>)}
                                            </datalist>
                                        </Col>
                                        <Col>
                                            <FormControl
                                                name={`variationOption.${index}.value`}
                                                value={formik.values.variationOption[index].value}
                                                onChange={formik.handleChange}
                                            />
                                            
                                        </Col>

                                        
                                        {formik.errors.variationOption?<small className="text-danger">{formik.errors.variationOption}</small>:null}
                                        <Col>

                                            <Button
                                                variant=""
                                                type="button"
                                                onClick={() => arrayHelpers.remove(index)}
                                            >
                                                <i className="fi fi-rr-cross-small"></i>
                                            </Button>
                                        </Col>

                                    </Row>
                                ))}
                                
                                <Button
                                    type="button"
                                    onClick={() => addMoreVariationInput(arrayHelpers)}
                                    className="d-flex align-items-center mt-5"
                                >
                                    <span className="pt-1 icon"><i className="fi fi-br-plus "></i></span>
                                    <span>Add variation</span>
                                </Button>
                            </div>
                          )}
                    />

                    <Row className="justify-content-end">
                    <Col className="col-auto">
                            <Button
                                variant="outline-danger"
                                type="button"
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                        </Col>
                        <Col className="col-auto">
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={(values) => setFormState(values)}
                            >
                                Save
                            </Button>
                        </Col>
                        
                    </Row>
                </Form>
                </FormikProvider>
            </Container>
        </div>
    );
}

export default VariationForm;