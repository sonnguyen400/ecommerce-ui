import { useEffect, useState } from "react";
import APIBase from "../../../api/ApiBase";
import { Link } from "react-router-dom";
import { List, Card, Button } from "antd";

function WarehouseManage() {
    const [warehouses, setWarehouses] = useState(null);
    useEffect(() => {
        APIBase.get("api/v1/warehouse").then(payload => {
            setWarehouses(payload.data);
            return payload.data;
        }).catch(console.log);
    }, [])
    return (<Card>
        <div>
            <Button>Add</Button>
        </div>
        <List>
            {warehouses && warehouses.map(warehouse =>
                <List.Item className="list-group-flush">
                    <Link to={`/admin/warehouse/${warehouse.id}`}>{warehouse.name}</Link>
                    <p>{warehouse.detail}</p>
                </List.Item>)}
        </List>
    </Card>);
}

export default WarehouseManage;