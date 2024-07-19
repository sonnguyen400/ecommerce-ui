import { Col, Flex, Pagination, Row, Select } from "antd";
import { useSearchParams } from "react-router-dom";
import ProductFilter from "../../../part/user/product-filter/ProductFilter";
import { useContext, useEffect, useState } from "react";
import APIBase from "../../../api/ApiBase";
import ProductCard from "../../../components/product-card/ProductCard";
import { GlobalContext } from "../../../context";

function SearchProductPage() {
    const [urlParams, setUrlParams] = useSearchParams();
    const [data, setData] = useState(undefined);
    const globalContext = useContext(GlobalContext);
    useEffect(() => {
        var apiParam = new URLSearchParams(urlParams);
        APIBase.get(`/api/v1/product?${apiParam.toString()}`)
            .then(payload => payload.data)
            .then(setData)
            .catch(e => {
                console.log(e)
                globalContext.message.error("Error while fetching products");
            })
    }, [urlParams])

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <h2>Search Result</h2>
            </Col>
            <Col span={16} style={{ overflowX: "scroll" }}>
                <ProductFilter onFilter={params_ => {
                    setUrlParams(urlSearchParams_ => {
                        params_.entries().forEach(([key, value]) => {
                            if (value) urlSearchParams_.set(key, value);
                            else urlSearchParams_.delete(key);
                        });
                        return urlParams;
                    })
                }} />
            </Col>
            <Col span={8}>
                <Select
                    options={[
                        {
                            label: "From Top",
                            value: 1,
                        }, {
                            label: "From Bottom",
                            value: 2
                        }
                    ]}
                />
            </Col>
            <Col span={24}>
                <Row>
                    {data?.content && data.content.map((product_, index) => <Col key={index} span={12} md={{ span: 6 }} lg={{ span: 4 }} ><ProductCard data={product_} /></Col>)}
                </Row>
            </Col>
            <Col span={24}>
                {data && <Flex justify="end"><Pagination pageSize={data.pageable.pageSize} current={data.pageable.pageNumber + 1} /></Flex>}
            </Col>
        </Row>);
}

export default SearchProductPage;