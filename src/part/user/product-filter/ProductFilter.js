import { Row, Col, Select } from "antd";
function ProductFilter() {
    return (<Row gutter={[12, 12]}>
        <Col span={12} lg={{ span: 6 }} >
            <Select
                options={[
                    {
                        label: "0-2.000.000",
                        value: "0-2.000.000",
                    },
                    {
                        label: "2.000.000-5.000.000",
                        value: "2.000.000-5.000.000"
                    },
                    {
                        label: "5.000.000-10.000.000",
                        value: "5.000.000-10.000.000",
                    },
                    {
                        label: "10.000.000-15.000.000",
                        value: "10.000.000-15.000.000",
                    },
                    {
                        label: "15.000.000-20.000.000",
                        value: "15.000.000-20.000.000",
                    },
                    {
                        label: "20.000.000-30.000.000",
                        value: "20.000.000-30.000.000",
                    },
                    {
                        label: "Above 30.000.000",
                        value: "30.000.000",
                    }
                ]}
            />
        </Col>
    </Row>);
}

export default ProductFilter;