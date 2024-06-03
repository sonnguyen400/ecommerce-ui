
import { Card, List } from "antd";
import { Link } from "react-router-dom";

function CategoryItem({ children }) {

    return (<List.Item>
        <Card title={<Link to={`/admin/category/${children.id}`}>{children.name}</Link>}>
            {children.description}
        </Card>

    </List.Item>);
}

export default CategoryItem;