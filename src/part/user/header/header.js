import image from "../../../assets/image/image.png";
import { React, useState } from "react";
import style from "./header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { memo } from "react";
import Tippy from "@tippyjs/react/headless";
import { Description } from "../../../components/description/index.js";
import clsx from "clsx";
import DarkModeToggle from "../../dark-mode-toggle/index.js";
import { Col, Row } from "antd";
import PrefixIcon from "../../../components/prefix-icon/PrefixIcon.js";
import Logout from "../../logout/Logout.js";
import useAuth from "../../../secure/useAuth.js";
import SearchInput from "../search-input/SearchInput.js";
import useDevice from "../../../hooks/useDevice.js";

function Header() {
    const [state, user] = useAuth();
    const device = useDevice();
    const [search, setSearch] = useState(false);
    return (
        <Row className={style.header} gutter={[16, 16]} align="middle">
            <Col order={1} span={(search && (device === "TABLET" || device === "MOBILE")) ? 0 : undefined} className={clsx(style.item, style.left, style.logo)}>
                <Link to="/">
                    <h2>Logo</h2>
                </Link>
            </Col>
            <Col order={2} className={clsx(style.item, style.left, style.search)}>
                <SearchInput minimize={((!search) && (device === "TABLET" || device === "MOBILE")) ? true : false} onClick={() => { if (device === "MOBILE" || device === "TABLET") setSearch(state_ => !state_) }} />
            </Col>
            <Col order={3} flex={device === "MOBILE" && search ? undefined : 1} />
            <Col order={4} span={(search && (device === "TABLET" || device === "MOBILE")) ? 0 : undefined} className={clsx(style.item, style.right)}>
                <Link to={"/cart"} className={clsx(style.link)}>
                    <i className="fi fi-rr-shopping-bag"></i>
                </Link>
            </Col>
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
                <Col order={5} span={(search && (device === "TABLET" || device === "MOBILE")) ? 0 : undefined} className={clsx(style.item, style.right)}>
                    <Link to="/user">
                        <div className={style.avatar}>
                            <img
                                src={image && user && user.picture}
                                alt=""
                            ></img>
                        </div>
                    </Link>
                </Col>
            </Tippy>
        </Row>
    );
}

export default memo(Header);
