import CategoryBar from "../../part/user/category-bar/CategoryBar.js";
import Header from "../../part/user/header/header.js";
import style from './style.module.scss';
import { Layout, Row } from "antd";
function HeadOnly({ children }) {
    return (
        <Layout>
            <Header />
            <Layout.Content >
                <CategoryBar />
                <Row className={style.container}>
                    {children}
                </Row>
            </Layout.Content>
        </Layout>);
}

export default HeadOnly;