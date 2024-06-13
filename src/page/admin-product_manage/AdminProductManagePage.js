import { Card, Row, Col, Pagination, message } from "antd";
import ProductFilter from "../../part/product-filter/ProductFilter";
import { useContext, useEffect, useState } from "react";
import APIBase from "../../api/ApiBase";
import { GlobalContext } from "../../context";
import { Link } from "react-router-dom";
var apiTimeout = undefined;
function AdminProductManage() {
    const [api, setApi] = useState("api/v1/product")
    const [page, setPage] = useState({ page: 0, size: 10 })
    const [filter, setFilter] = useState(undefined);
    const [products, setProducts] = useState(undefined);
    const globalContext = useContext(GlobalContext);
    const [loader, setLoader] = useState(true);
    function onFilter(value) {
        Object.keys(value).forEach(key => {
            if (!value[key]) delete value[key];
        })
        if (Array.isArray(value.category) && value.category.length == 2) {
            value.category = value.category[value.category.length - 1];
        }
        if (Object.keys(value).length > 0) setFilter(value);
        else setFilter(undefined);

    }
    useEffect(() => {
        if (filter) {
            setFilter(filter);
            var param = new URLSearchParams(filter);
            var pagination = new URLSearchParams(page);
            setApi(api => `api/v1/product/filter?${param.toString()}&${pagination.toString()}`);
        } else {
            setApi(api => `api/v1/product?page=${page.page}&size=${page.size}`)
        }
    }, [filter, page])
    useEffect(() => {
        if (!apiTimeout) {
            apiTimeout = setTimeout(() => {
                APIBase.get(api).then(payload => {
                    setProducts(payload.data)
                    setLoader(state => !state)
                }).catch(e => {
                    globalContext.message.error("Error");
                })
                apiTimeout = null;
            }, 1000)
        } else {
            clearTimeout(apiTimeout);
            apiTimeout = undefined;
        }
    }, [api])
    return (
        <Card title="Product Manage">
            <Row>
                <Col span={4}>
                    <ProductFilter onFilter={onFilter} />
                </Col>
                <Col span={20}>
                    <Card title="Product List">
                        <Col span={24}>
                            <Row>
                                {products && products.map((product_, index) =>
                                    <Col key={index} span={12} lg={{ span: 4 }}>
                                        <Link to={`/admin/product?id=${product_.id}`}>
                                            <Card cover={<img alt={product_.name} src={product_.picture} />} title={product_.name} hoverable={true}>
                                                <p>{product_.description}</p>
                                            </Card>
                                        </Link>
                                    </Col>
                                )}
                            </Row>
                            <Row justify="end">
                                <Pagination onChange={(page, size) => setPage({ page: page - 1, size: size })} defaultCurrent={1} total={500} />
                            </Row>
                        </Col>
                    </Card>
                </Col>
            </Row>
        </Card>);
}

export default AdminProductManage;