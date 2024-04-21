import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import APIBase from "../../../api/ApiBase";
import { Link } from "react-router-dom";

function WarehouseManage() {
    const [warehouses, setWarehouses]=useState(null);
    useEffect(()=>{
        APIBase.get("api/v1/warehouse").then(payload=>{
            setWarehouses(payload.data);
            return payload.data;
        }).catch(console.log);
    },[])
    return ( <Card>
        <CardBody>

            <div>
                <Button>Add</Button>
            </div>
            <CardTitle></CardTitle>
            <ListGroup>
                {warehouses&&warehouses.map(warehouse=>
                <ListGroupItem className="list-group-flush">
                    <Link to={`/admin/warehouse/${warehouse.id}`}>{warehouse.name}</Link>
                    <p>{warehouse.detail}</p>
                </ListGroupItem>)}
            </ListGroup>
        </CardBody>
    </Card> );
}

export default WarehouseManage;