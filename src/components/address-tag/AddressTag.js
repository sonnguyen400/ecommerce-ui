import { Row, Col } from 'react-bootstrap';
import style from './style.module.scss';
import clsx from 'clsx';
function AddressTag({ data, className, props }) {
    return (<Row {...props} className={className}>
        <Col>
            <div className={clsx(style.address)}>
                {data.city}
            </div>
            <div className={clsx(style.addressLine)}>
                {data.addressLine1}
            </div>
        </Col>
    </Row>);
}

export default AddressTag;