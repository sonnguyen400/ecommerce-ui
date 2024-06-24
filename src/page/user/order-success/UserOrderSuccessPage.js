import { Row, Result, Button } from "antd";
import { Link } from "react-router-dom";
function UserOrderSuccessPage() {
    return (<Row justify="center"><Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
            <Link to="/">
                <Button type="primary" key="console">
                    Go Home
                </Button>
            </Link>,
            <Link to="/cart"><Button key="buy">Buy Again</Button></Link>,
        ]}
    /></Row>);
}

export default UserOrderSuccessPage;