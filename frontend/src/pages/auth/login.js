import { Container, Row, Col } from "react-bootstrap";

import styles from "../../styles/pages/Home.module.scss";
import Login from "../../components/Login";
import Hero from "../../components/Hero";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.container}>
      <Container fluid>
        <Row className={styles.mainRow}>
          <Col sm={8}>
            <Hero />
          </Col>
          <Col sm={4}>
            <div className={styles["login-form-container"]}>
              <Login />
              <div className={styles["signup-redirect"]}>
                <span className={styles["signup-text"]}>
                  Not registered yet?
                </span>
                <h3 className={styles["link-style"]}>
                  <Link to="/signup">Sign Up</Link>
                </h3>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
