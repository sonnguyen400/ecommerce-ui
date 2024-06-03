import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context";
import APIBase from "../../api/ApiBase";
import CategoryItem from "../../components/category-item/CategoryItem";
import { Card } from "antd";
function CategoryManage() {
    const globalContext = useContext(GlobalContext);
    const [data, setData] = useState(null);

    useEffect(() => {
        globalContext.loader("  ");
        APIBase.get("api/v1/category/1")
            .then(payload => setData(payload.data))
            .catch(console.log)
            .finally(
                () => {
                    globalContext.loader(false);
                }
            );
    }, [])
    return (<Card>
        {data && data.children.map(child => <CategoryItem>{child}</CategoryItem>)}
    </Card>);
}

export default CategoryManage;