import { Row, Col, Space, Card } from "antd";
import UserCarousel from "../../../part/user/carousel/Carousel";
import ProductCard from "../../../components/product-card/ProductCard";
import { useEffect, useState } from "react";
import APIBase from "../../../api/ApiBase";
import style from "./style.module.scss";
function Home() {
    const [newests, setNewests] = useState({ content: [] });
    const [accessories, setAccessories] = useState({ content: [] });
    useEffect(() => {
        APIBase.get("api/v1/product?orderBy=id&order=DESC&page=0&size=6").then(payload => {
            setNewests(payload.data);
        }).catch(console.log)
        APIBase.get("api/v1/product?orderBy=id&order=DESC&page=0&size=6&category=7").then(payload => {
            setAccessories(payload.data);
        }).catch(console.log)

    }, [])
    return (<Row justify="center" gutter={[16, 16]}>
        <Col span={24}><UserCarousel className={style.carousel} /></Col>
        <Col span={24}>
            <Card title="New Items">
                <Row className={style.category} gutter={[15, 15]} style={{ overflowX: "scroll" }}>{newests.content.map((product_, index) => <Col span={12} md={{ span: 6 }} lg={{ span: 4 }} key={index}><ProductCard className={style.productCard} data={product_} /></Col>)}</Row>
            </Card>
        </Col>
        <Col span={24}>
            <Card title="Interesting Accessories">
                <Row className={style.category} gutter={[15, 15]} style={{ overflowX: "scroll" }}>{accessories.content.map((product_, index) => <Col span={12} md={{ span: 6 }} lg={{ span: 4 }} key={index}><ProductCard className={style.productCard} data={product_} /></Col>)}</Row>
            </Card>
        </Col>
        <Col span={24}>
            <Card title="Interesting Accessories">
                <Row className={style.category} gutter={[15, 15]} style={{ overflowX: "scroll" }}>{accessories.content.map((product_, index) => <Col span={12} md={{ span: 6 }} lg={{ span: 4 }} key={index}><ProductCard className={style.productCard} data={product_} /></Col>)}</Row>
            </Card>
        </Col>
    </Row>);
}

export default Home;