import { Image } from "antd";
function ProductItemView({ productItem }) {
    return (<>
        <tr>
            <td rowSpan={Array.isArray(productItem.options) ? productItem.options.length : 0}>
                <Image width="100px" src={productItem.productImage} />
            </td>
            <td>
                {productItem.options[0].variation.name}
            </td>
            <td>
                {productItem.options[0].value}
            </td>
            <td rowSpan={Array.isArray(productItem.options) ? productItem.options.length : 0}>
                {productItem.price}
            </td>
        </tr>
        {productItem.options.map((item, index) => {
            if (index === 0) return false;
            return <tr key={index}>
                <td>{item.variation.name}</td>
                <td>{item.value}</td>
            </tr>
        })}
    </>
    )

}

export default ProductItemView;