import { Collapse } from "antd";
import { Link } from "react-router-dom";
function CategoryList({ items }) {
    return (<Collapse>
        {items && Array.isArray(items) && items.map((item, index) => (

            <Collapse.Panel header={<Link to={`/admin/category/${item.id}`}>{item.name}</Link>}>
                <p>{item.description}</p>
            </Collapse.Panel>
        ))}
    </Collapse>);
}

export default CategoryList;