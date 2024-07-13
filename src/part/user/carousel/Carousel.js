import { Carousel } from "antd";
import styled from "styled-components";


const ExampleCarouselImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: var(--base-radius);
  min-height: 500px;
  background-color: red;
`

function UserCarousel(props) {
  return (<Carousel  {...props}>
    <ExampleCarouselImage >Test1</ExampleCarouselImage>
    <ExampleCarouselImage >Test2</ExampleCarouselImage>
  </Carousel>);
}

export default UserCarousel;