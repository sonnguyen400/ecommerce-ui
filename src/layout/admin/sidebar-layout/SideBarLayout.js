import style from './style.module.scss';
import Header from '../../../part/header/admin/header';
import { Col,Row,Container, Card, CardBody } from 'react-bootstrap';
import Sidebar from '../../../part/admin/sidebar/Sidebar';
function SidebarLayout({children}) {
    return ( <>
        <Container fluid className={style.header} id="header">
            <Header/>
        </Container>

        <Container fluid className='mt-3'>
            <Row>
                <Col md={2}><Sidebar/></Col>
                <Col md={10}>
                    <Card>
                        <CardBody>
                        {children}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    </> );
}

export default SidebarLayout;