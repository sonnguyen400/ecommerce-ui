import { Row, Image, Col } from 'antd';
import { Link } from 'react-router-dom';
function ProductDetailItem({ children }) {
    return (
        <Row className='py-2'>
            <Col lg={1}><Image className='w-100 h-100' rounded src={children.productImage} /></Col>
            <Col>
                <Link className='inherit-link' to={`/admin/product?id=${children.id}`}><h6>{children.name}</h6></Link>
            </Col>
        </Row>);
}

export default ProductDetailItem;