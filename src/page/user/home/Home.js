import { Container ,Row,Col} from "react-bootstrap";
import UserCarousel from "../../../part/carousel/Carousel";
import ProductCard from "../../../components/product-card/ProductCard";
function Home() {
    return ( <Container fluid>
        <UserCarousel/>
        <div className="mt-5">
            <Row className="gx-1">
                <Col className="p-1" >
                    <ProductCard/>
                </Col>
                <Col className="p-1" >
                    <ProductCard/>
                </Col>
                <Col className="p-1" >
                    <ProductCard/>
                </Col>
                <Col className="p-1" >
                    <ProductCard/>
                </Col>
                <Col className="p-1" >
                    <ProductCard/>
                </Col>
                <Col className="p-1" >
                    <ProductCard/>
                </Col>
            </Row>
        </div>
    </Container> );
}

export default Home;