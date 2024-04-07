import { useContext,useState ,useEffect} from "react";
import { AppLoader } from "../../context/loader";
import APIBase from "../../api/ApiBase";
import CategoryItem from "../../components/category-item/CategoryItem";
import {CardBody} from 'react-bootstrap';
function CategoryManage() {
    const loader=useContext(AppLoader);
    const [data,setData]=useState(null);

    useEffect(()=>{
        loader("  ");
        APIBase.get("api/v1/category/1")
            .then(payload=>setData(payload.data))
            .catch(console.log)
            .finally(
                ()=>{
                    loader("");
                }
            );
    },[])
    return ( <CardBody>
        {data&&data.children.map(child=><CategoryItem>{child}</CategoryItem>)}
    </CardBody> );
}

export default CategoryManage;