import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SignUp from "../components/Signup";

const Signup = () => {
  return (
    <Fragment>
      <Container fluid>
        <Row>Let's Get You Signed Up</Row>
        <Row>
          <SignUp />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Signup;
