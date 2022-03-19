import type { NextPage } from "next";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import styles from "../styles/pages/Home.module.scss";
import Hero from "../components/Hero";

import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Container fluid>
        <Row className={styles.mainRow}>
          <Hero />
        </Row>
        <Row className={styles.buttonRow}>
          <Col className={styles.buttonCol1}>
            <Link href="/auth/login">
              <button className={styles["btn-animation"]}>Login</button>
            </Link>
          </Col>
          <Col className={styles.buttonCol2}>
            <Link href="/auth/signup">
              <button className={styles["btn-animation"]}>Sign-Up</button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
