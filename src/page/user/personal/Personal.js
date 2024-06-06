import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import UserInfor from "../../../part/user-infor/UserInfor";
function Personal() {
    const user = useSelector((state) => state.user);
    return (<Row gutter={[{ sm: 12, lg: 24 }, { sm: 12, lg: 24 }]}>
        <Col span={24} lg={{ span: 8 }}>
            <UserInfor />
        </Col>
        <Col span={24} lg={{ span: 16 }}></Col>
    </Row>);
}

export default Personal;