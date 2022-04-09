import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";

const FinanceOverview = () => {
    return (
        <div className="outerWrapper">
            <div className="headerWrapper">FINANCE SUMMARY</div>

            <Row>
                <Col md={2} className="summary">
                    <div className="summaryItem">
                        <h2 className="summaryHeader">Balance: </h2>
                        <h1 className="summaryValue">100.00</h1>
                    </div>
                    <div className="summaryItem">
                        <h2 className="summaryHeader">Deposites: </h2>
                        <h1 className="summaryValue">100.00</h1>
                    </div>
                    <div className="summaryItem">
                        <h2 className="summaryHeader">Withdrawals: </h2>
                        <h1 className="summaryValue">100.00</h1>
                    </div>
                </Col>
                <Col md={10} className="other">
                    Do SOMETHING HERE!
                </Col>
            </Row>
        </div>
    );
};
export default FinanceOverview;
