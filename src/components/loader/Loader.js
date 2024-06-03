import style from './style.module.scss';
import Overlay from "../overlay/Overlay";
function Loader({ render }) {
    return (<Overlay>
        <div className={style.loader}>
            <div className={style.bar}></div>
        </div>
        <div className={style.content}>
            {render}
        </div>
    </Overlay>);
}

export default Loader;