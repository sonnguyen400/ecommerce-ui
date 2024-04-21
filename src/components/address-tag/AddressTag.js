import { Row, Col } from 'react-bootstrap';
import style from './style.module.scss';
import clsx from 'clsx';
function AddressTag({ className, props }) {
    return (<Row {...props} className={className}>
        <Col>
            <div className={clsx(style.address)}>
                4e56789
            </div>
            <div className={clsx(style.addressLine)}>
                fugyihuojfghuj
            </div>
        </Col>
    </Row>);
}

export default AddressTag;