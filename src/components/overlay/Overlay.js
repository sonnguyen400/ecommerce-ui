import { Container } from 'react-bootstrap';
import style from './style.module.scss';
function Overlay({children}) {
    return ( <div className={style.overlay}>
        <div className={style.layer}></div>
        <div fluid className={style.container}>
            {children}
        </div>
    </div> );
}

export default Overlay;