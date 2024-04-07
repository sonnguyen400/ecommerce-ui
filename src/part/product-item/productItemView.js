import clsx from "clsx";
import { Col, Figure, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import style from './style.module.scss';
function ProductItemView({productItem}) {
    return ( <>
        <tr>
            <td rowSpan={Array.isArray(productItem.options)?productItem.options.length:0}>
                <Image width="100px" src={productItem.productImage}/>
            </td>
            <td>
                {productItem.options[0].variation.name}
            </td>
            <td>
                {productItem.options[0].value}
            </td>
            <td rowSpan={Array.isArray(productItem.options)?productItem.options.length:0}>
                {productItem.price}
            </td>
        </tr>
        {productItem.options.map((item,index)=>{
            if(index===0) return false;
            return <tr key={index}>
                <td>{item.variation.name}</td>
                <td>{item.value}</td>
            </tr>
        })}
    </>
    )
    // return ( <Row id={productItem.id}>
    //     {productItem&&<Col md={2}><Image url={productItem.productImage} className={clsx("w-100",style.itemThumb)}/></Col>}
    //     <Col md={8} >

    //         <ListGroup>
    //             {productItem.options.map((option,index)=>
    //                 <ListGroupItem key={index}>
    //                     <Row >
    //                         <Col md={2}>{option.variation.name}</Col>
    //                         <Col md={2}>{option.value}</Col>
    //                     </Row>
    //                 </ListGroupItem>
    //             )}
    //         </ListGroup>
    //     </Col>
    //     <Col>{productItem.price}</Col>
    // </Row> );
}

export default ProductItemView;