import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AccountOverview from "./account-overview";
import FinanceOverview from "./finance-overview";
import PaymentOverview from "./payment-overview";
import "./style.scss";

const DashboardComponent = (props) => {
    const { user } = props;
    return (
        <Container fluid className="layout">
            <Row>
                <Col md={4}>
                    <AccountOverview data={user} />
                </Col>
                <Col md={8}>
                    <FinanceOverview />
                </Col>
            </Row>
            <Row>
                <Col>
                    <PaymentOverview />
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardComponent;
