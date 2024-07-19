import { Carousel } from "antd";
import style from './style.module.scss';
import clsx from "clsx";
function UserCarousel({ className, ...props }) {
  return (<Carousel className={clsx(style.carousel, className)} {...props}>
    <div className={style.content}>Test1</div>
    <div className={style.content}>Test2</div>
  </Carousel>);
}

export default UserCarousel;