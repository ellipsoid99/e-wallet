import { Row, Col, Card } from "react-bootstrap";
import styles from "../Dashboard.module.scss";

const FinanceOverview = (props) => {
    return (
        <div className={styles.outerWrapper}>
            <Row className={styles.summary}>
                <Col className={styles.col} md={6}>
                    <Card>
                        <Card.Header as="h5">User Count</Card.Header>
                        <Card.Body>
                            <Card.Title>Current Logged in users</Card.Title>
                            <Card.Text>{props.data.loggedInCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className={styles.col} md={6}>
                    <Card>
                        <Card.Header as="h5">Balance info</Card.Header>
                        <Card.Body>
                            <Card.Title>Current Account Balance</Card.Title>
                            <Card.Text>{props.data.balance} INR</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
export default FinanceOverview;
