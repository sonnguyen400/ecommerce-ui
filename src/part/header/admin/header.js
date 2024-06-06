import clsx from "clsx";
import { Col, Row } from "antd";
import style from './style.module.scss';
function Header() {
    return (
        <div>
            <Row className={clsx("mx-auto", style.header)}>
                <Col xl={1}></Col>
                <Col xl={2}></Col>
                <Col xl={4}></Col>
                <Col xl={5}>
                </Col>
            </Row>
        </div>);
}

export default Header;