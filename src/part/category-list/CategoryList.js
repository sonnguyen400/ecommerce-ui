import { ListGroup } from "react-bootstrap";
import CategoryItem from "../../components/category-item/CategoryItem";
function CategoryList({children}) {
    return ( <ListGroup>
        {children&&Array.isArray(children)&&children.map((item,index)=>(
            <CategoryItem>{item}</CategoryItem>
        ))}
    </ListGroup> );
}

export default CategoryList;