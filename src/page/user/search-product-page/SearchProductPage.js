import { Col, Row, Select } from "antd";
import { useSearchParams } from "react-router-dom";
import ProductFilter from "../../../part/user/product-filter/ProductFilter";

function SearchProductPage() {
    const [params, setParams] = useSearchParams();

    return (
        <Row gutter={[16, 16]}>
            <Col span={16} >
                <ProductFilter />
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
        </Row>);
}

export default SearchProductPage;