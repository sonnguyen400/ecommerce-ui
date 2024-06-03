import { Row, Col } from "antd";
import UserCarousel from "../../../part/carousel/Carousel";
import ProductCard from "../../../components/product-card/ProductCard";
import { useEffect, useState } from "react";
import APIBase from "../../../api/ApiBase";
function Home() {
    const [products, setProducts] = useState(null);
    useEffect(() => {
        APIBase.get("api/v1/product").then(payload => {
            setProducts(payload.data);
            return payload.data;
        }).catch(err => err)
    }, [])
    return (<div fluid>
        <UserCarousel />
        <div className="mt-5">
            <Row className="gx-1">
                {products && products.map((product, index) =>
                    <Col key={index} className="p-1" >
                        <ProductCard >{product}</ProductCard>
                    </Col>)}
            </Row>
        </div>
    </div>);
}

export default Home;