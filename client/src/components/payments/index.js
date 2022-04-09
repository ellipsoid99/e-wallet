import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import PaymentProgress from "./PaymentProgress";
import PaymentForm from "./PaymentForm";

const PaymentsComponent = () => {
    const [formData, setFormData] = useState({
        from: "",
        to: "",
        amount: "",
        authKey: "",
    });
    const onSubmitHandler = (e) => {};
    return (
        <Container fluid>
            <Row>
                <Col md={4}>
                    <div className="formContainer">
                        <form>
                            <div className="header">
                                <h3>PAYMENT FORM</h3>
                            </div>
                            <div className="formBody">
                                <input
                                    type="text"
                                    name="Payment From"
                                    placeholder="Who is making the payment..."
                                    value={formData.from}
                                />
                                <input
                                    type="text"
                                    name="Payment To"
                                    placeholder="To Whom the payment is made..."
                                    value={formData.to}
                                />{" "}
                                <input
                                    type="number"
                                    name="Amount"
                                    placeholder="Amount to be sent..."
                                    value={formData.amount}
                                />{" "}
                            </div>
                            <div className="buttonWrapper">
                                <button></button>
                            </div>
                        </form>
                    </div>
                </Col>
                <Col md={8}>
                    <PaymentProgress />
                </Col>
            </Row>
        </Container>
    );
};

export default PaymentsComponent;
