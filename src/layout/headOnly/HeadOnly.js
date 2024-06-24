import clsx from "clsx";
import CategoryBar from "../../part/category-bar/CategoryBar";
import Header from "../../part/header/user/header";
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