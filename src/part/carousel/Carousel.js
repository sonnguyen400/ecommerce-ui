import { Carousel } from "antd";
function ExampleCarouselImage() {
  return (<div style={{ "height": "350px", "backgroundColor": "blue" }}></div>);
}
function UserCarousel(props) {
  return (<Carousel  {...props}>
  </Carousel>);
}

export default UserCarousel;