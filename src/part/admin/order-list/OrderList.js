import { Row, Col, Spin } from 'antd';
import { useState, useEffect, useRef } from 'react';
import APIBase from '../../../api/ApiBase';
import UserOrder from '../user-order/UserOrder';
import { debounce } from 'lodash';
function OrderList({ state, user }) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState({
        index: 0,
        isEnd: false
    });
    const [load, setLoad] = useState(false);
    function scrollToLoad() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        // Kiểm tra nếu người dùng đã cuộn tới cuối trang
        if (scrollTop + windowHeight >= docHeight) {
            setLoad(true);
            fetchOrder(page.index);
        }
    }
    useEffect(() => {
        console.log(state)
        setPage({
            index: 0,
            isEnd: false
        })
        setData([])
        fetchOrder(0);
        window.addEventListener("scroll", debounce(scrollToLoad, 5000));
        return () => {
            window.removeEventListener("scroll", scrollToLoad);
        }
    }, [state])
    function fetchOrder(page) {
        if (!page.isEnd) {
            APIBase.get(`/api/v1/order?status=${state}&userId=${user.id}&page=${page}`)
                .then(payload => {
                    setData(data_ => {
                        return [...data_, ...payload.data.content];
                    })
                    if (payload.data.totalPages - 1 == page.index) {
                        setPage(page_ => {
                            page_.isEnd = true;
                            return page_;
                        })
                    } else {
                        setPage(page_ => {
                            page_.index = page_.index + 1;
                            return page_;
                        })
                    }
                })
                .catch(console.log)
                .finally(() => {
                    setLoad(false);
                })
        } else {
            setLoad(false)
        }
    }
    return (<Row justify="center">
        <Col span={24} lg={{ span: 16 }} >
            {data.map((item, index) => <UserOrder key={index} data={item} />)}
        </Col>
        {load && <Col span={24}>
            <Row><Spin /></Row>
        </Col>}
    </Row>);
}

export default OrderList;