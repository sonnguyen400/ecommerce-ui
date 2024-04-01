import clsx from 'clsx';
import style from './style.module.scss';
function PageContainer({children,className,...props}) {
    return ( <div {...props} className={clsx(style.container,className)}>{children}</div> );
}

export default PageContainer;