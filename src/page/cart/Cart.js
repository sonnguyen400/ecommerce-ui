import {Tabs,Tab} from 'react-bootstrap';
import Cart from '../../part/cart/Cart';
import CartCancel from '../../part/cart-cancel/CartCancel';
import CartShipping from '../../part/card-shipping/CardShipping';
function CardPage() {
    return ( 
    <Tabs
        defaultActiveKey="cart"
        fill
        justify
    >
        <Tab eventKey="cart" title="Cart">
            <Cart/>
        </Tab>
        <Tab eventKey="cancel" title="Cancel">
            <CartCancel/>
        </Tab>
        <Tab eventKey="shipping" title="Shipping">
            <CartShipping/>
        </Tab>

        
    </Tabs> );
}

export default CardPage;