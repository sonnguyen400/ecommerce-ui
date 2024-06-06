import clsx from "clsx";
import CategoryBar from "../../part/category-bar/CategoryBar";
import Header from "../../part/header/user/header";
import style from './style.module.scss';
import { Layout } from "antd";

function HeadOnly({ children }) {
    return (
        <Layout>
            <Header />
            <Layout.Content >
                <CategoryBar />
                <div className={style.container}>
                    {children}
                </div>
            </Layout.Content>
        </Layout>);
}

export default HeadOnly;