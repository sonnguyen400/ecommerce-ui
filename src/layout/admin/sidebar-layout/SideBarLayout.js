import style from './style.module.scss';
import Header from '../../../part/header/admin/header';
import { Col, Row, Card } from 'antd';
import Sidebar from '../../../part/admin/sidebar/Sidebar';
function SidebarLayout({ children }) {
    return (<>
        <div fluid className={style.header} id="header">
            <Header />
        </div>

        <div fluid className='mt-3'>
            <Row>
                <Col md={2}><Sidebar /></Col>
                <Col md={10}>
                    <Card>
                        {children}
                    </Card>
                </Col>
            </Row>
        </div>
    </>);
}

export default SidebarLayout;