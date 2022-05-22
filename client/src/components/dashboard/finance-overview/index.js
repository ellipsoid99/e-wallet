import { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { Row, Col, Card } from "react-bootstrap";
import styles from "../Dashboard.module.scss";

const FinanceOverview = (props) => {
    const [loginCount, setLoginCount] = useState(0);
    useEffect(() => {
        const accountnumber = localStorage.getItem("accountnumber");
        const url = `/api/users/loginCount/${accountnumber}`;
        const reqBody = qs.stringify({ accountnumber: accountnumber });
        const getData = () => {
            axios
                .post(url, reqBody)
                .then((res) => {
                    const logData = res.data.logincount;
                    setLoginCount(logData);
                })
                .catch((error) => console.error(`Errors: ${error}`));
        };
        getData();
        const interval = setInterval(() => {
            getData();
        }, 1000);
        return () => clearInterval(interval);
    });
    return (
        <div className={styles.outerWrapper}>
            <Row className={styles.summary}>
                <Col className={styles.col} md={6}>
                    <Card>
                        <Card.Header as="h5">User Count</Card.Header>
                        <Card.Body>
                            <Card.Title>Current Logged in users</Card.Title>
                            <Card.Text>{loginCount}</Card.Text>
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
