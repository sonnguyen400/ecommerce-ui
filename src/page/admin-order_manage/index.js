import { Card, Row, Col, Table, List, Collapse, Select, Button, Tag, Modal, Input, Flex, notification, Pagination } from "antd";
import { useEffect, useState } from "react";
import APIBase from "../../api/ApiBase";
import { useSelector } from "react-redux";
import { useFormik } from "formik";

function OrderHeader({ data }) {
    const [modal, setModal] = useState(false);
    const [context, notifCOntext] = notification.useNotification();
    const [status, setSelectStatus] = useState({
        status: data.status[0].status
    });
    function onChangeStatus(e) {
        setSelectStatus(status => {
            status.status = e;
            return status;
        });
        setModal(true);
    }
    const formik = useFormik({
        initialValues: status,
        onSubmit: (data_) => {
            APIBase.post(`api/v1/order/${data.id}/status`, data_)
                .then(payload => {
                    data.status.push(payload.data);
                    notification.success({
                        message: "Success",
                        description: "Successfully update order status"
                    })
                })
                .catch(error => {
                    notification.error({
                        message: "Error",
                        description: "Error while update order status"
                    })
                })
        }
    })
    return <><Row>
        <Col span={4}>{data.user.firstname + " " + data.user.lastname}</Col>
        <Col span={2}>{data.user.phoneNumber}</Col>
        <Col span={6}>{data.address.addressLine1}</Col>
        <Col span={2}>{data.shippingMethod.name}</Col>
        <Col span={2}>{data.total}</Col>
        <Col span={5}>
            <Row>
                <Col span={12}>
                    <Select style={{ width: "100%" }} onChange={onChangeStatus} value={data.status[data.status.length - 1].status}>
                        <Select.Option value="PENDING" ><Tag color="cyan">PENDING</Tag></Select.Option>
                        <Select.Option value="PREPARING" ><Tag color="green">PREPARING</Tag></Select.Option>
                        <Select.Option value="DELIVERING" ><Tag color="lime">DELIVERING</Tag></Select.Option>
                        <Select.Option value="CANCEL"><Tag color="red">CANCEL</Tag></Select.Option>
                        <Select.Option value="RETURN"><Tag color="volcano">RETURN</Tag></Select.Option>
                        <Select.Option value="EXCHANGE"><Tag color="magenta">EXCHANGE</Tag></Select.Option>
                    </Select>
                </Col>
                <Col span={6}>
                    <Button type="link">Details</Button>
                </Col>

            </Row>
        </Col>
    </Row>
        <Modal footer={null} open={modal} onCancel={() => setModal(false)} title={<Row><span style={{ marginRight: "5px" }}>Update Order Status to </span> {status.status}</Row>}>
            <form onSubmit={formik.handleSubmit}>
                <Row gutter={[24, 24]}>
                    <Col span={24}>
                        <Input.TextArea onChange={formik.handleChange} value={formik.values.detail} placeholder="detail" name="detail" />
                    </Col>
                    <Col span={24}>
                        <Input.TextArea onChange={formik.handleChange} value={formik.values.note} placeholder="note" name="note" />
                    </Col>
                    <Col span={24}>
                        <Flex justify="end"><Button type="primary" htmlType="submit">Submit</Button></Flex>
                    </Col>
                </Row>

            </form>
        </Modal>
    </>
}

function OrderItem({ data }) {
    return <Row>
        {data.orderLines.map((item, key) => (<Col key={key} span={24}>
            <Row align="middle" gutter={4}>
                <Col span={1}><img style={{ width: "100%" }} src={item.productItem.product.picture} /></Col>
                <Col span={3}>{item.productItem.product.name}</Col>
                <Col span={2}>{item.productItem.price}</Col>
                <Col>{item.productItem.options.map((value, index) => value.value).join(",")}</Col>
                <Col span={1}>{item.qty}</Col>
                <Col span={1}>{item.total}</Col>
            </Row>
        </Col>))}
    </Row>
}
function AdminOrderManage() {
    const [data, setData] = useState(undefined);
    const [items, setItems] = useState([])
    const [page, setPage] = useState({ page: 0, size: 10 })
    useEffect(() => {
        APIBase.get(`/api/v1/order?page=${page.page}&size=${page.size}`)
            .then(payload => payload.data)
            .then(data => {
                setData(
                    data.map((value, index) => ({
                        key: index,
                        label: <OrderHeader data={value} />,
                        children: <OrderItem data={value} />
                    }))
                )
            }, [])
            .catch(console.log)
    }, [page])
    function onPageChange([page, size]) {
        setPage(page_ => ({
            page: page - 1,
            size: size
        }));

    }
    return (<Row>
        <Col span={24}>
            <Card title="Order">
                <Row justify="end">
                    <Col span={24}><Collapse collapsible="icon" items={data} accordion /></Col>
                    <Col span={10} style={{ marginTop: "20px" }}><Pagination onChange={(page, size) => { onPageChange([page, size]) }} defaultCurrent={1} total={500} /></Col>
                </Row>;
            </Card>
        </Col>
    </Row>);

}

export default AdminOrderManage;