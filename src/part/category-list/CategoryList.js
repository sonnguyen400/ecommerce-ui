import CategoryItem from "../../components/category-item/CategoryItem";
import { List } from "antd";
function CategoryList({ children }) {
    return (<List>
        {children && Array.isArray(children) && children.map((item, index) => (
            <CategoryItem>{item}</CategoryItem>
        ))}
    </List>);
}

export default CategoryList;