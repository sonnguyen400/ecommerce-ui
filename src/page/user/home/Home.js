import { Row, Col, Space } from "antd";
import UserCarousel from "../../../part/user/carousel/Carousel";
import ProductCard from "../../../components/product-card/ProductCard";
import { useEffect, useState } from "react";
import APIBase from "../../../api/ApiBase";
import style from "./style.module.scss";
function Home() {
    const [products, setProducts] = useState(undefined);
    useEffect(() => {
        APIBase.get("api/v1/product").then(payload => {
            setProducts(payload.data);
            console.log(payload.data)
            return payload.data;
        }).catch(err => err)
    }, [])
    return (<Row justify="center">
        <Col span={24}><UserCarousel className={style.carousel} /></Col>
        <Col span={24}>
            <Space style={{ paddingTop: "16px" }} />
        </Col>
        <Col span={24} style={{ marginTop: "16px" }}>
            <Row gutter={16}>
                {products && products.content.map((product, index) =>
                    <Col span={12} lg={{ span: 4 }} key={index} className="p-1" >
                        <ProductCard >{product}</ProductCard>
                    </Col>)}
            </Row>
        </Col>
    </Row>);
}

export default Home;