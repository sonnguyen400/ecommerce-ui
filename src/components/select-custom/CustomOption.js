import style from './style.module.scss';
function CustomOption({ children, ...props }) {
    return <div {...props} className={style.option}>{children}</div>

}

export default CustomOption;