import style from './style.module.scss';
function Overlay({ children }) {
    return (<div className={style.overlay}>
        <div className={style.layer}></div>
        <div className={style.container}>
            {children}
        </div>
    </div>);
}

export default Overlay;