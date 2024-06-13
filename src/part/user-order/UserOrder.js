import { Collapse } from "antd";
import { useMemo } from "react";

function UserOrder({ data }) {
    const order = useMemo(() => {
        data.map((order, key) => {
            // headerData:{
            //     user:{
            //         name:
            //     }
            // }
        })
    }, [])
    return (<Collapse>

    </Collapse>);
}

export default UserOrder;