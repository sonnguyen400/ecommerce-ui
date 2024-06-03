import { useRef } from "react";
import PageContainer from "../../components/Container/PageContainer";
import CategoryBar from "../../part/category-bar/CategoryBar";
import Header from "../../part/header/user/header";
import style from './style.module.scss';
import { Col } from "antd";
function HeadOnly({ children }) {
    var headerH = useRef();
    return (
        <>
            <div className={style.head} id="header" ref={headerH}>
                <Col className={style.container}>
                    <Header />
                    <CategoryBar />
                </Col>
            </div>
            <div fluid className={style.body}>
                <PageContainer style={{ "paddingTop": `${14}px` }}>
                    {children}
                </PageContainer>
            </div>
        </>);
}

export default HeadOnly;