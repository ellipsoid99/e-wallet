import { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import styles from "./Layout.module.scss";
import Welcome from "components/welcome/Welcome";

class Landing extends Component {
    render() {
        return (
            <Container fluid className={styles.container}>
                <Row className={styles.wrapper}>
                    <Welcome />

                    <Col>
                        <h4 className="white-text">
                            <b>Welcome</b> to your banking app
                            <span>BANKABLE</span>{" "}
                        </h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to="/register">Register</Link>
                    </Col>
                    <Col>
                        <Link to="/login">Log In</Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Landing;
