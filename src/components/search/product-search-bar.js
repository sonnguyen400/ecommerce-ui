import { Form, FormControl } from "react-bootstrap";
import style from './style.module.scss';
import clsx from "clsx";
function ProductSearchBar() {
    return ( 
    <div className={clsx(style.container)}>
        <div className={clsx("rounded-pill",style.searchbar)}>
            <input/>
            <div className={style.icon}>
            <i class="fi fi-rr-search"></i>
            </div>
        </div>
    </div> );
}

export default ProductSearchBar;