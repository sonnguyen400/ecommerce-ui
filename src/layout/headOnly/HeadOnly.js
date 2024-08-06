import { useState } from "react";
import CategoryBar from "../../part/user/category-bar/CategoryBar.js";
import Header from "../../part/user/header/header.js";
import style from './style.module.scss';
import { Layout, Row, Space } from "antd";
import useDevice from "../../hooks/useDevice.js";
import clsx from "clsx";
function HeadOnly({ children }) {
    const device = useDevice();
    const [category, setCategory] = useState(device !== "MOBILE");
    return (
        <Layout>
            <Layout.Header style={device === "MOBILE" ? { padding: "8px" } : {}} className={style.header} >
                <Header />
                <Space align="center" className={clsx(style.categoryToggle, category ? style.active : "")} onClick={() => { setCategory(state_ => !state_) }}><i className="fi fi-br-menu-burger"></i></Space>
            </Layout.Header>
            <Layout.Content >
                <CategoryBar className={clsx(style.category, category ? style.display : " ")} />
                <Row className={style.container}>
                    {children}
                </Row>
            </Layout.Content>
        </Layout>);
}

export default HeadOnly;