import { Container,Row,Col, Dropdown, DropdownItem } from "react-bootstrap";
import ProductSearchBar from "../../../components/search/product-search-bar";
import image from '../../../assets/image/image.png';
import {React} from "react";
import style from './header.module.scss';
import globalStyle from '../../../assets/style/base.module.scss';
import CustomToggle from "../../../components/custom-dropdown-toggle/DropdowToggle";
function Header() {
    return ( <Container fluid>
        <Row className={style.header}>
            <Col xl={2}>
            </Col>
            <Col xl={4}>
                <ProductSearchBar/>
            </Col>
            <Col >
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle}>
                        <div className={style.avatar}>
                            <img className="rounded-circle" src={image} alt=""></img>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="list">
                        <DropdownItem href="#">
                            <div className={globalStyle.listItem}>
                                <span className={globalStyle.icon}><i class="fi fi-rr-user"></i></span>
                                <span>Nguyễn Hoàng Sơn</span>
                            </div>
                        </DropdownItem>
                        <DropdownItem href="#">
                            <div className={globalStyle.listItem}>
                                <span className={globalStyle.icon}><i class="fi fi-rr-settings"></i></span>
                                <span>Setting</span>
                            </div>
                        </DropdownItem>
                        <Dropdown.Divider/>
                        <DropdownItem href="#">
                            <div className={globalStyle.listItem}>
                                <span className={globalStyle.icon}><i class="fi fi-rr-sign-out-alt"></i></span>
                                <span>Sign out</span>
                            </div>
                        </DropdownItem>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            <Col xl={1}>
                <i class="fi fi-rr-menu-burger"></i>
            </Col>
        </Row>
    </Container> );
}

export default Header;