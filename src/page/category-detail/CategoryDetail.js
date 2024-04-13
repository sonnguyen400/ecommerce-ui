import { useContext, useEffect, useState } from "react";
import { CardBody, Button, CardSubtitle, CardTitle, Col, Row, Tab, Tabs,Modal, ModalHeader, ModalBody,ListGroup, ModalDialog } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import APIBase from "../../api/ApiBase";
import CategoryList from "../../part/category-list/CategoryList";
import ProductListBigIcon from "../../part/product-list-bigicon/product-list-big-icon";
import ProductAddForm from "../../part/product/product-add-form";
import { AppLoader } from "../../context/loader";
import CategoryAddModal from "../../part/category/modal";
function CategoryDetail() {
    const loader=useContext(AppLoader);
    const [urlParams, setUrlParams] = useSearchParams();
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [products,setProducts]=useState(null);
    const [productDiag,setProductDiag]=useState(false);
    const [categoryDiag,setCategoryDiag]=useState(false);

    function addNestedCategory(child){
        setData(data=>{
            data.children.push(child);
            return data;
        })
    }
    useEffect(() => {
        if (id !== undefined) {
            try {
                const id_parms = encodeURIComponent(id);
                APIBase.get(`api/v1/category/${id_parms}`)
                    .then(payload => { setData(payload.data); })
                    .catch(console.log)
                APIBase.get(`api/v1/category/${id_parms}/product`)
                    .then(payload=>setProducts(payload.data))
                    .catch(console.log);
            } catch {

            }

        }
    }, [id])
    function addProduct(product){
        loader(" ");
        APIBase.post("api/v1/product",product)
            .then(console.log)
            .catch(console.log)
            .finally(()=>{
                loader("");
                setProductDiag(false);
                setProducts(data=>{
                    data.push(product);
                    return data;
                })
            })
    }
    return (data &&
        <CardBody>
            <CardTitle>{data.name}</CardTitle>
            
            <Tabs
                defaultActiveKey={"Products"}
                className="mt-5"
            >
                <Tab eventKey="Products" title="Products" >
                    <Col className="py-3"><Button onClick={()=>{setProductDiag(true)}}>Add Product</Button></Col>
                    <CardBody>
                        <CardSubtitle>Product List</CardSubtitle>
                        {products&&<ProductListBigIcon>{products}</ProductListBigIcon>}
                    </CardBody>
                    <Modal size="lg"  show={productDiag} onHide={()=>{setProductDiag(false)}}>
                            <ModalHeader closeButton>Add new product</ModalHeader>
                            <ModalBody>
                                <ProductAddForm submitHandler={addProduct} defaultCategory={data}/>
                            </ModalBody>
                    </Modal>
                </Tab>
                <Tab eventKey="Properties" title="Properties" >
                    <CardBody>
                        <ListGroup>
                            {Array.isArray(data.variations)&&data.variations.map(variation=><ListGroup.Item>{variation.name}</ListGroup.Item>)}
                        </ListGroup>
                    </CardBody>
                </Tab>
                <Tab eventKey="NestedCategory" title="Nested Categories" >
                    <Col className="py-3" onClick={()=>setCategoryDiag(true)}><Button>Add Nested Category</Button></Col>
                    <CardBody>
                        {Array.isArray(data.children)&&<CategoryList>{data.children}</CategoryList>}
                    </CardBody>
                    {data&&<CategoryAddModal state={categoryDiag} setState={setCategoryDiag} parent={data} addNestedCategory={addNestedCategory}/>}
                </Tab>
            </Tabs>
            
        </CardBody>);
}

export default CategoryDetail;