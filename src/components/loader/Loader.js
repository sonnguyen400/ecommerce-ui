import style from './style.module.scss';
import Overlay from "../overlay/Overlay";
function Loader() {
    return (<div className={style.loader}>
        <div className={style.bar}></div>
    </div>);
}

export default Loader;