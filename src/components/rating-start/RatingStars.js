import clsx from 'clsx';
import style from './style.module.scss';
function RatingStars({ percent, className, ...props }) {
    return (
        <div className={clsx(style.ratingstars, className)} {...props}>
            <div className={style.process} style={{ width: `${percent}%` }}></div>
            <div className={style.bgblend}>
                <i className="fi fi-sr-star star"></i>
                <i className="fi fi-sr-star star"></i>
                <i className="fi fi-sr-star star"></i>
                <i className="fi fi-sr-star star"></i>
                <i className="fi fi-sr-star star"></i>
            </div>
        </div>
    );
}

export default RatingStars;