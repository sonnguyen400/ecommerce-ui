import Tippy from "@tippyjs/react/headless";
import style from './style.module.scss';
import PrefixIcon from "../../components/prefix-icon/PrefixIcon";
import { Card, Row, Col, Button, Skeleton, Empty } from "antd";
import { memo, useEffect, useRef, useState } from "react";
import APIBase from "../../api/ApiBase";
import { throttle } from "lodash";
import { Link } from "react-router-dom";

function SearchInput() {
    const inputRef = useRef();
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(null);
    const [visible, setVisible] = useState(false);
    const tippy = useRef();
    function fetchProduct(name) {
        if (name.trim()) {
            setLoading(true);
            APIBase.get(`/api/v1/product?name=${name}`)
                .then(payload => payload.data)
                .then(data => {
                    setProducts(data.content);
                    setLoading(false);
                })
        }
    }
    function onInput(e) {
        fetchProduct(e.target.value)
    }
    useEffect(() => {
        inputRef.current.addEventListener("input", throttle(onInput, 1000))
        return () => {
            inputRef.current?.removeEventListener("input", throttle(onInput, 1000));
        }
    }, [])
    return (
        <Tippy
            interactive
            ref={tippy}
            visible={visible}
            onDestroy={() => {
                console.log('destroy');
            }}
            placement="bottom-start"
            render={attr => (
                <Col className={style.searchResult} style={{ maxWidth: "460px", width: "100%" }} tabIndex={-1} {...attr}>
                    {loading && <Skeleton />}
                    {(products == null || (Array.isArray(products) && products.length == 0)) && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                    {products && <div className={style.result}>
                        {products.map(product_ => {
                            var prices = product_.productItems.map(item_ => item_.price);
                            return (<Link to={`/product?id=${product_.id}`} className={style.productItem} >
                                <div className={style.picture}>
                                    <img src={product_.picture} />
                                </div>
                                <div className={style.spec}>
                                    <div className={style.name} span={24}>{product_.name}</div>
                                    <div className={style.manufacturer} span={24}>{product_.manufacturer}</div>
                                    <div className={style.price} span={24}>{Math.min(...prices)} - {Math.max(...prices)}</div>
                                </div>
                            </Link>)
                        })}
                        <Link to={`/product/search?name=${inputRef.current.value}`}><Button type="text" block>Show All</Button></Link>
                    </div>}
                </Col>
            )}
        >
            <div onClick={() => setVisible(true)} tabIndex={0} onBlur={() => setVisible(false)} className={style.container}>
                <input ref={inputRef} />
                <div className={style.icon}>
                    <i class="fi fi-rr-search"></i>
                </div>
            </div>
        </Tippy>
    );
}

export default memo(SearchInput);