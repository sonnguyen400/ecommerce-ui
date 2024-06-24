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
import { Layout, Row } from "antd";
import Search from "antd/es/transfer/search";
import PrefixIcon from "../../../components/prefix-icon/PrefixIcon.js";
import Logout from "../../logout/Logout.js";
function Header() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchUser());
    }, []);
    return (
        <Layout.Header className={style.container}>
            <Row className={style.header} align="middle" justify="space-between">
                <div className={style.headerL}>
                    <Link className={style.logo} to="/">
                        <h2>Logo</h2>
                    </Link>
                    <Search className={style.searchBar} />
                </div>
                <div className={style.headerR}>
                    <Link to={"/cart"} className={style.link}>
                        <i className="fi fi-rr-shopping-bag"></i>
                    </Link>
                    <Tippy
                        interactive
                        render={(attrs) => (
                            <div tabIndex={-1} {...attrs}>
                                <div className={clsx(style.dropMenu)}>
                                    <div className={clsx(style.content)}>
                                        {user ? (
                                            <Link to="/user">
                                                <div className={style.menuItem}>
                                                    <PrefixIcon><i className="fi fi-rr-user"></i></PrefixIcon>
                                                    <Description>
                                                        {`${user.lastname} ${user.firstname}`}
                                                    </Description>
                                                </div>
                                            </Link>
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
                                        <div className={clsx(style.menuItem, style.toggle)}>
                                            <div>
                                                <PrefixIcon><i className="fi fi-rr-moon-stars"></i></PrefixIcon>
                                                <Description>Dark mode</Description>
                                            </div>
                                            <div>
                                                <div className="d-flex flex-grow-1 justify-content-end">
                                                    <DarkModeToggle />
                                                </div>
                                            </div>
                                        </div>
                                        {user &&
                                            <div className={style.menuItem}>
                                                <div
                                                    className={style.seperate}
                                                ></div>
                                                <Logout trigger={
                                                    <div className={style.menuItem}>
                                                        <PrefixIcon><i className="fi fi-rs-sign-out-alt"></i></PrefixIcon>
                                                        <Description>Logout</Description>
                                                    </div>
                                                } />

                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                    >
                        <Link to="/user">
                            <div className={style.avatar}>
                                <img
                                    src={image && user && user.picture}
                                    alt=""
                                ></img>
                            </div>
                        </Link>
                    </Tippy>
                </div>
            </Row>

        </Layout.Header>
    );
}

export default memo(Header);
