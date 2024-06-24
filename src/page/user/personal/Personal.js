import { Col, Row, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import UserInfor from "../../../part/user-infor/UserInfor";
import PrefixIcon from "../../../components/prefix-icon/PrefixIcon";
import Logout from "../../../part/logout/Logout";
import { useContext, useState } from "react";
import UpdateUserForm from "../../../part/update-user-form/UpdateUserForm";
import APIBase from "../../../api/ApiBase";
import { fetchUser } from "../../../store/user/userSlide";
import { GlobalContext } from "../../../context";
function Personal() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [modal, setModal] = useState(false);
    const globalContext = useContext(GlobalContext);
    function onUpdateUser(data) {
        APIBase.put(`/api/v1/user/${user.id}`, data).then(payload => {
            dispatch(fetchUser)
        }).catch(e => {
            console.log(e);
        })
    }
    return (
        <>
            <Modal title="Update Personal information" footer={null} open={modal} onCancel={() => { setModal(false) }}>
                <UpdateUserForm user={user} onSubmit={onUpdateUser} />
            </Modal>
            <Row gutter={[{ sm: 12, lg: 24 }, { sm: 12, lg: 24 }]}>
                <Col span={24} lg={{ span: 8 }}>
                    <UserInfor user={user} />
                    <Row gutter={[0, 16]} style={{ padding: "16px 0px" }}>
                        <Col span={24}><Button onClick={() => { setModal(true) }} icon={<PrefixIcon><i style={{ color: "white" }} className="fi fi-rr-edit"></i></PrefixIcon>} type="primary" block>Update</Button></Col>
                        <Col span={24}><Logout trigger={<Button icon={<PrefixIcon></PrefixIcon>} type="primary" block danger>Logout</Button>} /></Col>
                        <Col span={24}><Button type="primary" block danger>Inactive</Button></Col>
                    </Row>
                </Col>
                <Col span={24} lg={{ span: 16 }}></Col>
            </Row>
        </>

    );
}

export default Personal;