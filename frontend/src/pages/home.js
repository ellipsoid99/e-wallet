import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/pages/Home.module.scss";
import Hero from "../components/Hero";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const [apiResponse, setApiResponse] = useState("");
  const navigate = useNavigate();

  const callAPI = () => {
    fetch("http://localhost:4000/testAPI")
      .then((res) => res.text())
      .then((res) => setApiResponse(res));
  };
  return (
    <div className={styles.container}>
      <Container fluid>
        {callAPI()}
        {apiResponse}
        <Row className={styles.mainRow}>
          <Hero />
        </Row>
        <Row className={styles.buttonRow}>
          <Col className={styles.buttonCol1}>
            <button
              onClick={() => navigate("/login")}
              className={styles["btn-animation"]}
            >
              Login
            </button>
          </Col>
          <Col className={styles.buttonCol2}>
            <button
              onClick={() => navigate("/signup")}
              className={styles["btn-animation"]}
            >
              Sign-Up
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
