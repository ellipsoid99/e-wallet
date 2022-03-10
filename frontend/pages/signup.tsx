import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SignUp from "../components/Signup";
import SignupHero from "../components/SignupHero";

const Signup = () => {
  return (
    <Fragment>
      <Container fluid>
        <Row>
          <SignupHero/>
        </Row>
        <Row>
          <SignUp />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Signup;
