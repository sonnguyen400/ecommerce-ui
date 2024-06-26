import style from './style.module.scss';
import clsx from "clsx";
import { memo } from "react";
function ProductSearchBar() {
    return (
        <div className={clsx(style.container)}>
            <div className={clsx("rounded-pill", style.searchbar)}>
                <input />
                <div className={style.icon}>
                    <i className="fi fi-rr-search"></i>
                </div>
            </div>
        </div>);
}

export default memo(ProductSearchBar);