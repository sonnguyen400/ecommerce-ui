import { Container,Row,Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "react-bootstrap";
import globalStyle from '../../assets/style/base.module.scss';
import style from './style.module.scss';
import clsx from "clsx";
import CustomToggle from "../../components/custom-dropdown-toggle/DropdowToggle";
function CategoryBar() {
    return ( <Container fluid>
        <Row>
            <Col className={style.category}>
                <Dropdown>
                    <DropdownToggle as={CustomToggle}>
                        <div className={clsx(globalStyle.listItem,style.categoryItem)}>
                            <span className={globalStyle.icon}><i className="fi fi-rr-mobile-button"></i></span>
                            <span>Phone</span>
                        </div>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>Samsung</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Col>
            <Col className={style.category}>
                <div className={clsx(globalStyle.listItem,style.categoryItem)}>
                    <span className={globalStyle.icon}><i className="fi fi-rr-laptop"></i></span>
                    <span>Laptop</span>
                </div>
            </Col>
            <Col className={style.category}>
                <div className={clsx(globalStyle.listItem,style.categoryItem)}>
                    <span className={globalStyle.icon}><i className="fi fi-rr-sparkles"></i></span>
                    <span>Accessories</span>
                </div>
            </Col>
            <Col className={style.category}>
                <div className={clsx(globalStyle.listItem,style.categoryItem)}>
                    <span className={globalStyle.icon}><i className="fi fi-brands-photoshop-camera"></i></span>
                    <span>Software</span>
                </div>
            </Col>
            <Col className={style.category}>
                <div className={clsx(globalStyle.listItem,style.categoryItem)}>
                    <span className={globalStyle.icon}><i className="fi fi-rr-speaker"></i></span>
                    <span>Speaker</span>
                </div>
            </Col>
            <Col className={style.category}>
                <div className={clsx(globalStyle.listItem,style.categoryItem)}>
                    <span className={globalStyle.icon}><i className="fi fi-rr-desktop-wallpaper"></i></span>
                    <span>Display</span>
                </div>
            </Col>

        </Row>
    </Container> );
}

export default CategoryBar;