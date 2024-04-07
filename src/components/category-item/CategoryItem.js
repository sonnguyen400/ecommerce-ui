import { useContext, useEffect, useState } from "react";
import APIBase from "../../api/ApiBase";
import { AppLoader } from "../../context/loader";
import { Card, CardBody, CardHeader, CardLink, CardSubtitle, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

function CategoryItem({children}) {
   
    return ( <ListGroupItem>
        <CardSubtitle><Link to={`/admin/category/${children.id}`}>{children.name}</Link></CardSubtitle>
        <CardBody>{children.description}</CardBody>
    </ListGroupItem>);
}

export default CategoryItem;