import ProductSearchBar from "../../../components/search/product-search-bar";
import image from "../../../assets/image/image.png";
import { React, useEffect } from "react";
import style from "./header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { memo } from "react";
import Tippy from "@tippyjs/react/headless";
import { Description } from "../../../components/description";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../store/user/userSlide";
import DarkModeToggle from "../../dark-mode-toggle";
import APIBase from "../../../api/ApiBase";
import { Col, Row } from "antd";
function Header() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchUser());
    }, []);
    function logout() {
        APIBase.post("/logout").then(() => {
            navigate("/login");
        }).catch(err => {
            console.debug(err);
        })
    }
    return (
        <div fluid>
            <Row className={style.header}>
                <Col xl={2}>
                    <Link to="/">
                        <h2>Logo</h2>
                    </Link>
                </Col>
                <Col xl={4}>
                    <ProductSearchBar />
                </Col>
                <Col>
                    <div className="d-flex flex-row align-items-center justify-content-end">
                        <Link to={"/cart"} className={style.link}>
                            <i className="fi fi-rr-shopping-bag"></i>
                        </Link>
                        <Tippy
                            interactive
                            render={(attrs) => (
                                <div tabIndex={-1} {...attrs}>
                                    <div className={clsx(style.dropMenu)}>
                                        <div className="list-group-flush">
                                            {user ? (
                                                <div className={style.menuItem}>
                                                    <span>
                                                        <i className="fi fi-rr-user"></i>
                                                    </span>
                                                    <Description>
                                                        {`${user.lastname} ${user.firstname}`}
                                                    </Description>
                                                </div>
                                            ) : (
                                                <Link
                                                    to="/login"
                                                    className={style.menuItem}
                                                >
                                                    <span>
                                                        <i className="fi fi-rr-user"></i>
                                                    </span>
                                                    <Description>
                                                        Đăng nhập
                                                    </Description>
                                                </Link>
                                            )}
                                            <div className={style.menuItem}>
                                                <span>
                                                    <i className="fi fi-rr-moon-stars"></i>
                                                </span>
                                                <Description>
                                                    Dark mode
                                                </Description>
                                                <div className="d-flex flex-grow-1 justify-content-end">
                                                    <DarkModeToggle />
                                                </div>
                                            </div>
                                            {user &&
                                                <>
                                                    <div
                                                        className={style.seperate}
                                                    ></div>
                                                    <div className={style.menuItem} onClick={logout}>
                                                        <span>
                                                            <i className="fi fi-rs-sign-out-alt"></i>
                                                        </span>
                                                        <Description>
                                                            Logout
                                                        </Description>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                        >
                            <Link to="/user">
                                <div className={style.avatar}>
                                    <img
                                        className="rounded-circle"
                                        src={image}
                                        alt=""
                                    ></img>
                                </div>
                            </Link>
                        </Tippy>
                    </div>
                </Col>
                <Col xl={1} className="d-flex align-items-center">
                    <i className="fi fi-rr-menu-burger"></i>
                </Col>
            </Row>
        </div>
    );
}

export default memo(Header);
